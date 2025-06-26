import express from "express";
import fs from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import morgan from "morgan";
import { validators, readonlyProperties } from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
    morgan('dev', {
        skip: (req) => req.method === 'OPTIONS',
    })
);
app.use(cors({
    origin: '*',
    credentials: true,
}));
app.use(express.json({ limit: 'Infinity' }));

// Servire file statici dalla cartella "public"
app.use(express.static('public'));

// **CACHE in memoria** for each resource type
const cache = {};
const writeQueues = {};

function getPlural(singular) {
    if (singular.endsWith('y')) {
        return singular.slice(0, -1) + 'ies';
    } else if (singular.endsWith('s') || singular.endsWith('x') || singular.endsWith('z') || singular.endsWith('ch') || singular.endsWith('sh')) {
        return singular + 'es';
    } else {
        return singular + 's';
    }
}

const resourceTypes = Object.keys(validators);

resourceTypes.forEach(type => {
    cache[type] = [];
    writeQueues[type] = [];
});

const processWriteQueue = async (type) => {
    if (writeQueues[type].length === 0) return;
    const task = writeQueues[type].shift();
    await task();
    if (writeQueues[type].length > 0) {
        setImmediate(() => processWriteQueue(type));
    }
};

function formatValidationErrors(errors) {
    let formattedMessage = "";
    const fieldErrors = {};
    errors.forEach(error => {
        if (!fieldErrors[error.field]) {
            fieldErrors[error.field] = [];
        }
        fieldErrors[error.field].push(error.message);
    });
    for (const [field, messages] of Object.entries(fieldErrors)) {
        const fieldName = field || "Generale";
        formattedMessage += `\n   • ${fieldName}: ${messages.join(", ")}`;
    }
    return formattedMessage;
}

const loadData = async (type) => {
    const dbDir = path.join(__dirname, 'database');
    const dataFile = path.join(dbDir, `${type}.json`);
    try {
        if (!existsSync(dbDir)) {
            await fs.mkdir(dbDir, { recursive: true });
            console.log(`Directory del database creata.`);
        }
        if (existsSync(dataFile)) {
            const data = await fs.readFile(dataFile, "utf-8");
            if (data.trim()) {
                try {
                    const loadedData = JSON.parse(data);
                    if (!Array.isArray(loadedData)) {
                        throw new Error(`Errore di struttura nel file ${type}.json: il file deve contenere un array.`);
                    } else {
                        const validator = validators[type];
                        const invalidItems = [];
                        for (let i = 0; i < loadedData.length; i++) {
                            const item = loadedData[i];
                            const validationResult = validator(item);
                            if (!validationResult.valid) {
                                invalidItems.push({
                                    index: i,
                                    id: item.id || 'sconosciuto',
                                    errors: validationResult.errors
                                });
                            }
                        }
                        if (invalidItems.length > 0) {
                            let errorMessage = `\n⛔ Errori di validazione nel file ${type}.json. Il server non può partire.\n`;
                            invalidItems.forEach(item => {
                                errorMessage += `\n🚫 Elemento #${item.index + 1} (ID: ${item.id}) non valido:`;
                                errorMessage += formatValidationErrors(item.errors);
                                errorMessage += "\n";
                            });
                            errorMessage += `\nCorreggi questi errori nel file database/${type}.json per avviare il server.`;
                            throw new Error(errorMessage);
                        }
                        cache[type] = loadedData;
                    }
                } catch (parseError) {
                    throw new Error(`Errore di sintassi JSON nel file ${type}.json:\n${parseError.message}\nControlla la sintassi del file e assicurati che sia un JSON valido.`);
                }
            } else {
                cache[type] = [];
            }
        } else {
            cache[type] = [];
            await saveData(type);
            console.log(`Creato file dati vuoto per ${type}.`);
        }
    } catch (error) {
        throw error;
    }
};

const saveData = async (type) => {
    return new Promise((resolve) => {
        writeQueues[type].push(async () => {
            try {
                const dataFile = path.join(__dirname, 'database', `${type}.json`);
                await fs.writeFile(dataFile, JSON.stringify(cache[type], null, 2), "utf-8");
                console.log(`Dati salvati in ${type}.json.`);
            } catch (error) {
                console.error(`⚠️ Errore nel salvare i dati per ${type}:`, error);
            }
            resolve();
        });
        if (writeQueues[type].length === 1) {
            processWriteQueue(type);
        }
    });
};

const loadPromises = resourceTypes.map(type => {
    const pluralType = getPlural(type);
    const validator = validators[type];

    app.post(`/${pluralType}`, async (req, res) => {
        const validationResult = validator(req.body);
        if (!validationResult.valid) {
            return res.status(400).json({
                error: `Invalid ${type} data`,
                details: validationResult.errors
            });
        }
        const newItem = req.body;
        newItem.id = (cache[type].length > 0 ? Math.max(...cache[type].map((t) => parseInt(t.id) || 0)) + 1 : 1);
        const creationDate = new Date();
        newItem.createdAt = creationDate.toISOString();
        newItem.updatedAt = creationDate.toISOString();
        cache[type].push(newItem);
        await saveData(type);
        res.status(201).json({ success: true, [type]: newItem });
    });

    app.get(`/${pluralType}/:id`, (req, res) => {
        const itemId = parseInt(req.params.id);
        const item = cache[type].find((p) => p.id === itemId);
        if (!item) {
            return res.status(404).json({ success: false, message: `${type} with id '${itemId}' not found.` });
        }
        res.json({ success: true, [type]: item });
    });

    app.put(`/${pluralType}/:id`, async (req, res) => {
        const itemId = parseInt(req.params.id);
        const itemIndex = cache[type].findIndex((p) => p.id === itemId);
        if (itemIndex === -1) {
            return res.status(404).json({ success: false, message: `${type} with id '${itemId}' not found.` });
        }
        const oldItem = cache[type][itemIndex];

        const updatedFields = { ...req.body };
        delete updatedFields.id;
        delete updatedFields.createdAt;
        delete updatedFields.updatedAt;

        const typeReadonlyProps = readonlyProperties[type] || [];
        const readonlyAttemptsToUpdate = Object.keys(updatedFields).filter(key =>
            typeReadonlyProps.includes(key)
        );

        if (readonlyAttemptsToUpdate.length > 0) {
            return res.status(400).json({
                success: false,
                error: `Cannot update readonly properties`,
                details: {
                    readonly: readonlyAttemptsToUpdate,
                    message: `The following properties are readonly and cannot be updated: ${readonlyAttemptsToUpdate.join(', ')}`
                }
            });
        }

        const fieldsToValidate = {};
        Object.keys(updatedFields).forEach(key => {
            fieldsToValidate[key] = updatedFields[key];
        });

        if (Object.keys(fieldsToValidate).length > 0) {
            const validationResult = validator({ ...oldItem, ...fieldsToValidate });
            if (!validationResult.valid) {
                return res.status(400).json({
                    error: `Invalid ${type} data`,
                    details: validationResult.errors
                });
            }
        }

        const now = new Date().toISOString();
        cache[type][itemIndex] = {
            ...cache[type][itemIndex],
            ...updatedFields,
            updatedAt: now
        };

        await saveData(type);
        res.json({ success: true, [type]: cache[type][itemIndex] });
    });

    app.delete(`/${pluralType}/:id`, async (req, res) => {
        const itemId = parseInt(req.params.id);
        const filteredItems = cache[type].filter((p) => p.id !== itemId);
        if (filteredItems.length === cache[type].length) {
            return res.status(404).json({ success: false, message: `${type} with id '${itemId}' not found.` });
        }

        cache[type] = filteredItems;
        await saveData(type);
        res.json({ success: true });
    });

    app.get(`/${pluralType}`, (req, res) => {
        const { search, category } = req.query;
        let filteredItems = [...cache[type]];

        if (category) {
            filteredItems = filteredItems.filter(item =>
                item.category && item.category.toLowerCase() === category.toLowerCase()
            );
        }
        if (search) {
            filteredItems = filteredItems.filter(item =>
                item.title && item.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        res.json(filteredItems.map(
            ({ id, createdAt, updatedAt, title, category }) => ({ id, createdAt, updatedAt, title, category })
        ));
    });

    return loadData(type);
});

await Promise.all(loadPromises);

module.exports = app;
