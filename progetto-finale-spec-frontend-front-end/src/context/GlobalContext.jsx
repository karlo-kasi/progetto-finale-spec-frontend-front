import { createContext, useContext, useState, useMemo } from "react";

const GlobalContext = createContext();


export function GlobalProvider({ children }) {

    const url = import.meta.env.VITE_BASE_URL


    const [cars, setCars] = useState([])
    const [singleCar, setSingleCar] = useState()

    //per gestire il campo ricerca
    const [search, setSearch] = useState("")

    //per gestire il filtro
    const [category, setCategory] = useState("")

    //per gestire lo stato dell'ordine 
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState(1)

    //per gestire l'array di confronto
    const [compareCars, setCompareCars] = useState([])

    //per gestire la lista dei preferiti
    const [favoriteCars, setFavoriteCars] = useState([])

    const getCars = async () => {
        try {
            const response = await fetch(`${url}`)
            const data = await response.json()
            setCars(data)
        } catch (err) {
            console.error(err)
        }
    }

    const fetchSingleCar = async (id) => {
        try {

            const response = await fetch(`${url}${id}`)
            const data = await response.json()

            setSingleCar(data)
        } catch (err) {
            console.error(err)
        }
    }


    //gestione del select
    const handleSort = (value) => {
        if (sortBy === value) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(value)
            setSortOrder(1)
        }
    }

    const sortedCars = useMemo(() => {
        const arrayCopy = [...cars]
        const filtered = arrayCopy.filter((car) => car.title.toLowerCase().includes(search.toLowerCase()))
        const filteredByCategory = filtered.filter((car) => {
            if (category === "") {
                return true
            }
            return car.category === category
        });
        filteredByCategory.sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder
            } else {
                return 0
            }
        })
        return filteredByCategory
    }, [cars, search, category, sortBy, sortOrder])




    const addCarsForCompare = (car) => {

        if (compareCars.length >= 4) {
            return alert("Non puoi confrontare più di 4 auto alla volta")
        }

        if (!compareCars.some(c => c.id === car.id)) {
            setCompareCars(prev => [...prev, car])
            alert(`La macchina è stata aggiunta con successo`)
        }
    }

    const removeForCompare = (id) => {
        setCompareCars(prev => prev.filter(car => car.id !== id));
    }

    const addFavoritesList = (car) => {

        if (!favoriteCars.some(f => f.id === car.id)) {
            setFavoriteCars(prev => [...prev, car])
        }

    }

    const removeFavoriteList = (id) => {

        setFavoriteCars(prev => prev.filter(car => car.id !== id));
    }


    const value = {
        cars,
        getCars,
        sortedCars,
        setSearch,
        search,
        singleCar,
        fetchSingleCar,
        setCategory,
        sortOrder,
        setSortOrder,
        handleSort,
        addCarsForCompare,
        compareCars,
        removeForCompare,
        favoriteCars,
        removeFavoriteList,
        addFavoritesList
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