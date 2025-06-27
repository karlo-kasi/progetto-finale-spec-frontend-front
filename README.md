# 🚗 Comparatore di Auto Elettriche

Un’applicazione **full-stack** per confrontare auto elettriche, sviluppata come progetto finale per il corso Full Stack Developer 2024.

---

## ⚡ Demo online

👉 [App live su Vercel](https://progetto-finale-spec-frontend-front.vercel.app/)

---

## ✨ Overview

Questo progetto permette di:
- Visualizzare e cercare modelli di auto elettriche
- Filtrare per categoria
- Accedere alla scheda dettaglio con tutte le specifiche
- Salvare le proprie preferite
- Confrontare fino a 4 auto alla volta
- Navigare tra tutte le pagine con routing React

---

## 🎥 Demo / GIF

| Home Page | Pagina Dettaglio | Confronto |
|-----------|------------------|-----------|
| ![Home](./demo/home.gif) | ![Dettaglio](./demo/detail.gif) | ![Confronto](./demo/compare.gif) |

---

## 🏗️ Architettura del progetto

```
progetto-finale-spec-frontend-front/
├── public/ # File statici (incluso /images con tutte le immagini delle auto)
├── src/
│ ├── assets/ # Eventuali asset (icone, immagini extra)
│ ├── components/ # Componenti riusabili (Heros, NavBar, Search)
│ ├── context/ # GlobalContext per lo stato globale e funzioni condivise
│ ├── layouts/ # Layout di pagina (DefaultLayout)
│ ├── pages/ # Pagine principali (Home, Dettaglio, Confronto, Preferiti)
│ ├── App.jsx # Entry point dell’app React
│ ├── index.css # Stili globali
│ └── main.jsx # Mount point React
├── .env # Variabili d’ambiente (es: VITE_BASE_URL)
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json # Configurazione per routing SPA su Vercel
└── vite.config.js # Config Vite
```

---




---

## 🔎 Dettagli tecnici e decisioni progettuali

🔗 Gestione fetch/API
Tutte le chiamate dati usano una variabile d’ambiente VITE_BASE_URL, settata sia in locale che su Vercel.

Esempio fetch:

```
// context/GlobalContext.js
const url = import.meta.env.VITE_BASE_URL;
const fetchSingleCar = async (id) => {
    const response = await fetch(`${url}${id}`);
    const data = await response.json();
    setSingleCar(data);
}
```
Lato backend, le API rispondono con struttura { success: true, electriccars: { ... } }.

🔄 Stato globale & gestione favoriti/confronto
Gestito con Context API React,
con funzioni per aggiungere/rimuovere dalle liste e confronto multiplo.

Snippet favoriti:

```
const addFavoritesList = (car) => {
    if (!favoriteCars.some(f => f.id === car.id)) {
        setFavoriteCars(prev => [...prev, car]);
    }
}
```