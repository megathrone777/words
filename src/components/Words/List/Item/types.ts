declare global {
  interface Window {
    webkitAudioContext: typeof AudioContext;
  }
}

export interface TWord {
  audioLink: string;
  transcription: string;
  translation: string;
  word: string;
}

export interface TProps extends TWord {
  index: number;
}
