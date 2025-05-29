import { useGlobalContext } from "../context/GlobalContext"
import { useEffect } from "react"
import { Link } from 'react-router-dom';
//Componenti
import Heros from "../components/Heros"


export default function Home() {

    const { getCars, sortedCars, setCategory, handleSort } = useGlobalContext()

    useEffect(() => {
        getCars()
    }, [])



    return (

        <>
            <Heros />


            <div className="">
                <div className="container mt-4">
                    <div className="d-flex justify-content-md-between p-4">
                        <div>
                            <h3>Filtri</h3>
                        </div>
                        <div className="d-flex gap-4">
                            <select
                                className="form-select"
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="">Tutte le categorie</option>
                                <option value="City Car">City Car</option>
                                <option value="Compatta">Compatta</option>
                                <option value="SUV">SUV</option>
                                <option value="Berlina">Berlina</option>
                            </select>
                            <select
                                className="form-select"
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="">Ordina</option>
                                <option value="title">A-Z per Nome</option>
                                <option value="title">Z-A per Nome</option>
                            </select>
                        </div>
                    </div>

                </div>


                <div className="container mt-3 mb-5">
                    <div className="row g-4">

                        {sortedCars.map((car) => (
                            <div key={car.id} className="col-md-6 col-lg-4 px-4 py-2">
                                <div className="card h-100 shadow-sm position-relative">

                                    <button
                                        className="btn btn-link position-absolute top-0 end-0 m-2 p-0"
                                        style={{ fontSize: "1.5rem", color: "gray" }}
                                        onClick={() => toggleFavorite(car.id)}
                                    >
                                        <i className="bi bi-heart"></i>
                                    </button>


                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <div>
                                            <h5 className="card-title">{car.title}</h5>
                                            <p className="card-text text-muted">{car.category}</p>
                                        </div>
                                        <div className="d-flex gap-3 mt-3">
                                            <Link to={`/car/${car.id}`} className="btn btn-primary btn-sm">
                                                Dettaglio
                                            </Link>
                                        </div>
                                        <div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>



    );
}