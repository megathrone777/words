import React, { useEffect, useState } from "react";
import axios from "axios";

import { Item } from "./Item";
import { TWord } from "./Item/types";
import { TPage } from "~/pages/api/words/types";
import { TProps } from "./types";

const List: React.FC<TProps> = ({ items, onDataLoaded }) => {
  const [updatedItems, setUpdatedItems] = useState<TWord[]>([]);

  useEffect((): void => {
    const getWordsData = async (): Promise<void> => {
      const titles: string = items
        .map(
          ({ word }: Omit<TWord, "audioLink">): string =>
            `File:En-us-${word}.ogg`
        )
        .join("|");

      const response = await axios.post("/api/words", {
        titles,
      });
      const pages: TPage[] = await response["data"];

      if (pages) {
        const words: TWord[] = items.map(
          ({
            transcription,
            translation,
            word,
          }: Omit<TWord, "audioLink">): TWord => {
            const page: TPage | undefined = pages.find(
              ({ title }: TPage): boolean => title === `File:En-us-${word}.ogg`
            );

            return {
              audioLink:
                page && page["imageinfo"] ? page["imageinfo"][0]["url"] : "",
              transcription,
              translation,
              word,
            };
          }
        );

        setUpdatedItems(words);
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
          ({ word, ...rest }: TWord): React.ReactElement => (
            <Item key={word} {...{ word }} {...rest} />
          )
        )}
      </tbody>
    </>
  );
};

export { List };
