import "bootstrap/dist/css/bootstrap.min.css"
import {FaRegHeart,} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useNavigate} from "react-router-dom"

function Header() {
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  const handleSearch = (e) => {
    if(e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/allproducts?search=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div style={{backgroundColor: "rgb(235,230,225)"}}>
      <nav className=" navbar bg-body-tertiary">
       <div className="container container-fluid d-flex justify-content-between align-items-center">
          <Link to="/" className="navbar-brand">
            <img src="/logo.png"/>
          </Link>

     <div>
      <input type="text" className="form-control me-2" placeholder="Search for products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyDown={handleSearch}/>
     </div>

  <div className="d-flex align-item-center gap-4">

  <div className="d-flex align-items-center gap-4">
            {/* Wishlist Icon */}
            <Link to="/wishlist" className="position-relative">
              <FaRegHeart size={20} />
              {wishlistCount >= 0 && (
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" className="position-relative">
              <MdOutlineShoppingCart size={20} />
              {cartCount >= 0 && (
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Icon */}
            <Link to="/profile">
              <CgProfile size={20} />
            </Link>
          </div>

  </div>
  </div>
</nav>
    </div>
  )
    
}

export default Header;
