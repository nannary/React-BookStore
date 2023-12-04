import React, { useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { Catalog, CatalogItem } from "./catalog";
import Cart from "./cart";
import { Books } from "./dataTestMidterm";
import Details from "./Details";
import './YourComponent.css';

const App = () => {
  const [catalog, setCatalog] = useState(Books);
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.isbn === product.isbn);

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.isbn === product.isbn
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.isbn !== productId);
    setCart(updatedCart);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.isbn === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.isbn === productId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    );
    setCart(updatedCart);
  };

  return (
    <Router>
      <div className="container your-component">
        <nav className="navbar navbar-expand-lg navbar-light bg-light p-3">
          <Link to="/" className="navbar-brand">
            <h1>ร้านเอ็นเจหนังสือออนไลน์</h1>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <form className="d-flex ms-auto">
              <input
                type="search"
                className="form-control me-2"
                placeholder="ค้นหา"
                aria-label="Search"
              />
              <button className="btn btn-outline-success" type="submit">
                ค้นหา
              </button>
            </form>
          </div>
        </nav>

        <div className="row mt-3">
          <div className="col-9">
            <Routes>
              <Route
                path="/"
                element={<Catalog catalog={catalog} addToCart={addToCart} />}
              />
              <Route path="/cart" element={<Cart cart={cart} />} />
              <Route
                path="/details/:isbn"
                element={<Details addToCart={addToCart} />}
              />
            </Routes>
          </div>
          <div className="col">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
