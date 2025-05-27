import { createContext, useContext, useState } from "react";



const GlobalContext = createContext();

export function GlobalProvider({ children }) {

    const [cars, setCars] = useState([])

    const url = import.meta.env.VITE_BASE_URL

    const getCars = async () => {
        try {
            const response = await fetch(`${url}`)
            const data = await response.json()
            setCars(data)
        } catch (err) {
            console.error(err)
        }
    }

    const value = {
        cars,
        getCars,
    }

    return (
        <GlobalContext.Provider value={value}>
            {children}
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext)
}