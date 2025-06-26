import { useParams, Link } from "react-router-dom"
import { useEffect } from "react"
import { useGlobalContext } from "../context/GlobalContext"

const url = import.meta.env.VITE_IMAGE_BASE_URL

export default function CarDetails() {

    const { id } = useParams()

    const { favoriteCars, singleCar, fetchSingleCar, addCarsForCompare, addFavoritesList, removeFavoriteList } = useGlobalContext()

    useEffect(() => {
        fetchSingleCar(id)
    }, [id])

    const isFavorite = favoriteCars.some(f => f.id === singleCar.electriccars.id)

    return (
        <>
            {singleCar && (
                <div className="container my-5 ">
                    <div className="card shadow-lg p-4">
                        <div className="row g-4">
                            <div className="col-md-6 d-flex justify-content-center align-items-center">
                                {singleCar && (
                                    <img
                                        src={`${url}${singleCar?.electriccars?.immagini[0]}`}
                                        alt={singleCar.electriccars.title}
                                        className="img-fluid rounded"
                                    />
                                )}

                            </div>
                            <div className="col-md-6">
                                <button
                                    className="btn btn-link position-absolute heart top-0 end-0 m-2 p-0"
                                    onClick={() =>
                                        isFavorite
                                            ? removeFavoriteList(singleCar.electriccars.id)
                                            : addFavoritesList(singleCar.electriccars)
                                    }
                                >
                                    <i className={`bi ${isFavorite ? "bi-heart-fill text-danger" : "bi-heart"}`}></i>
                                </button>
                                <h2 className="card-title mb-3">{singleCar.electriccars.title}</h2>
                                <p className="text-muted">Categoria: {singleCar.electriccars.category}</p>
                                <p className="card-text">Prezzo: {singleCar.electriccars.prezzo} €</p>

                                <ul className="list-group list-group-flush my-3">
                                    <li className="list-group-item">Anno: {singleCar.electriccars.anno}</li>
                                    <li className="list-group-item">Autonomia: {singleCar.electriccars.autonomiaKm} km</li>
                                    <li className="list-group-item">Accelerazione: {singleCar.electriccars.accelerazioneSec} secondi (0-100 km/h)</li>
                                    <li className="list-group-item">Batteria: {singleCar.electriccars.batteriaKWh} kWh</li>
                                    <li className="list-group-item">Velocità massima: {singleCar.electriccars.velocitàMassimaKmH} km/h</li>
                                    <li className="list-group-item">Consumo: {singleCar.electriccars.consumoKWh100Km} kWh/100km</li>
                                    <li className="list-group-item">Posti: {singleCar.electriccars.posti}</li>
                                </ul>

                                <div className="d-flex gap-3 mt-4">
                                    <Link to="/" className="btn btn-outline-secondary">Torna indietro</Link>
                                    <button
                                        className="btn btn-primary border border-secondary"
                                        onClick={() => addCarsForCompare(singleCar.electriccars)}
                                    >
                                        + Aggiungi per Confronto
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>

    )
}