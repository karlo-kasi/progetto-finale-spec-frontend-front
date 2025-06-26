import { useGlobalContext } from "../context/GlobalContext"
import { NavLink } from "react-router-dom"

export default function ComparePage() {
    const { compareCars, removeForCompare } = useGlobalContext()

    const features = [
        { key: "immagini" },
        { label: "Categoria", key: "category" },
        { label: "Anno", key: "anno" },
        { label: "Prezzo", key: "prezzo", unit: "€" },
        { label: "Autonomia", key: "autonomiaKm", unit: " km" },
        { label: "Accelerazione", key: "accelerazioneSec", unit: " sec" },
        { label: "Velocità Massima", key: "velocitàMassimaKmH", unit: " km/h" },
        { label: "Batteria", key: "batteriaKWh", unit: " kWh" },
        { label: "Consumo", key: "consumoKWh100Km", unit: " kWh/100km" },
        { label: "Bagagliaio", key: "bagagliaioLitri", unit: " L" },
        { label: "Posti", key: "posti" },
        { label: "Peso", key: "pesoKg", unit: " kg" },
    ]

    return (
        <div className="container my-5">
            <h2 className="text-center mb-4">CONFRONTA AUTO</h2>

            {compareCars.length === 0 ? (
                <div className="d-flex flex-column align-items-center gap-3">
                    <p className="text-center">Nessuna auto selezionata per il confronto.</p>
                    <NavLink to="/">
                        <button className="btn btn-primary">Torna Indietro</button>
                    </NavLink>
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-light">
                            <tr>
                                <th></th>
                                {compareCars.map((car) => (
                                    <th key={car.id} className="position-relative text-center">
                                        <span>{car.title}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary position-absolute top-0 end-0 m-1"
                                            onClick={() => removeForCompare(car.id)}
                                            title="Rimuovi"
                                        >
                                            &times;
                                        </button>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((feature) => (
                                <tr key={feature.key}>
                                    <th>{feature.label}</th>
                                    {compareCars.map((car) => (
                                        <td key={car.id}>
                                            {feature.key === "immagini" ? (
                                                <img
                                                    src={car.immagini[0]}
                                                    alt={car.title}
                                                    className="img-fluid"
                                                    style={{ maxHeight: "150px" }}
                                                />
                                            ) : (
                                                <>
                                                    {car[feature.key]} 
                                                    {feature.unit}
                                                </>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
