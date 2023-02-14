import axios from "axios";

import { list } from "~/components/Words/data";
import { TWord } from "~/components/Words/types";
import { THandler, TPage } from "./types";

const handler: THandler = async (_, response) => {
  const titles = list
    .map(({ word }: TWord): string => `File:En-us-${word}.ogg`)
    .join("|");

  const wordsResponse = await axios.get("api.php", {
    baseURL: "https://en.wiktionary.org/w/",
    params: {
      action: "query",
      format: "json",
      iiprop: "timestamp|url",
      prop: "imageinfo",
      titles,
    },
  });

  const pages: TPage[] = Object.values(wordsResponse["data"]["query"]["pages"]);
  const words: TWord[] = list.map(
    ({ transcription, translation, word }: TWord): TWord => {
      const page: TPage | undefined = pages.find(
        ({ title }: TPage): boolean => title === `File:En-us-${word}.ogg`
      );

      return {
        audioLink: page && page["imageinfo"] ? page["imageinfo"][0]["url"] : "",
        transcription,
        translation,
        word,
      };
    }
  );

  response.status(200).send(words);
};

export default handler;
