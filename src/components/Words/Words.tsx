import React, { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useSwipeable } from "react-swipeable";

import { Loader } from "~/components";
import { List } from "./List";
import { list } from "./data";
import { TItem } from "./data/types";
import styles from "./words.module.css";

const itemsPerPage: number = 50;

const Words: React.FC = () => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<TItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlers = useSwipeable({
    onSwipedLeft: (): void => {
      if (currentPage + 1 === pageCount) return;
      const newOffset = ((currentPage + 1) * itemsPerPage) % list.length;

      toggleLoading(true);
      setCurrentPage((currentPage: number): number => currentPage + 1);
      setItemOffset(newOffset);
    },

    onSwipedRight: (): void => {
      if (currentPage === 0) return;
      const newOffset = ((currentPage - 1) * itemsPerPage) % list.length;

      toggleLoading(true);
      setCurrentPage((currentPage) => currentPage - 1);
      setItemOffset(newOffset);
    },
  });

  const handlePageChange = ({ selected }: { selected: number }): void => {
    const newOffset = (selected * itemsPerPage) % list.length;

    toggleLoading(true);
    setCurrentPage(selected);
    setItemOffset(newOffset);
  };

  const handleWordsLoaded = (): void => {
    toggleLoading(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect((): void => {
    const endOffset: number = itemOffset + itemsPerPage;

    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset]);

  return (
    <>
      {currentItems && !!currentItems.length && (
        <>
          <div className={styles.pagination} style={{ opacity: isLoading ? 0 : 1 }}>
            <Pagination
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
              onPageChange={handlePageChange}
              pageClassName={styles["pagination-item"]}
              pageLinkClassName={styles["pagination-link"]}
              previousLabel={
                <button className={styles["pagination-arrow"]} type="button">
                  {"<"}
                </button>
              }
              {...{ pageCount }}
            />
          </div>

          <table className={styles.table} {...handlers}>
            <List items={currentItems} onDataLoaded={handleWordsLoaded} />

            <tfoot className={styles.tfoot}>
              <tr>
                <td colSpan={3}>
                  {currentPage + 1 === pageCount
                    ? `${list.length} ???? ${list.length}`
                    : `${(currentPage + 1) * currentItems.length} ???? ${
                        list.length
                      }`}
                </td>
              </tr>
            </tfoot>
          </table>

          <div className={styles.pagination} style={{ opacity: isLoading ? 0 : 1 }}>
            <Pagination
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
              onPageChange={handlePageChange}
              pageClassName={styles["pagination-item"]}
              pageLinkClassName={styles["pagination-link"]}
              previousLabel={
                <button className={styles["pagination-arrow"]} type="button">
                  {"<"}
                </button>
              }
              {...{ pageCount }}
            />
          </div>
        </>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export { Words };
