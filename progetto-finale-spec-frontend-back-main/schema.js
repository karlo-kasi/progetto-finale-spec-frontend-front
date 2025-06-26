// THIS FILE IS AUTO-GENERATED from types.ts - DO NOT EDIT DIRECTLY
import z from 'zod';


// Schema generated from types.ts electricCars type
export const electricCarsSchema = z.object({
  id: z.number().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  title: z.string({ required_error: "Title is required" }),
  category: z.string({ required_error: "Category is required" }),
  anno: z.number(),
  prezzo: z.number(),
  autonomiaKm: z.number(),
  batteriaKWh: z.number(),
  ricaricaRapidaKw: z.number().optional(),
  accelerazioneSec: z.number(),
  velocit\u00e0MassimaKmH: z.number(),
  tipoMotore: z.string(),
  consumoKWh100Km: z.number(),
  bagagliaioLitri: z.number(),
  posti: z.number(),
  pesoKg: z.number(),
  immagini: z.array(z.string()),
}).strict(); // Add strict mode to reject extra properties


export function validateelectricCars(data) {
  try {
    const result = electricCarsSchema.parse(data);
    return { valid: true, data: result };
  } catch (error) {
    return { 
      valid: false, 
      errors: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      }))
    };
  }
}

// Export all validators as a map for dynamic usage
export const validators = {
  "electriccars": validateelectricCars
};

// Export readonly properties for each type to prevent updates
export const readonlyProperties = {
  "electriccars": []
};
