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

root/
│
├── backend/ # Express/Node API
│ └── public/images # [Solo in dev: immagini statiche]
├── frontend/ # React (Vite)
│ └── public/images # Immagini deployate (Vercel)
└── README.md

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