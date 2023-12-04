import React from "react";
import { Books } from "./dataTestMidterm";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";

export class CatalogItem extends React.Component {
  state = { show: false, showP: false };

  handleAddToCart = () => {
    const { product, addToCart } = this.props;

    if (product.stock) {
      addToCart(product);
    } else {
      alert("ขออภัย หนังสือนี้ไม่มีในสต็อก");
    }
  };

  render() {
    const { product } = this.props;

    return (
      <div className="card mb-3">
        <div className="row no-gutters">
          <div className="col-md-12">
            <img
              src={product.b_img}
              className="card-img-top w-100"
              alt={product.b_name}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-body">
                <span className="badge bg-warning text-dark me-2">
                  ขายดีอันดับที่ {product.topList_order}
                </span>
                <h3 className="card-title mb-3">{product.b_name}</h3>

                <p className="text-secondary">เขียนโดย {product.author}</p>
                <p className={`text-${product.stock ? "success" : "danger"}`}>
                  สถานะ: {product.stock ? "มีสินค้า" : "สินค้าหมด"}
                </p>

                <h4 className="card-text my-2 text-info">฿{product.pice}</h4>
                <Link to={`/details/${product.isbn}`}>
                  <button type="button" className="btn btn-outline-dark me-2">
                    รายละเอียด
                  </button>
                </Link>
                <button
                  type="button"
                  className={`btn ${
                    product.stock ? "btn-dark" : "btn-danger"
                  } mt-2 d-flex align-items-center`}
                  onClick={product.stock ? this.handleAddToCart : null}
                  disabled={!product.stock}
                >
                  <span className="material-symbols-outlined">
                    add_shopping_cart
                  </span>
                  {product.stock ? "เพิ่มลงตะกร้า" : "สินค้าหมดสต็อก"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export class Catalog extends React.Component {
  render() {
    const { addToCart } = this.props;

    const sortedBooks = Books.slice().sort(
      (a, b) => a.topList_order - b.topList_order
    );

    return (
      <div className="container">
        <div className="row">
          {sortedBooks.map((product) => (
            <div key={product.isbn} className="col-md-4">
              <CatalogItem product={product} addToCart={addToCart} />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
