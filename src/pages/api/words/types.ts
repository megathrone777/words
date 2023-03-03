import { NextApiRequest, NextApiResponse } from "next";

export interface THandler {
  (request: NextApiRequest, response: NextApiResponse): Promise<void>;
}

export interface TRevision {
  query: {
    pages: {
      title: string;
      revisions: {
        slots: {
          main: {
            content: string;
          };
        };
      }[];
    }[];
  };
}

export interface TPage {
  query: {
    pages: {
      title: string;
      imageinfo: {
        url: string;
      }[];
    }[];
  };
}
