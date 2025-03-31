import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import AddToCartWishlist from "./AddToCartWishlist";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("q") || "";
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    fetch(`https://trendwear-backend.vercel.app/products`)
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((product) =>
          product.title.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Error fetching products.");
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container mt-4">
      <h2>Results for "{query}"</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      {products.length === 0 && !loading ? (
        <p>No results found.</p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4">
              <div className="card">
                <img src={product.image} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">₹{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
