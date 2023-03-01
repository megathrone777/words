import WiktionaryScraper from "js-wiktionary-scraper";

import { THandler } from "./types";

const handler: THandler = async (request, response) => {
  const titles: string[] = request.body["titles"];
  const api = new WiktionaryScraper("en");

  const results = await Promise.allSettled(
    titles.map((title) => api.fetchData(title))
  );

  const pages = results.map((result) => {
    const { status } = result;

    if (status === "fulfilled") return result.value;
    return result.reason;
  });

  response.status(200).json(pages);
};

export default handler;
