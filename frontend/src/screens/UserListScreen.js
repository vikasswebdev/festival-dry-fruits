import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/userslist.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsersAction } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsersAction());
    } else {
      navigate("/login");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteUserHandler = (userId) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteUser(userId));
    }
  };

  return (
    <div className="container">
      <h1>USERS</h1>
      <div className="tabel">
        <div className="tabelHead tabelItem">
          <p>ID</p>
          <p>NAME</p>
          <p>EMAIL</p>
          <p>PHONE</p>
          <p>ADMIN</p>
          <p></p>
        </div>
        <div className="tabelBody">
          {loading && (
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
          {error && <Message varient="danger">{error}</Message>}
          {users &&
            users.map((user) => (
              <div className="tabelItem" key={user._id}>
                <p>{user._id}</p>
                <p>{user.name}</p>
                <p>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </p>
                <p>{user.number}</p>
                <p>
                  {user.isAdmin ? (
                    <i
                      style={{ color: "green" }}
                      className="fa-solid fa-check"
                    ></i>
                  ) : (
                    <i
                      style={{ color: "red" }}
                      className="fa-solid fa-xmark"
                    ></i>
                  )}
                </p>
                <p>
                  <Link to={`/admin/user/${user._id}/edit`}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>

                  <i
                    style={{ marginLeft: 10 }}
                    onClick={() => deleteUserHandler(user._id)}
                    className="fa-solid fa-trash-can"
                  ></i>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default UserListScreen;
