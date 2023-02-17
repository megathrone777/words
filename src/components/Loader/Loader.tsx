import React from "react";

import styles from "./loader.module.css";

const Loader: React.FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.spinner} />
  </div>
);

export { Loader };
