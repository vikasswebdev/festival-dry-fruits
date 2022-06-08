import React, { useEffect } from "react";
import "../css/productlistscreen.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { orderListAction } from "../actions/orderActions";
import Loader from "../components/Loader";
import OrderPaginate from "../components/admin/OrderPaginate";

const OrderListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pageNumber } = useParams();

  const mypageNumber = pageNumber || 1;

  const orderList = useSelector((state) => state.orderList);

  const { orders, loading, error } = orderList;

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(orderListAction(mypageNumber));
    } else {
      navigate("/");
    }
  }, [dispatch, userInfo, navigate]);

  return (
    <div className="productsContainer">
      {loading ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="topContainer">
            <h1>ORDERS</h1>
          </div>
          <table className="table" border={1}>
            <thead>
              <tr>
                <th>ID</th>
                <th>USER</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.orders.map((order, index) => {
                  return (
                    <tr
                      key={order._id}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white",
                      }}
                    >
                      <td>{order._id}</td>
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice} &#8377; </td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          order.deliveredAt
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </td>
                      <td>
                        <Link to={`/order/${order._id}`}> Details</Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </>
      )}

      {orders && <OrderPaginate page={orders.page} pages={orders.pages} />}
    </div>
  );
};

export default OrderListScreen;
