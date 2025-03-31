import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import { useState } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiSecurePaymentLine } from "react-icons/ri";
import { PiKeyReturnLight } from "react-icons/pi";
import { GiMoneyStack } from "react-icons/gi";

const ProductDetails = () => {
    const { data, loading, error } = useFetch("https://trendwear-backend.vercel.app/products");
    const { productId } = useParams();

    const filteredProduct = data ? data.find((product) => product._id === productId) : null;
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleCart = async (filteredProduct, selectedSize, quantity) => {
        if(selectedSize === null){
            alert("Please Select Size")
        }
        try{
            const response = await fetch("https://trendwear-backend.vercel.app/cart", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                        name: filteredProduct.name,
                        rating: filteredProduct.rating,
                        imageUrl: filteredProduct.imageUrl,
                        originalPrice: filteredProduct.originalPrice || 0,
                        discountedPrice: filteredProduct.discountedPrice || 0,
                        size: selectedSize,
                        quantity: quantity,
                        discount: filteredProduct.discount || 0
                })
            })
            if(response.ok){
                alert(`Added ${filteredProduct.name} (size: ${selectedSize}) (Quantity: ${quantity}) to Cart`)
                console.error(error)
            } else {
                alert("Failed to add to cart")
                console.error("Failed to add to cart", error)
            }
        } catch(error){
            alert("Failed to add to cart.")
            console.error("Error occured while adding to cart.", error)

        }
    }

    const handleWishlist = async (filteredProduct, selectedSize, quantity) => {
        if(selectedSize === null){
            alert("Please Select Size")
        }

        try{
            // const response = await fetch("http://localhost:5000/wishList")
            // const cartItems = await response.json()

            // const existingItem = cartItems.find((item) => item.name === filteredProduct.name && item.size === selectedSize)

            // if(existingItem) {
            //     const updatedQuantity = existingItem.quantity + quantity

            //     await fetch(`http://localhost:5000/wishList/${existingItem.id}`, {
            //         method: "PATCH",
            //         headers: {
            //             "Content-Type": "application/json"
            //         },
            //         body: JSON.stringify({quantity: updatedQuantity})
            //     })
            //     alert(`Updated ${filteredProduct.name} (Size: ${selectedSize}) quantity to ${updatedQuantity} in Wishlist`)
            // } else {
               const response = await fetch("https://trendwear-backend.vercel.app/wishList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                        body: JSON.stringify({
                            name: filteredProduct.name,
                            rating: filteredProduct.rating,
                            imageUrl: filteredProduct.imageUrl,
                            originalPrice: filteredProduct.originalPrice || 0,
                            discountedPrice: filteredProduct.discountedPrice || 0,
                            size: selectedSize,
                            quantity: quantity,
                            discount: filteredProduct.discount || 0
                        })
                })
                if(response.ok){
                    alert(`Added ${filteredProduct.name} (Size: ${selectedSize}) (Quantity: ${quantity}) to Wishlist`)
                    console.error(error)
                } else {
                    alert("Failed to add to wishlist.")
                    console.error(error)
                }
                    
            
         }
             catch(error){
            alert("Failed to add to wishlist")
            console.error("Error occured while adding to Wishlist.", error)
        }
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error occurred while fetching data.</p>;

    return (
        <div className="bg-light">
            <Header/>
        <div className="container mb-3">
            {filteredProduct ? (
                <div className="row justify-content-center align-items-center bg-white">
                    <div className="col-md-4 text-center">
                        <div className="card p-3 border-0">
                            <img
                                src={filteredProduct.imageUrl}
                                alt={filteredProduct.name}
                                className="img-fluid rounded"
                                style={{objectFit: "cover"}}
                            />
                            <div className="d-flex justify-content-center flex-column gap-2 mt-3">
                                <button className="btn btn-primary" onClick={() => handleCart(filteredProduct, selectedSize, quantity)}> 🛒Add to Cart</button>
                                <button className="btn btn-secondary" onClick={() => handleWishlist(filteredProduct, selectedSize, quantity)}>♡ Add to Wishlist</button>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-7">
                        <h2>{filteredProduct.name}</h2>
                            <p className="ms-2">{filteredProduct.rating} ⭐</p>
                        <h3 className="mt-2">₹{filteredProduct.discountedPrice} <s className="text-muted">₹{filteredProduct.originalPrice}</s></h3>
                        <h5 className="text-danger">{filteredProduct.discount}% OFF</h5>

                        <div className="d-flex align-items-center mt-3">
                            <span className="me-3 fw-bold">Quantity:</span>
                            <button className="btn btn-outline-dark" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                            <span className="mx-2">{quantity}</span>
                            <button className="btn btn-outline-dark" onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>

                        <div className="mt-3">
                            <span className="fw-bold">Size:</span>
                            {filteredProduct.sizeAvailability.map((size) => (
                                <button 
                                    key={size} 
                                    className={`btn btn-outline-dark mx-2 ${selectedSize === size ? "btn-dark text-white" : ""}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>

                        <div className="row mt-4">
                            <div className="col text-center">
                            <PiKeyReturnLight size={30}/>
                                <p>10 Days Return</p>
                            </div>
                            <div className="col text-center">
                            <GiMoneyStack size={30}/>
                                <p>Pay on Delivery</p>
                            </div>
                            <div className="col text-center">
                            <CiDeliveryTruck size={30}  />
                                <p>Free Delivery</p>
                            </div>
                            <div className="col text-center">
                            <RiSecurePaymentLine size={30} />
                                <p>Secure Payment</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <h5>Description:</h5>
                            <ul>
                                <li>Style Refined: {filteredProduct.description}</li>
                                <li>All-Weather Ready: Wind-resistant & water-repellent.</li>
                                <li>Unparalleled Comfort: Snug & non-restrictive fit.</li>
                                <li>Versatile Essential: Suitable for all occasions.</li>
                                <li>Travel-Friendly: Lightweight & easy to pack.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Product details not found</p>
            )}
        </div>
        </div>
    );
};

export default ProductDetails;
