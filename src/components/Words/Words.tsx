import React, { useEffect, useState } from "react";

import { Loader } from "~/components";
import { TWord } from "./types";
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
              ({
                audioLink,
                word,
                transcription,
                translation,
              }: TWord): React.ReactElement => (
                <tr key={word}>
                  <td>{word}</td>
                  <td>
                    <span>{transcription}</span>

                    {audioLink && (
                      <audio controls preload="metadata">
                        <source src={audioLink} type="audio/ogg" />
                      </audio>
                    )}
                  </td>
                  <td>{translation}</td>
                </tr>
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
