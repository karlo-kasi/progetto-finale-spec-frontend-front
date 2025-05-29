import { createContext, useContext, useState, useMemo } from "react";

const GlobalContext = createContext();


export function GlobalProvider({ children }) {

    const url = import.meta.env.VITE_BASE_URL


    const [cars, setCars] = useState([])
    const [singleCar, setSingleCar] = useState()
    const [search, setSearch] = useState("")


    const [category, setCategory] = useState("")

    //per gestire lo stato dell'ordine 
    const [sortBy, setSortBy] = useState("")
    const [sortOrder, setSortOrder] = useState(1)

    console.log(sortBy, sortOrder)

    const handleSort = (value) => {
        if (sortBy === value) {
            setSortOrder(prev => prev * -1)
        } else {
            setSortBy(value)
            setSortOrder(1)
        }
    }



    const getCars = async () => {
        try {
            const response = await fetch(`${url}`)
            const data = await response.json()
            setCars(data)
        } catch (err) {
            console.error(err)
        }
    }

    const sortedCars = useMemo(() => {
        const arrayCopy = [...cars]
        const filtered = arrayCopy.filter((car) => car.title.toLowerCase().includes(search.toLowerCase()))
        const filteredByCategory = filtered.filter((car) => {
            if (category === "") return true;
            return car.category === category;
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




    const fetchSingleCar = async (id) => {
        try {

            const response = await fetch(`${url}${id}`);
            const data = await response.json();

            setSingleCar(data);
        } catch (err) {
            console.error(err);
        }
    };


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