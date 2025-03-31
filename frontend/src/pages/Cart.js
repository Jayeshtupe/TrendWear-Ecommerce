import Header from "../components/Header";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://trendwear-backend.vercel.app/cart")
            .then((res) => res.json())
            .then((data) => {
                setCart(data.cart || []);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load cart data");
                setLoading(false);
            });
    }, []);

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`https://trendwear-backend.vercel.app/cart/${productId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setCart(cart.filter((item) => item._id !== productId));
            } else {
                console.error("Failed to delete item from cart");
            }
        } catch (error) {
            console.error("Error deleting item", error);
        }
    };

    const handleUpdateQuantity = async (productId, newQuantity) => {
        if(newQuantity < 1) return

        try{
            const response = await fetch(`https://trendwear-backend.vercel.app/cart/${productId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({quantity: newQuantity})
            })

            if(response.ok){
                setCart(cart.map((item) => item._id === productId ? {...item, quantity: newQuantity} : item))
            } else {
                console.error("Failed to update quantity")
            }
        } catch(error){
            console.error("Error updating quantity", error)
        }
    }

    const totalOriginalPrice = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
    const totalDiscountedPrice = cart.reduce((acc, item) => acc + item.discountedPrice * item.quantity, 0);
    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    const deliveryCharge = totalDiscountedPrice > 1000 ? 0 : 50; // Free delivery over ₹1000
    const grandTotal = totalDiscountedPrice + deliveryCharge;



    return (
        <div>
            <Header/>
            <div className="container my-4">
            <h2 className="text-center mb-4 fw-bold">🛒 Shopping Cart</h2>
            {loading && <p className="text-center">Loading...</p>}
            {error && <p className="text-danger text-center">{error}</p>}

            {cart.length > 0 ? (
                <div className="row">
                    <div className="col-md-8">
                        {cart.map((item) => (
                            <div className="card mb-3 shadow-sm p-2" key={item._id}>
                                <div className="row align-items-center">
                                    <div className="col-md-4 text-center">
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            className="img-fluid rounded"
                                            style={{ maxHeight: "150px", objectFit: "cover" }}
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <h5 className="fw-bold">{item.name}</h5>
                                        <p>
                                            <span className="text-decoration-line-through text-danger">₹{item.originalPrice}</span> {" "}
                                            <span className="fw-bold text-success">₹{item.discountedPrice}</span>
                                            <span className="text-success ms-2">({item.discount}% OFF)</span>
                                        </p>
                                        <p>
                                            Quantity: 
                                            <button className="btn btn-outline-secondary py-1 ms-2" size="sm" onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}> -</button>
                                            <span> {item.quantity} </span>
                                            <button className="btn btn-outline-secondary py-1" size="sm" onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}> +</button>
                                        </p>
                                    </div>
                                    <div className="col-md-2 text-center">
                                        <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item._id)}>
                                            <RxCross2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="col-md-4">
                        <div className="card p-3 shadow">
                            <h4 className="fw-bold">Cart Summary</h4>
                            <hr />
                            <p>Original Price: <span className="float-end">₹{totalOriginalPrice}</span></p>
                            <p className="text-success">Discount: <span className="float-end">-₹{totalDiscount}</span></p>
                            <p>Delivery Fee: <span className="float-end">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span></p>
                            <hr />
                            <h5 className="fw-bold">Total Amount: <span className="float-end">₹{grandTotal}</span></h5>
                            <Link to="/checkout" className="btn btn-primary w-100 mt-3">Proceed to Checkout</Link>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Your cart is empty 🛒</p>
            )}
        </div>
        </div>
    );
};

export default Cart;
