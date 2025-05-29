import Search from './Search';

export default function Heros() {

    return (
        <section className="">

            <div className="heros d-flex flex-column justify-content-center align-items-center text-white text-center">
                <div className="container">
                    <h1 className="display-4 fw-bold text-white">
                        Scopri e Confronta le Migliori Auto Elettriche
                    </h1>
                    <p className="lead text-white fs-2">
                        Trova il modello perfetto per te!
                    </p>
                </div>
            </div>

            <Search />

        </section>
    )
}