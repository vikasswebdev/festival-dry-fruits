import React, { useState, useEffect } from "react";
import "../css/productlistscreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  productListDetails,
  productUpdateAction,
} from "../actions/productActions";
import { useParams, useNavigate } from "react-router-dom";
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from "../constants/productConstants";

const ProductEditScreen = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [description, setDescription] = useState("");

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/productlist");
    } else {
      if (!product.name || product._id !== id) {
        dispatch(productListDetails(id));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCategory(product.category);
        setBrand(product.brand);
        setImage(product.image);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, product, id, navigate, successUpdate]);

  const uploadFile = async (e) => {
    const file = e.target.files[0];
    // console.log("file", file);
    let formData = new FormData();
    formData.append("image", file);

    // console.log("formData", formData);

    try {
      const response = await fetch("http://localhost:5001/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });
      const resData = await response.json();
      console.log("res Data", resData);
      setImage(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const product = {
    //   name,
    //   price,
    //   category,
    //   brand,
    //   image,
    //   countInStock,
    //   description,
    // };

    dispatch(
      productUpdateAction({
        _id: id,
        name,
        price,
        category,
        brand,
        image,
        countInStock,
        description,
      })
    );

    // console.log(product);
  };

  return (
    <div className="productsContainer">
      <div className="editProductContainer">
        <h2>EDIT PRODUCT</h2>
        <form className="editForm" onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="price">Price</label>
            <input
              type="text"
              id="price"
              value={price}
              placeholder="Enter Product Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="images">Image</label>
            <input
              type="text"
              id="images"
              placeholder="Enter Product Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input
              type="file"
              name="file"
              id="imagesFile"
              onChange={uploadFile}
            />
          </div>
          <div className="form-control">
            <label htmlFor="brand">Brand</label>
            <select
              name="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              id="brand"
            >
              <option value="">Please select a brand</option>
              <option value="1">Nike</option>
              <option value="2">Adidas</option>
              <option value="3">Puma</option>
              <option value="4">Reebok</option>
              <option value="5">Asics</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="countInStock">Count In Stock</label>
            <input
              type="number"
              id="countInStock"
              placeholder="Enter Count In Stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              id="category"
            >
              <option value="">Please select a category</option>
              <option value="1">Shoes</option>
              <option value="2">T-Shirts</option>
              <option value="3">Jackets</option>
              <option value="4">Jeans</option>
              <option value="5">Shirts</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              id="description"
              rows={8}
              placeholder="Enter Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditScreen;
