import { TItem } from "~/components/Words/data/types";

export interface TProps {
  items: TItem[];
  onDataLoaded: () => void;
}
