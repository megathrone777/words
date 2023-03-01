import React, { useEffect, useState } from "react";
import axios from "axios";
import { WiktionaryDataResult } from "js-wiktionary-scraper";

import { Item } from "./Item";
import { TWord } from "./Item/types";
import { TProps, TUpdatedItem } from "./types";

const List: React.FC<TProps> = ({ items }) => {
  const [updatedItems, setUpdatedItems] = useState<TUpdatedItem[]>(items);

  useEffect((): void => {
    setUpdatedItems(items);
  }, [items]);

  useEffect((): void => {
    const getWordsData = async (): Promise<void> => {
      const titles: string[] = items.map(({ word }: TWord): string => word);
      const response = await axios.post("/api/words", {
        titles,
      });
      const pages: WiktionaryDataResult[] = await response["data"];

      if (pages) {
        const updatedItems: TUpdatedItem[] = items.map(
          ({ translation, word }, index: number) => ({
            ...pages[index],
            word,
            translation,
          })
        );

        setUpdatedItems(updatedItems);
        return;
      }
    };

    getWordsData();
  }, [items]);

  return (
    <>
      <tbody>
        {updatedItems.map(
          (
            { word, ...rest }: TUpdatedItem,
            index: number
          ): React.ReactElement => (
            <Item key={word} {...{ index, word }} {...rest} />
          )
        )}
      </tbody>
    </>
  );
};

export { List };
