import { Outlet } from "react-router-dom"
import NavBar from "../components/NavBar"

export default function DefaultLayout() {
    return (
        <>
            <header>
                <NavBar />
            </header>

            <main>
                <div className="container">
                    <Outlet />
                </div>

            </main>

        </>
    )
}