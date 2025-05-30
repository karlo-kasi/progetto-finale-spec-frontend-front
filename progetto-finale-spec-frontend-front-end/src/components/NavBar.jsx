import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <>
            <div className="bg-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                        <NavLink className="navbar-brand" to="/">MyApp</NavLink>

                        <div className="collapse navbar-collapse d-flex justify-content-between">
                            <ul className="navbar-nav">
                                <li className="nav-item">
                                    <NavLink
                                        to="/"
                                        end
                                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    >
                                        Home
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        to="/favorites"
                                        className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
                                    >
                                        Preferiti
                                    </NavLink>
                                </li>
                            </ul>

    
                            <div className="ms-auto">
                                <NavLink
                                    to="/compare"
                                    className={({ isActive }) =>
                                        `btn ${isActive ? "btn-outline-light" : "btn-outline-secondary"}`
                                    }

                                >
                                    <i className="fa-solid fa-vials me-2"></i>
                                    Comparatore

                                </NavLink>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>

        </>
    )
}