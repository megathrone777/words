import React, { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { TItem } from "~/components/Words/data/types";
import { Item } from "./Item";
import { TWord } from "./Item/types";
import { TProps } from "./types";

const List: React.FC<TProps> = ({ items, onDataLoaded }) => {
  const [updatedItems, setUpdatedItems] = useState<TWord[]>([]);

  useEffect((): void => {
    const getWordsData = async (): Promise<void> => {
      const titles: string[] = items.map(({ word }: TItem): string => word);
      const response: AxiosResponse<{ [key: TWord["word"]]: TWord }> =
        await axios.post("/api/words", {
          titles,
        });
      const pages = response["data"];

      if (pages) {
        const updatedItems: TWord[] = items.map(({ translation, word }) => ({
          ...pages[word],
          word,
          translation,
        }));

        setUpdatedItems(updatedItems);
        onDataLoaded();
        return;
      }
    };

    getWordsData();
  }, [items]);

  return (
    <>
      <tbody>
        {updatedItems.map(
          ({ word, ...rest }: TWord, index: number): React.ReactElement => (
            <Item key={word} {...{ index, word }} {...rest} />
          )
        )}
      </tbody>
    </>
  );
};

export { List };
