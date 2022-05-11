import React from "react";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, keyword = "" }) => {
  return (
    pages > 0 && (
      <div className="paginateContainer">
        <ul className="paginate">
          {Array.from(Array(pages), (x, i) => i + 1).map((x) => (
            <li key={x + 1}>
              <Link
                to={keyword ? `/search/${keyword}/page/${x}` : `/page/${x}`}
                className={page === x ? "active" : ""}
              >
                {x}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Paginate;
