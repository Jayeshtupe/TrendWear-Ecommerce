import { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const UserProfile = () => {
    const user = {
        name: "Jayesh Tupe",
        email: "jayeshtupe7@gmail.com",
        phone: "+91 8356874651",
        photo: "profile.png"
    };

    const [addresses, setAddresses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editAddress, setEditAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({ street: "", city: "", state: "", zipCode: "" });

    useEffect(() => {
        axios.get("https://trendwear-backend.vercel.app/address")
            .then(response => {
                console.log("API Response:", response.data); // Debugging
                if (Array.isArray(response.data.address)) {
                    setAddresses(response.data.address);
                
                } else {
                    console.error("Unexpected API response format:", response.data);
                    setAddresses([]); 
                }
            })
            .catch(error => console.error("Error fetching addresses:", error));
    }, []);
    
    const handleChange = (e) => {
        const {name, value} = e.target
        setNewAddress({ ...newAddress,
            [name]: name === "zipCode" ? parseInt(value) : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Address:", newAddress); // Debugging
    
        if (editAddress) {
            axios.patch(`https://trendwear-backend.vercel.app/address/${editAddress._id}`, newAddress)
                .then(response => {
                    console.log("Updated Address Response:", response.data); // Debugging
                    setAddresses(addresses.map(addr => (addr._id === editAddress._id ? response.data : addr)));
                    resetForm();
                })
                .catch(error => console.error("Error updating address:", error));
        } else {
            axios.post("https://trendwear-backend.vercel.app/address", newAddress)
                .then(response => {
                    console.log("Added Address Response:", response.data); // Debugging
                    setAddresses([...addresses, response.data]); // Update UI
                    resetForm();
                })
                .catch(error => console.error("Error adding address:", error.response?.data || error));
        }
    };
    

    const handleDelete = (id) => {
        axios.delete(`https://trendwear-backend.vercel.app/address/${id}`)
            .then(() => {
                setAddresses(addresses.filter(addr => addr._id !== id));
            })
            .catch(error => console.error("Error deleting address:", error));
    };

    const handleEdit = (address) => {
        setEditAddress(address);
        setNewAddress(address);
        setShowForm(true);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditAddress(null);
        setNewAddress({ street: "", city: "", state: "", zip: "" });
    };

    return (
        <div>
            <Header />
            <div className="container mt-4">
                <h6 className="text-center mb-4 text-secondary display-6">User Profile</h6>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <div className="card shadow p-4 align-items-center">
                            <img 
                                src={user.photo} 
                                alt="Profile" 
                                className="rounded-circle border"
                                style={{ width: "120px", height: "120px", objectFit: "cover" }} 
                            />
                            <h5>{user.name}</h5>
                            <p><strong>Email:</strong> {user.email}</p>
                            <p><strong>Phone:</strong> {user.phone}</p>
                        </div>
                    </div>

                    <div className="col-md-8 mb-4">
                        <div className="card shadow p-4 mb-3">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <h5>Saved Addresses</h5>
                                <button className="btn btn-primary mt-3" onClick={() => { setShowForm(true); setEditAddress(null); }}>
                                    Add New Address
                                </button>
                            </div>

                            {addresses.map((address) => (
                                <div key={address._id} className="border p-3 rounded my-2 d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-1"><strong>Street:</strong> {address.street}</p>
                                        <p className="mb-1"><strong>City:</strong> {address.city}, <strong>State:</strong> {address.state}</p>
                                        <p className="mb-1"><strong>Zip Code:</strong> {address.zipCode}</p>
                                    </div>
                                    <div>
                                        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => handleEdit(address)}>Edit</button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(address._id)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {showForm && (
                    <div className="modal show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">{editAddress ? "Edit Address" : "Add New Address"}</h5>
                                    <button type="button" className="btn-close" onClick={resetForm}></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={handleSubmit}>
                                        <label className="form-label">Street</label>
                                        <input type="text" className="form-control" name="street" value={newAddress.street} onChange={handleChange} required />

                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" name="city" value={newAddress.city} onChange={handleChange} required />

                                        <label className="form-label">State</label>
                                        <input type="text" className="form-control" name="state" value={newAddress.state} onChange={handleChange} required />

                                        <label className="form-label">Zip Code</label>
                                        <input type="number" className="form-control" name="zipCode" value={newAddress.zipCode} onChange={handleChange} required />

                                        <div className="modal-footer">
                                            <button type="submit" className="btn btn-success">{editAddress ? "Update Address" : "Save Address"}</button>
                                            <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer/>
        </div>
    );
};

export default UserProfile;
