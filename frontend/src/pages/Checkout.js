import { useState, useEffect } from "react";

const Checkout = () => {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null); // Store order details

    useEffect(() => {
        fetch("https://trendwear-backend.vercel.app/address")
            .then((res) => res.json())
            .then((data) => setAddresses(data.address || []))
            .catch(() => console.error("Failed to fetch addresses"));

        fetch("https://trendwear-backend.vercel.app/cart")
       
            .then((res) => res.json())
            .then((data) => setCart(data.cart || []))
            .catch(() => console.error("Failed to fetch cart"));
    }, []);

    const handlePlaceOrder = () => {
        if (!selectedAddress) {
            alert("Please select an address");
            return;
        }

        const orderItems = cart.map(item => ({
            productId: item._id,
            name: item.name,
            quantity: item.quantity,
            originalPrice: item.originalPrice,
            discountedPrice: item.discountedPrice,
            imageUrl: item.imageUrl

        }))

        fetch("https://trendwear-backend.vercel.app/placedOrder", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ addressId: selectedAddress, items: orderItems}),
        })
        .then((res) => res.json())
        .then((data) => {
            setOrderDetails(data.order); 
            setOrderPlaced(true);
        })
        .catch(() => alert("Failed to place order"));
    };

    return (
        <div className="my-4 container">
            {orderPlaced ? (
                <div className="text-center">
                    <h2 className="fw-bold text-success">✅ Order Placed Successfully</h2>
                    <p>Your order has been placed and will be delivered soon.</p>

                    <h4 className="mt-4">Ordered Items:</h4>
                   
                    <ul className="list-group mt-2">
                        {orderDetails?.items?.map((item) => (
                            <li className="list-group-item d-flex align-items-center justify-content-between" key={item._id}>
                                <img src={item.imageUrl} style={{height: "100px"}}/>
                                <span>{item.name} (Quantity: {item.quantity})</span>
                                <span className="fw-bold">₹{item.discountedPrice * item.quantity}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (

                <>
                    <h2 className="fw-bold text-center mb-4">Checkout</h2>
                    <h5>Select a Delivery Address:</h5>
                    {addresses.length === 0 ? (
                        <p>No saved addresses found. Please add an address.</p>
                    ) : (
                        <div className="row">
                            {addresses.map((addr) => (
                                <div className="col-md-6" key={addr._id}>
                                    <div className="card p-3 mb-2 d-flex flex-row align-items-center">
                                        <input 
                                            type="radio" 
                                            name="address" 
                                            value={addr._id} 
                                            onChange={() => setSelectedAddress(addr._id)} 
                                            className="me-2"
                                        />
                                        <span>{addr.street}, {addr.city}, {addr.pincode}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="text-center my-4">
                    <button className="btn btn-success mt-3" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
