import { WiktionaryDataResult } from "js-wiktionary-scraper";

import { TWord } from "./Item/types";

export type TUpdatedItem = Partial<WiktionaryDataResult> & TWord;

export interface TProps {
  items: TWord[];
  onDataLoaded: () => void;
}
