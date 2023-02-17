import React, { useEffect, useState } from "react";
import Pagination from "react-paginate";
import { useSwipeable } from "react-swipeable";

import { Loader } from "~/components";
import { List } from "./List";
import { TWord } from "./List/Item/types";
import { list } from "./data";
import styles from "./words.module.css";

const itemsPerPage: number = 50;

const Words: React.FC = () => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<Omit<TWord, "audioLink">[]>(
    []
  );
  const [pageCount, setPageCount] = useState<number>(0);

  const handlers = useSwipeable({
    onSwipedLeft: (): void => {
      toggleLoading(true);
      setItemOffset((itemOffset) => itemOffset + itemsPerPage);
    },

    onSwipedRight: (): void => {
      if (itemOffset === 0) return;
      toggleLoading(true);
      setItemOffset((itemOffset) => itemOffset - itemsPerPage);
    },
  });

  const handlePageChange = ({ selected }: { selected: number }): void => {
    const newOffset = (selected * itemsPerPage) % list.length;

    toggleLoading(true);
    setItemOffset(newOffset);
  };

  const handleWordsLoaded = (): void => {
    toggleLoading(false);
  };

  useEffect((): void => {
    const endOffset: number = itemOffset + itemsPerPage;

    setCurrentItems(list.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(list.length / itemsPerPage));
  }, [itemOffset]);

  return (
    <>
      {currentItems && !!currentItems.length && (
        <table className={styles.table} {...handlers}>
          <List items={currentItems} onDataLoaded={handleWordsLoaded} />

          <tfoot className={styles.tfoot}>
            <tr>
              <td colSpan={3}>{list.length}</td>
            </tr>
          </tfoot>
        </table>
      )}

      <div className={styles.pagination}>
        <Pagination
          activeClassName={styles["pagination-item-selected"]}
          activeLinkClassName={styles["pagination-link-active"]}
          containerClassName={styles["pagination-list"]}
          disabledClassName={styles["pagination-arrow-disabled"]}
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

      {isLoading && <Loader />}
    </>
  );
};

export { Words };
