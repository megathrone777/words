import React from "react";
import ReactPagination from "react-paginate";

import { TProps } from "./types";
import styles from "./pagination.module.css";

const Pagination: React.FC<TProps> = ({
  currentPage,
  onPageChange,
  pageCount,
}) => (
  <div className={styles["pagination"]}>
    <ReactPagination
      activeClassName={styles["pagination-item-selected"]}
      activeLinkClassName={styles["pagination-link-active"]}
      containerClassName={styles["pagination-list"]}
      disabledClassName={styles["pagination-arrow-disabled"]}
      forcePage={currentPage}
      nextLabel={
        <button className={styles["pagination-arrow"]} type="button">
          {">"}
        </button>
      }
      pageClassName={styles["pagination-item"]}
      pageLinkClassName={styles["pagination-link"]}
      previousLabel={
        <button className={styles["pagination-arrow"]} type="button">
          {"<"}
        </button>
      }
      {...{ pageCount, onPageChange }}
    />
  </div>
);

export { Pagination };
