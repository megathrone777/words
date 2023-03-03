import axios, { AxiosResponse } from "axios";
import WikiTextParser from "parse-wikitext";

import { THandler, TPage, TRevision } from "./types";

const parser = new WikiTextParser();

const handler: THandler = async (request, response) => {
  const titles = request.body["titles"];
  const wordsResponse: AxiosResponse<TRevision> = await axios.get("api.php", {
    baseURL: "https://en.wiktionary.org/w/",
    params: {
      action: "query",
      format: "json",
      formatversion: 2,
      prop: "revisions",
      rvprop: "content",
      rvslots: "*",
      titles: titles.join("|"),
    },
  });
  const wordsData = Object.values(wordsResponse["data"]["query"]["pages"]);

  const sections = wordsData.map((page, index) => {
    const pronunciation = page["revisions"][0]["slots"]["main"]["content"];
    const lines = parser.pageToSectionObject(pronunciation);

    if (
      (lines["English"] &&
        lines["English"]["Pronunciation"] &&
        lines["English"]["Pronunciation"]["content"]) ||
      (lines["English"] &&
        lines["English"]["Etymology 1"] &&
        lines["English"]["Etymology 1"]["Pronunciation"] &&
        lines["English"]["Etymology 1"]["Pronunciation"]["content"])
    ) {
      const content =
        lines["English"]["Pronunciation"] ||
        lines["English"]["Etymology 1"]["Pronunciation"];

      const audioLine = content["content"].find((line: string): boolean =>
        line.includes("audio|en")
      );
      const transcriptionLine: string = content["content"].find(
        (line: string): boolean => line.includes("IPA|en")
      );

      const audioFile = audioLine
        ? `File:${audioLine
            .match(/\en\|(|[^\]+[*|])*/im)![0]
            .replace("en|", "")
            .trim()}${index === wordsData.length - 1 ? "" : "|"}`
        : "";
      const transcription = transcriptionLine
        ? transcriptionLine.match(/\/([^/]+\/)/im)![0]
        : "";

      return {
        audioFile,
        title: page["title"],
        transcription,
      };
    }

    return {
      audioFile: "",
      title: page["title"],
      transcription: "",
    };
  });

  if (sections && !!sections.length) {
    const audioQuery = sections
      .map((section) => {
        if (section) {
          return section["audioFile"];
        }

        return "";
      })
      .join("");

    const audioResponse: AxiosResponse<TPage> = await axios.get("api.php", {
      baseURL: "https://en.wiktionary.org/w/",
      params: {
        action: "query",
        format: "json",
        prop: "imageinfo",
        iiprop: "timestamp|url",
        titles: audioQuery,
      },
    });

    const audioData = Object.values(audioResponse["data"]["query"]["pages"]);

    const pages = sections.reduce((accumulator, currentSection) => {
      if (accumulator && currentSection) {
        const { audioFile, transcription, title } = currentSection;
        const file = audioFile.replace("|", "").toLowerCase();
        const audioLink = audioData.find(
          (item) => item.title.toLowerCase() === file
        );

        return {
          ...accumulator,
          [title]: {
            audioLink:
              audioLink && audioLink["imageinfo"]
                ? audioLink["imageinfo"][0]["url"]
                : "",
            transcription,
          },
        };
      }

      return {};
    }, {});

    response.status(200).json(pages);
  }
};

export default handler;
