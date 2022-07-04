import React from "react";
import { Link } from "react-router-dom";

const EmptyCart = () => {
  return (
    <div
      style={{
        backgroundColor: "#03a9f433",
        border: "1px solid #ccc",
        padding: 2,
      }}
    >
      <p style={{ fontSize: 18, textAlign: "center" }}>
        Your cart is empty <Link to={"/"}>Go Back</Link>
      </p>
    </div>
  );
};

export default EmptyCart;
