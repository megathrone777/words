import React from "react";

import styles from "./loader.module.css";

const Loader: React.FC = () => (
  <span className={styles.wrapper}>
    <span className={styles.spinner} />
  </span>
);

export { Loader };
