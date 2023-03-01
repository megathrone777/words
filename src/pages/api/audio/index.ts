import axios from "axios";

import { THandler } from "./types";

const handler: THandler = async (request, response) => {
  const audioFile = request.body["audioFile"];
  const fileResponse = await axios.get("api.php", {
    baseURL: "https://en.wiktionary.org/w/",
    params: {
      action: "query",
      format: "json",
      iiprop: "timestamp|url",
      prop: "imageinfo",
      titles: audioFile.replace("/wiki/", ""),
    },
  });
  const file = Object.values(fileResponse["data"]["query"]["pages"])[0];

  response.status(200).send(file);
};

export default handler;
