import React from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
// import Categories from './components/Catogeries';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import WishList from './pages/WishList';
import Cart from './pages/Cart';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/Checkout';
import SearchResults from './pages/SearchResults';

const router = createBrowserRouter([
 { 
  path: "/",
  element: <App/>
},
{
  path: "category/:categoryName",
  element: <Products/>
},
{
  path: "productDetails/:productId",
  element: <ProductDetails/>
},
{
  path: "/wishlist",
  element: <WishList/>
},
{
  path: "/cart",
  element: <Cart/>
},
{
  path: "/profile",
  element: <UserProfile/>
},
{
  path: "/checkout",
  element: <Checkout/>
},
{
  path: "/searchResult",
  element: <SearchResults/>
}
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
