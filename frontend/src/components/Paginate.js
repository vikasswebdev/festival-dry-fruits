import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 0 && (
      <div className="paginateContainer">
        <ul className="paginate">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `/page/${x + 1}`
                    : `/admin/productlist/${x + 1}`
                }
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

export default Paginate;
