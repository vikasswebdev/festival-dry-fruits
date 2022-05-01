import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import "../css/productscreen.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReviewAction,
  productListDetails,
} from "../actions/productActions";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_REVIEW_RESET,
} from "../constants/productConstants";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductScreen = () => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  const productDetails = useSelector((state) => state.productDetails);

  const { product, loading, error } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const productReviews = useSelector((state) => state.productReview);

  const {
    success: successReview,
    loading: loadingReview,
    error: errorReview,
  } = productReviews;

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      toast.success("Your review submited.", {
        position: "top-center",
      });
    }

    if (errorReview) {
      toast.error(errorReview, { position: "top-center" });
    }

    toast.configure({
      autoClose: 3000,
      draggable: false,
    });

    if (!product._id || product._id !== id) {
      dispatch(productListDetails(id));
      dispatch({ type: PRODUCT_REVIEW_RESET });
    }
  }, [dispatch, navigate, successReview, errorReview]);

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    // console.log("review", id, { rating, comment });
    dispatch(createProductReviewAction(id, { rating, comment }));
  };

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      {loading && (
        <div>
          <Loader />
        </div>
      )}
      <div className="container">
        <div className="backHome">
          <Link to="/">
            <i className="fas fa-arrow-left"></i>
          </Link>
        </div>
        <div className="productInfo">
          <div className="productImage">
            <img src={`${product.image}`} alt="" />
          </div>
          <div className="productDetail">
            <h1>{product.name}</h1>
            <hr />
            <div className="rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <span> {product.numReviews} reviews</span>
            </div>
            <hr />
            <div className="price">
              <h3>Price: ${product.price}</h3>
            </div>
            <hr />
            <div className="description">
              <p>{product.description}</p>
            </div>
          </div>
          <div className="priceContainer">
            <div className="priceCard">
              <div className="listItem">
                <p>Price:</p>
                <p>
                  <strong>{product.price} &#8377;</strong>
                </p>
              </div>
              <div className="listItem">
                <p>Status:</p>
                <p> {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}</p>
              </div>
              {product.countInStock > 0 && (
                <div className="listItem">
                  <p>Quantity:</p>
                  <select onChange={(e) => setQty(e.target.value)}>
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              <div className="listItem" style={{ justifyContent: "center" }}>
                <button
                  onClick={addToCartHandler}
                  className="addToCart"
                  disabled={product.countInStock === 0}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="reviewContainer">
          <div className="writeReview">
            <h1>Write a Review</h1>
            {loadingReview && <div>Loading...</div>}
            {userInfo ? (
              <form onSubmit={reviewSubmitHandler}>
                <div className="form-control">
                  <label htmlFor="rating">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    name="rating"
                    id="rating"
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="form-control">
                  <label htmlFor="comment">Comment</label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="10"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button type="submit" className="submitReview">
                  Submit Review
                </button>
              </form>
            ) : (
              <div className="loginToReview">
                Please <Link to="/login">sign in</Link> to write a review{" "}
              </div>
            )}
          </div>
          <hr />
          {product.reviews.length === 0 && <h1>No Reviews</h1>}
          {product.reviews.map((review) => (
            <div key={review._id}>
              <h3>{review.name}</h3>
              <Rating value={review.rating} />
              <p>{review.createdAt.substring(0, 10)}</p>
              <div className="reviewDesc">
                <p>{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductScreen;
