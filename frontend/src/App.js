import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import { Link } from "react-router-dom";
import useFetch from "./useFetch";
import Categories from "./components/Catogeries";
import Products from "./pages/CategoryProducts";
import LatestProducts from "./components/LatestProducts";
import Footer from "./components/Footer";
function App() {
  const { data, loading, error } = useFetch("http://localhost:5000/products");

  return (
    <div>
       <Header />
      <div className="container">
        <Categories />

        <div className="row align-items-center justify-content-center text-center border shadow-sm bg-light m-0">
      <div className="col-md-6 justify-content-center">
      <h2 className="display-5 pt-3">Upto 20% Discount</h2>
        <Link to="/allproducts" className="btn btn-primary align-items-center gap-2 px-4 py-2 my-3 rounded-pill shadow-sm">
          Shop Now
          <i className="bi bi-cart"></i>
        </Link>
      </div>
      <div className="col-md-6 p-0">
        <img src="/banner.jpg" alt="banner-img" className="img-fluid shadow w-100" />
      </div>
          
        </div>
       
       {/* // Carousel
        <div id="carouselExampleIndicators" className="carousel slide mt-4">
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/banner1.png" className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src="" className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
        </div> */}

        {/* Routing for Category Page */}
        {/* <Routes>
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes> */}
      </div>
      <LatestProducts/>
      <Footer/>
    </div>
  );
}

export default App;
