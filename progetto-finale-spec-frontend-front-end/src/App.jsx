import { BrowserRouter, Routes, Route } from "react-router-dom"

// Pagine
import Home from "./pages/Home"
import CarDetails from "./pages/CarDetails"
import ComparePage from "./pages/ComparePage"
import FavoritesPage from "./pages/FavoritesPage"

// Layout
import DefaultLayout from "./layouts/DefaultLayout"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route Component={DefaultLayout}>
            <Route path="/" Component={Home} />
            <Route path="/car/:id" Component={CarDetails} />
            <Route path="/compare" Component={ComparePage} />
            <Route path="/favorites" Component={FavoritesPage} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
