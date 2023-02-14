import { NextApiRequest, NextApiResponse } from "next";

export interface THandler {
  (request: NextApiRequest, response: NextApiResponse): Promise<void>;
}

export interface TPage {
  imageinfo?: {
    url: string;
  }[];
  title: string;
}
