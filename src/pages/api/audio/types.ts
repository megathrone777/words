import { NextApiRequest, NextApiResponse } from "next";

export interface THandler {
  (request: NextApiRequest, response: NextApiResponse): Promise<void>;
}
