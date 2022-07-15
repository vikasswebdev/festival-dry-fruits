import React, { useState } from "react";
import styles from "./Brands.module.css";

const EditBrand = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);

  const addBrandHandler = (e) => {
    e.preventDefault();
    console.log(name, description, image, isActive);
  };

  return (
    <div className={styles.brandsScreen}>
      <div className={styles.brandsScreen__header}>
        <h2>Add Brand</h2>
      </div>
      <div className={styles.brandsScreen__body}>
        <form className={styles.form}>
          <div className={styles.formControl}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formControl}>
            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              name="image"
            />
            <input type="file" id="file" hidden name="image" />
          </div>
          <div
            className={styles.formControl}
            style={{ flexDirection: "row", alignItems: "center" }}
          >
            <label htmlFor="isActive">Is Active</label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
            />
          </div>
          <button onClick={addBrandHandler} className={styles.addBrandBtn}>
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBrand;
