import React from "react";
import { Link } from "react-router-dom";

const OrderPaginate = ({ pages, page, isAdmin = false }) => {
  return (
    pages > 0 && (
      <div className="paginateContainer">
        <ul className="paginate">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={`/admin/orderlist/${x + 1}`}
                className={page === x + 1 ? "active" : ""}
              >
                {x + 1}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default OrderPaginate;
