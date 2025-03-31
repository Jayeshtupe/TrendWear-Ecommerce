import { useEffect, useState } from "react"
const LatestProducts = () => {
    const [latestProducts, setLatestProducts] = useState([])

    useEffect(() => {
        fetch("https://trendwear-backend.vercel.app/products")
        .then((res) => res.json())
        .then((data) => {
            const sortedProducts = data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
            setLatestProducts(sortedProducts.slice(0,4))
        })
        .catch((error) => console.error("Error fetching products:", error))
    }, [])
    return (
        <div className="container my-5">
            <h2 className="text-center fw-bold mb-3">New Arrivals</h2>
            <div className="row g-4 row row-cols-2 row-cols-md-4">
                {latestProducts.map((product) => (
                    <div key={product.id} className="col">
                        <div className="card shadow-sm border-0 rounded">
                        <div className="position-relative overflow-hidden">
                        <img className="card-img-top img-fixed" src={product.imageUrl} alt={product.name} />
                            </div>
                            <div className="card-body text-center">
                            <h5 className="fw-bold">{product.name}</h5>
                            </div>
                        </div>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestProducts
