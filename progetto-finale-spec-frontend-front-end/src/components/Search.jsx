export default function Search() {
    return (
        <div className="container search-overlap">
            <div className="input-group input-group-lg">

                <span className="input-group-text bg-white border-end-0 rounded-start-pill ps-4">
                    <i className="bi bi-search"></i>
                </span>

                <input
                    type="text"
                    className="form-control border-start-0 border-end-0 rounded-0 fs-6 fs-sm-6 fs-md-5 fs-lg-4"
                    placeholder="Cerca un'auto elettrica..."
                />
                <button
                    className="btn btn-primary rounded-end-pill pe-4"
                    type="button"
                >
                    Cerca
                </button>

            </div>
        </div>
    )
}