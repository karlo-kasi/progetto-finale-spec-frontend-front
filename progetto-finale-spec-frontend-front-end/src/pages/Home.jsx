import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react"
//Componenti
import Heros from "../components/Heros"

export default function Home() {

    const { cars, getCars } = useGlobalContext()

    useEffect(() => {
        getCars()
    }, [])

    return (

        <>
            <Heros />

            <ul>
                {cars.map((car) => {
                        return (
                            <li key={car.id}>
                                <p>{car.title}</p>
                                <p>{car.category}</p>
                            </li>
                        )
                    })}
            </ul>

        </>

    );
}