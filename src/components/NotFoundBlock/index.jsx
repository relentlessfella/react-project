import React from "react";
import styles from "./NotFoundBlock.module.scss";

export const NotFound = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span></span>
        <br />
        NotFound
      </h1>
      <p className={styles.description}>Unfortunately page failed to load</p>
    </div>
  );
};

export default NotFound;
