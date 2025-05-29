import { useGlobalContext } from "../context/GlobalContext";
import { NavLink } from "react-router-dom";

export default function FavoritesPage() {
    const { favoriteCars, removeFavoriteList } = useGlobalContext();

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">🚗 Auto Preferite</h2>

            {favoriteCars.length === 0 ? (
                <div className="d-flex flex-column align-items-center gap-3">
                    <p className="text-center">Nessuna auto nei preferiti.</p>
                    <NavLink to="/">
                        <button className="btn btn-primary">Esplora Auto</button>
                    </NavLink>
                </div>
            ) : (
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {favoriteCars.map((car) => (
                        <div key={car.id} className="col">
                            <div className="card h-100 shadow-sm">
                                <img
                                    src={`http://localhost:3001${car.immagini[0]}`}
                                    alt={car.title}
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{car.title}</h5>
                                    <p className="card-text text-muted">
                                        {car.title}
                                    </p>
                                    <p className="card-text fw-bold">
                                        {car.prezzo}€
                                    </p>
                                    <div className="mt-auto d-flex justify-content-between">
                                        <NavLink to={`/car/${car.id}`} className="btn btn-outline-secondary btn-sm">
                                            Dettagli
                                        </NavLink>
                                        <button
                                            className="btn btn-outline-danger btn-sm"
                                            onClick={() => removeFavoriteList(car.id)}
                                        >
                                            Rimuovi
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}