import { NavLink } from "react-router-dom"

export default function NavBar() {
    return (
        <>
            <div className="bg-dark">
                <div className="container">
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
                        <a className="navbar-brand" href="#">MyApp</a>
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav me-auto">

                                <li className="nav-item">
                                    <NavLink to="/"
                                        end
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Home
                                    </NavLink>
                                </li>

                        

                                <li className="nav-item">
                                    <NavLink to="/compare"
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Comparatore
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <NavLink to="/favorites"
                                        className={({ isActive }) =>
                                            isActive ? "nav-link active" : "nav-link"
                                        }
                                    >
                                        Preferiti
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

            </div>

        </>
    )
}