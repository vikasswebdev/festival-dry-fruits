import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Brands.module.css";

const Brands = () => {
  const navigate = useNavigate();

  const addBrandHandler = () => {
    navigate("/admin/brands/add");
  };

  return (
    <div className={styles.brandsScreen}>
      <div className={styles.brandsScreen__header}>
        <h2>Brands</h2>
        <button
          onClick={addBrandHandler}
          className={styles.brandsScreen__button}
        >
          Add Brand
        </button>
      </div>
      <div className={styles.brandsScreen__body}>
        <Link to={"/"} className={styles.brandsScreen__body__item_link}>
          <div className={styles.brandsScreen__body__item}>
            <div className={styles.brandsScreen__body__item__image}>
              <img src="https://via.placeholder.com/150" alt="" />
            </div>
            <div className={styles.brandsScreen__body__item__name}>
              <h3>Brand Name</h3>
            </div>
            <div className={styles.brandsScreen__body__item__description}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quidem.
              </p>
            </div>
          </div>
        </Link>
        <Link to={"/"} className={styles.brandsScreen__body__item_link}>
          <div className={styles.brandsScreen__body__item}>
            <div className={styles.brandsScreen__body__item__image}>
              <img src="https://via.placeholder.com/150" alt="" />
            </div>
            <div className={styles.brandsScreen__body__item__name}>
              <h3>Brand Name</h3>
            </div>
            <div className={styles.brandsScreen__body__item__description}>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, quidem.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Brands;
