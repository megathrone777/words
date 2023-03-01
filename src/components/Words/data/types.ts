import { TWord } from "~/components/Words/List/Item/types";

export type TItem = Omit<TWord, "audioLink" | "transcription">;
