import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const CategoryProducts = () => {
    const { categoryName } = useParams();
    const { data, loading, error } = useFetch("https://trendwear-backend.vercel.app/products");
    const location = useLocation()
    const queryParams = new URLSearchParams(location.search)
    const searchQuery = queryParams.get("q") || ""
    const [filteredProd, setFilteredProd] = useState([]);

    // searchQuery

    useEffect(() => {
        if (data?.products) {
            const result = data.products.filter((product) => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
            );
            setFilteredProd(result);
        }
    }, [data, searchQuery]);
    
    const [selectedCategory, setSelectedCategory] = useState([]);
    const [sortOrder, setSortOrder] = useState("");
    const [selectedRating, setSelectedRating] = useState(null);

    const [selectedProduct, setSelectedProduct] = useState("")

    const categoryFilters = {
        Men: ["Shirts", "T-Shirts", "Jeans"],
        Women: ["Tops", "Dresses", "Jeans"],
        Boys: ["Shirts", "T-Shirts", "Jeans"],
        Girls: ["Tops", "Dresses", "Jeans"],
    };

  
    const toggleCategoryFilter = (category) => {
        setSelectedCategory((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };


    const clearFilters = () => {
        setSelectedCategory([]);
        setSortOrder("");
        setSelectedRating(null);
    };


    let filteredProducts = data
        ? data.filter((product) =>
              product.category.toLowerCase() === categoryName.toLowerCase() &&
              (selectedCategory.length === 0 || selectedCategory.includes(product.productType)) &&
              (selectedRating === null || product.rating >= selectedRating)
          )
        : [];

 
    if (sortOrder === "lowToHigh") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "highToLow") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }



    const handleCartClick = (productId) => {
        setSelectedProduct(productId); 
    };

    const handleSizeSelect = async (product, size) => {
        try {
            const response = await fetch("https://trendwear-backend.vercel.app/wishlist", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: product.name,
                    rating: product.rating,
                    imageUrl: product.imageUrl,
                    originalPrice: product.originalPrice || 0,
                    discountedPrice: product.discountedPrice || 0,
                    size: size,
                    quantity: 1,
                    discount: product.discount || 0,
                }),
            });

            if (response.ok) {
                alert(`Added ${product.name} (Size: ${size}) to Wishlist`);
                setSelectedProduct(null); 
                
            } else {
                alert("Failed to add to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist", error);
        }
    };


    return (
        <div>
             <Header/>
        <div className="container-fluid">
            <div className="row vh-100 bg-light">
                
                <div className="col-md-3 bg-white p-4 border-end">
                    <div className="d-flex gap-5">
                    <h5>Filters</h5>

                    <button className="btn btn-outline-secondary" onClick={clearFilters}>
                        Clear Filters
                    </button>
                    </div>
                    <hr />

                    <div className="mb-3">
                        <h6 className="fw-bold">Category</h6>
                        {categoryFilters[categoryName] &&
                            categoryFilters[categoryName].map((category) => (
                                <div key={category}>
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id={category}
                                        checked={selectedCategory.includes(category)}
                                        onChange={() => toggleCategoryFilter(category)}
                                    />
                                    <label htmlFor={category} className="form-check-label ms-2">
                                        {category}
                                    </label>
                                </div>
                            ))}
                    </div>

                    <div className="mb-3">
                        <h6 className="fw-bold">Rating</h6>
                        {[4, 3, 2, 1].map((rating) => (
                            <div key={rating}>
                                <input
                                    type="radio"
                                    name="rating"
                                    className="form-check-input"
                                    id={`rating${rating}`}
                                    checked={selectedRating === rating}
                                    onChange={() => setSelectedRating(rating)}
                                />
                                <label htmlFor={`rating${rating}`} className="form-check-label ms-2">
                                    {rating} Stars & Above
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mb-3">
                        <h6 className="fw-bold">Sort by Price</h6>
                        <label htmlFor="lowToHigh">
                            <input
                                type="radio"
                                name="sort"
                                className="form-check-input"
                                id="lowToHigh"
                                checked={sortOrder === "lowToHigh"}
                                onChange={() => setSortOrder("lowToHigh")}
                            />{" "}
                            Low to High
                        </label>{" "}
                        <br />
                        <label htmlFor="highToLow">
                            <input
                                type="radio"
                                name="sort"
                                className="form-check-input"
                                id="highToLow"
                                checked={sortOrder === "highToLow"}
                                onChange={() => setSortOrder("highToLow")}
                            />{" "}
                            High to Low
                        </label>
                    </div>
                </div>

                <div className="col-md-9 p-4">
                    <h3 className="mb-3 fw-bold">{categoryName} Collection</h3>
                    {loading && <p className="text-center">Loading...</p>}
                    {error && <p className="text-danger text-center">Error while fetching data.</p>}

                    <div className="row row-cols-2 row-cols-md-4 g-4">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product.name} className="col">
                                    <Link to={`/productDetails/${product._id}`} style={{textDecoration: "none"}}>
                                    <div className="card h-100 shadow-sm border-1 rounded" style={{transition: "0.3s"}}
                                    onMouseEnter={(e) => e.currentTarget.classList.add("shadow-lg")}
                                    onMouseLeave={(e) => e.currentTarget.classList.remove("shadow-lg")}>
                                        <div className="position-relative overflow-hidden">
                                            <img
                                                src={product.imageUrl}
                                                className="card-img-top fixed-img"
                                                alt={product.name}
                                            />
                                        </div>
                                        <div className="card-body text-center">
                                            <h6 className="card-title fw-bold text-dark">{product.name}</h6>
                                            <p className="text-muted">⭐ {product.rating} | ₹{product.price}</p>
                                            
                                            {selectedProduct === product._id ? (
                                                <div className="d-flex justify-content-center gap-2">
                                                    {product.sizeAvailability.map((size) => (
                                                        <button key={size} className="btn btn-outline-secondary"
                                                            onClick={(e) =>{
                                                                e.preventDefault()
                                                                e.stopPropagation()
                                                                 handleSizeSelect(product, size)}}>
                                                            {size}
                                                        </button>
                                                    ))}
                                                </div>
                                            ) : (
                                                <button className="btn btn-outline-secondary w-100"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        handleCartClick(product._id)}}>
                                                     Add to Wishlist
                                                </button>

                                            )}
                                        </div>
                                    </div>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">No products found in this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

export default CategoryProducts;
