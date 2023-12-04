import React from "react";

export default class Cart extends React.Component {
  render() {
    const { cart, removeFromCart, increaseQuantity, decreaseQuantity } =
      this.props;

    // Calculate the total quantity
    const totalQuantity = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    return (
      <div className="border p-4 rounded">
        <h2 className="mb-4">ตะกร้าสินค้า</h2>
        <ul className="list-unstyled">
          {cart.map((item) => (
            <li key={item.isbn} className="mb-4">
              <div className="d-flex align-items-center">
                <img
                  src={item.b_img}
                  alt={item.b_name}
                  style={{ width: "50px", height: "90px", marginRight: "10px" }}
                />
                <div>
                  <h4 className="mb-2">{item.b_name}</h4>
                  <p className="text-secondary mb-2">฿{item.pice}</p>
                  <div className="d-flex align-items-center">
                    <button
                      onClick={() => decreaseQuantity(item.isbn)}
                      className="btn btn-outline-dark me-2"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.isbn)}
                      className="btn btn-outline-dark ms-2"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.isbn)}
                      className="btn btn-outline-danger ms-2"
                    >
                      ลบออก
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mb-2">จำนวนสินค้าในตะกร้า: {totalQuantity}</p>
        <p className="mb-0">
          ราคารวมทั้งหมด: ฿
          {cart.reduce((total, item) => total + item.pice * item.quantity, 0)}
        </p>
      </div>
    );
  }
}
