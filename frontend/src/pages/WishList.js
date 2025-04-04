import Header from "../components/Header";
import Footer from "../components/Footer"
import useFetch from "../useFetch";
import { RxCross2 } from "react-icons/rx";
import { Badge } from "react-bootstrap";
import { useState, useEffect } from "react";

const WishList = () => {
    const { data, loading, error } = useFetch("https://trendwear-backend.vercel.app/wishlist");
    const [wishlist, setWishlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        if (data && Array.isArray(data.wishlist)) {
            console.log("Fetched Wishlist Data:", data.wishlist); // Debugging
            setWishlist(data.wishlist);
        }
    }, [data]);

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`https://trendwear-backend.vercel.app/wishlist/${productId}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                setWishlist((prevWishlist) => prevWishlist.filter((item) => item._id !== productId));
            } else {
                console.error("Failed to delete wishlist item");
            }
        } catch (error) {
            console.error("Error in deleting the item.", error);
        }
    };

    const handleWishlist = async (product) => {
        try {
            const response = await fetch("https://trendwear-backend.vercel.app/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });

            const result = await response.json();
            console.log("Cart API Response:", result); // Debugging

            if (response.ok) {
                alert(`Added to cart`);
                await handleDelete(product._id);

            } else {
                alert("Failed to add to cart. " + result.error);
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
        }
    };

    return (
        <div>
            <Header />
            <div className="container mb-5">
                <h6 className="text-secondary display-6 text-center my-3">♡ My Wishlist</h6>
                {loading && <p className="text-center">Loading...</p>}
                {error && <p className="text-danger text-center">Error while fetching data.</p>}

                <div className="row row-cols-2 row-cols-md-4 g-4">
                    {wishlist.length > 0 ? (
                        wishlist.map((product) => (
                            <div key={product._id} className="col">
                                <div className="card h-100 shadow-sm border-0 rounded badge">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            src={product.imageUrl}
                                            className="card-img-top fixed-img"
                                            alt={product.name}
                                        />
                                    </div>
                                    <div className="card-body text-center">
                                        <h6 className="card-title fw-bold text-dark">{product.name}</h6>
                                        <p className="text-muted">
                                            ⭐ {product.rating} |  
                                            <strong> ₹{product.discountedPrice}</strong>
                                            <babel className="text-decoration-line-through"> ₹{product.originalPrice} </babel> 
                                            ({product.discount}% Off)
                                        </p>

                                        <Badge
                                            bg="danger"
                                            className="position-absolute top-0 end-0 m-2"
                                            style={{ cursor: "pointer", padding: "8px", borderRadius: "50%" }}
                                            onClick={() => handleDelete(product._id)}
                                        >
                                            <RxCross2 size={14} color="white" />
                                        </Badge>

         
                                            <div className="d-flex justify-content-center gap-2">
                                               
                                                    <button className="btn btn-primary"
                                                        onClick={() => handleWishlist(product)}>
                                                        Move to Cart
                                                    </button>
                                                
                                            </div>
                                    
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No products in wishlist</p>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default WishList;
