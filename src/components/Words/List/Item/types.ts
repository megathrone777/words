declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export interface TWord {
  audioLink: string;
  word: string;
  transcription: string;
  translation: string;
}

export type TProps = TWord;
