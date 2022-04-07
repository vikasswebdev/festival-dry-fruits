import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/productlistscreen.css";
import {
  productCreateAction,
  productDeleteAction,
  productsList,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";

const ProductListScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);

  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({ type: PRODUCT_CREATE_RESET });

    if (!userInfo || !userInfo.isAdmin) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/product/${createdProduct._id}/edit`);
    } else {
      dispatch(productsList());
    }
  }, [dispatch, userInfo, successCreate, successDelete, createdProduct]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(productDeleteAction(id));
    }
  };

  const createProductHandler = () => {
    dispatch(productCreateAction());
  };

  return (
    <div className="productsContainer">
      <div className="topContainer">
        <h1>Products</h1>
        <div className="btnContainer">
          <button className="btn" onClick={createProductHandler}>
            + Create Product
          </button>
        </div>
      </div>
      {loadingCreate && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {loadingDelete && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      )}
      {errorCreate && <div className="error">{errorCreate}</div>}
      {errorDelete && <div className="error">{errorDelete}</div>}
      {loading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Loader />
        </div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table" border={1}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <Link
                    to={`/admin/product/${product._id}/edit`}
                    style={{ color: "black" }}
                  >
                    <i title="Edit" className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <i
                    onClick={() => deleteHandler(product._id)}
                    title="Delete"
                    style={{ marginLeft: 10, cursor: "pointer" }}
                    className="fa-solid fa-trash-can"
                  ></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProductListScreen;
