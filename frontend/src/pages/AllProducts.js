import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const AllProducts = () => {
    const { data, loading, error } = useFetch("https://trendwear-backend.vercel.app/products");
    console.log(data)
    const [filteredProd, setFilteredProd] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProductType, setSelectedProductType] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [selectedRating, setSelectedRating] = useState(null);
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search).get("search") || ""
    console.log("Search Query:", queryParams);


    const categoryFilters = {
        Men: ["Shirts", "T-Shirts", "Jeans"],
        Women: ["Tops", "Dresses", "Jeans"],
        Boys: ["Shirts", "T-Shirts", "Jeans"],
        Girls: ["Tops", "Dresses", "Jeans"],
    };

    useEffect(() => {
        if (data) {
            console.log(data)
            let result = [...data];

            if (queryParams.trim() !== ""){
                result = result.filter(product => product.name.toLowerCase().includes(queryParams.toLowerCase()))
            }
    
            if (selectedCategory) {
                result = result.filter(product => product.category === selectedCategory);
            }
            if (selectedProductType.length > 0) {
                result = result.filter(product => selectedProductType.includes(product.productType));
            }
            if (selectedRating !== null) {
                result = result.filter(product => product.rating >= selectedRating);
            }
            if (sortOrder === "lowToHigh") {
                result.sort((a, b) => a.price - b.price);
            } else if (sortOrder === "highToLow") {
                result.sort((a, b) => b.price - a.price);
            }
    
            // Ensure all products are displayed when no filters are selected
            // setFilteredProd(result.length > 0 || selectedCategory || selectedProductType.length || selectedRating !== null ? result : data.products);
            setFilteredProd(result);
        }
    }, [data, queryParams, selectedCategory, selectedProductType, selectedRating, sortOrder]);
    

    const toggleProductTypeFilter = (type) => {
        setSelectedProductType((prev) =>
            prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
        );
    };

    const clearFilters = () => {
        setSelectedCategory("");
        setSelectedProductType([]);
        setSortOrder("");
        setSelectedRating(null);
    };

    return (
        <div>
            <Header />
            <div className="container-fluid">
                <div className="row vh-100 bg-light">
                    <div className="col-md-3 bg-white p-4 border-end">
                        <div className="d-flex gap-5">
                            <h5>Filters</h5>
                            <button className="btn btn-outline-secondary" onClick={clearFilters}>Clear Filters</button>
                        </div>
                        <hr />

                        <div className="mb-3">
                            <h6 className="fw-bold">Category</h6>
                            {Object.keys(categoryFilters).map((category) => (
                                <div key={category}>
                                    <input
                                        type="radio"
                                        className="form-check-input"
                                        name="category"
                                        checked={selectedCategory === category}
                                        onChange={() => setSelectedCategory(category)}
                                    />
                                    <label className="form-check-label ms-2">{category}</label>
                                </div>
                            ))}
                        </div>

                        {selectedCategory && (
                            <div className="mb-3">
                                <h6 className="fw-bold">Product Type</h6>
                                {categoryFilters[selectedCategory].map((type) => (
                                    <div key={type}>
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedProductType.includes(type)}
                                            onChange={() => toggleProductTypeFilter(type)}
                                        />
                                        <label className="form-check-label ms-2">{type}</label>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mb-3">
                            <h6 className="fw-bold">Rating</h6>
                            {[4, 3, 2, 1].map((rating) => (
                                <div key={rating}>
                                    <input
                                        type="radio"
                                        name="rating"
                                        className="form-check-input"
                                        checked={selectedRating === rating}
                                        onChange={() => setSelectedRating(rating)}
                                    />
                                    <label className="form-check-label ms-2">{rating} Stars & Above</label>
                                </div>
                            ))}
                        </div>

                        <div className="mb-3">
                            <h6 className="fw-bold">Sort by Price</h6>
                            <label>
                                <input
                                    type="radio"
                                    name="sort"
                                    className="form-check-input"
                                    checked={sortOrder === "lowToHigh"}
                                    onChange={() => setSortOrder("lowToHigh")}
                                /> Low to High
                            </label>
                            <br />
                            <label>
                                <input
                                    type="radio"
                                    name="sort"
                                    className="form-check-input"
                                    checked={sortOrder === "highToLow"}
                                    onChange={() => setSortOrder("highToLow")}
                                /> High to Low
                            </label>
                        </div>
                    </div>

                    <div className="col-md-9 p-4">
                        <h3 className="mb-3 text-secondary">All Products</h3>
                        {loading && <p className="text-center">Loading...</p>}
                        {error && <p className="text-danger text-center">Error while fetching data.</p>}

                        <div className="row row-cols-2 row-cols-md-4 g-4">
                            {filteredProd.map((product) => (
                                <div key={product.name} className="col">
                                    <Link to={`/productDetails/${product._id}`} style={{ textDecoration: "none" }}>
                                        <div className="card h-100 shadow-sm border-1 rounded">
                                            <img src={product.imageUrl} className="card-img-top" alt={product.name} />
                                            <div className="card-body text-center">
                                                <h6 className="card-title fw-bold text-dark">{product.name}</h6>
                                                <p className="text-muted">⭐ {product.rating} | ₹{product.price}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllProducts;
