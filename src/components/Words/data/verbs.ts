import { TItem } from "./types";

const items: TItem[] = [];

const verbs: TItem[] = [
  ...new Map(
    items.map((item: TItem): [string, TItem] => [item["word"], item])
  ).values(),
];

export { verbs };
