import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Books } from "./dataTestMidterm";

const Details = ({ addToCart }) => {
  const { isbn } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const foundProduct = Books.find((item) => item.isbn === isbn);
    setProduct(foundProduct);
  }, [isbn]);

  const handleAddToCart = () => {
    if (product.stock) {
      addToCart({ ...product, quantity });
      // Reset quantity to 1 after adding to cart
      setQuantity(1);
    } else {
      alert("ขออภัย หนังสือนี้ไม่มีในสต็อก");
    }
  };

  if (!product) {
    return <div className="container mt-5">ไม่พบสินค้า</div>;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img
            src={product.b_img}
            className="img-fluid rounded"
            alt={product.b_name}
          />
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                <span className="badge bg-warning text-dark me-2">
                  ขายดีอันดับที่ {product.topList_order}{" "}
                </span>{" "}
                #{product.isbn}
              </h5>
              <h1 className="card-title">{product.b_name}</h1>
              <p className="text-secondary">{product.b_title}</p>
              <b className="text-secondary">เขียนโดย {product.author}</b>
              <p className={`text-${product.stock ? "success" : "danger"}`}>
                สถานะ: {product.stock ? "มีสินค้า" : "สินค้าหมด"}
              </p>

              <h3 className="card-text my-2 text-info">฿{product.pice}</h3>
              
              <p><span className="badge bg-info text-dark me-2">เนื้อหาโดยสังเขป : </span> {product.breif_content}</p>

              <button
                type="button"
                className={`btn ${
                  product.stock ? "btn-dark" : "btn-danger"
                } mt-2 d-flex align-items-center`}
                onClick={product.stock ? handleAddToCart : null}
                disabled={!product.stock}
              >
                <span className="material-symbols-outlined me-1">
                  add_shopping_cart
                </span>
                {product.stock ? "เพิ่มลงตะกร้า" : "สินค้าหมดสต็อก"}
              </button>
              <br></br>
              <Link
                to="/"
                className="btn btn-outline-dark mb-3 d-flex align-items-center"
              >
                <span className="material-symbols-outlined">arrow_back</span>{" "}
                กลับหน้าหลัก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
