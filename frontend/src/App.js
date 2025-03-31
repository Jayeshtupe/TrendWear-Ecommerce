import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import useFetch from "./useFetch";
import Categories from "./components/Catogeries";
import Products from "./pages/Products";
import LatestProducts from "./components/LatestProducts";
function App() {
  const { data, loading, error } = useFetch("http://localhost:5000/products");

  return (
    <div>
       <Header />
      <div className="container">
        <Categories />
       
        {/* Carousel */}
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
        </div>

        {/* Routing for Category Page */}
        {/* <Routes>
          <Route path="/category/:id" element={<CategoryPage />} />
        </Routes> */}
      </div>
      <LatestProducts/>
    </div>
  );
}

export default App;
