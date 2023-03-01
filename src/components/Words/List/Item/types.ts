import { WiktionaryDataResult } from "js-wiktionary-scraper";

declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export interface TWord {
  translation: string;
  word: string;
}

export type TProps = Partial<WiktionaryDataResult> &
  TWord & {
    index: number;
  };
