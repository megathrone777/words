import axios from "axios";

import { THandler, TPage } from "./types";

const handler: THandler = async (request, response) => {
  const titles = request.body["titles"];

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

  response.status(200).send(pages);
};

export default handler;
