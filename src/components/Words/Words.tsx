import React, { useEffect, useState } from "react";

import { useSwipeable } from "react-swipeable";

import { Loader, Pagination } from "~/components";
import { List } from "./List";
import { nouns } from "./data";
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
      const newOffset = ((currentPage + 1) * itemsPerPage) % nouns.length;

      toggleLoading(true);
      setCurrentPage((currentPage: number): number => currentPage + 1);
      setItemOffset(newOffset);
    },

    onSwipedRight: (): void => {
      if (currentPage === 0) return;
      const newOffset = ((currentPage - 1) * itemsPerPage) % nouns.length;

      toggleLoading(true);
      setCurrentPage((currentPage) => currentPage - 1);
      setItemOffset(newOffset);
    },
  });

  const handlePageChange = ({ selected }: { selected: number }): void => {
    const newOffset = (selected * itemsPerPage) % nouns.length;

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

    setCurrentItems(nouns.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(nouns.length / itemsPerPage));
  }, [itemOffset]);

  return (
    <>
      {currentItems && !!currentItems.length && (
        <>
          <Pagination
            {...{ currentPage, pageCount }}
            onPageChange={handlePageChange}
          />

          <table className={styles.table} {...handlers}>
            <List items={currentItems} onDataLoaded={handleWordsLoaded} />

            <tfoot className={styles.tfoot}>
              <tr>
                <td colSpan={3}>
                  {currentPage + 1 === pageCount
                    ? `${nouns.length} из ${nouns.length}`
                    : `${(currentPage + 1) * currentItems.length} из ${
                        nouns.length
                      }`}
                </td>
              </tr>
            </tfoot>
          </table>

          <Pagination
            {...{ currentPage, pageCount }}
            onPageChange={handlePageChange}
          />
        </>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export { Words };
