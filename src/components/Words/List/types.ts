import { TWord } from "./Item/types";

export interface TProps {
  items: Omit<TWord, "audioLink">[];
  onDataLoaded: () => void;
}
