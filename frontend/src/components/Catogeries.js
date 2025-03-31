import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const Categories = () => {
    const { data, loading, error } = useFetch("https://trendwear-backend.vercel.app/categories");

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-5 fw-bold">✨ Explore Our Collections ✨</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-center">Error while fetching data.</p>}

            <div className="row justify-content-center">
                {data && data.category.map((category) => (
                    <div key={category._id} className="col-6 col-md-3 d-flex justify-content-center mb-3">
                        <Link to={`/category/${category.category}`} className="text-decoration-none text-center">
                            <div>
                                <img 
                                    src={category.imageUrl} 
                                    alt={category.category} 
                                    className="rounded-circle img-fluid border bg-light" 
                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                />
                                <p className="mt-2 fw-bold text-dark">{category.category}</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;
