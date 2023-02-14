import React, { useEffect, useState } from "react";

import { Loader } from "~/components";
import { Item } from "./Item";
import { TWord } from "./Item/types";
import styles from "./words.module.css";

const Words: React.FC = () => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const [list, setList] = useState<TWord[]>([]);

  const getWordsData = async (): Promise<void> => {
    const response: Response = await fetch("/api/words");
    const data: TWord[] = await response.json();

    if (data) {
      setList(data);
      toggleLoading(false);

      return;
    }

    toggleLoading(false);
  };

  useEffect((): void => {
    getWordsData();
  }, []);

  return (
    <>
      {list && !!list.length && (
        <table className={styles.table}>
          <tbody>
            {list.map(
              ({ word, ...rest }: TWord): React.ReactElement => (
                <Item key={word} {...{ word }} {...rest} />
              )
            )}
          </tbody>

          <tfoot>
            <tr>
              <td colSpan={3}>{list.length}</td>
            </tr>
          </tfoot>
        </table>
      )}

      {isLoading && <Loader />}
    </>
  );
};

export { Words };
