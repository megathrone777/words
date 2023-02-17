import React, { useState } from "react";
import axios from "axios";

import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

const Item: React.FC<TProps> = ({
  audioLink,
  translation,
  transcription,
  word,
}) => {
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = async (): Promise<void> => {
    const audioContext = new window.AudioContext();
    const response = await axios.get(audioLink, {
      responseType: "arraybuffer",
    });

    togglePlaying(true);
    audioContext.decodeAudioData(
      response["data"],
      (buffer: AudioBuffer): void => {
        const source = audioContext.createBufferSource();

        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start();
        source.onended = (): void => {
          togglePlaying(false);
        };
      }
    );
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>{word}</td>
      <td className={styles.td}>
        <span className={styles.transcription}>{transcription}</span>

        {audioLink && (
          <button
            className={styles["audio-button"]}
            onClick={handleAudioPlay}
            type="button"
          >
            {isPlaying ? <SvgPauseIcon /> : <SvgPlayIcon />}
          </button>
        )}
      </td>
      <td className={styles.td}>{translation}</td>
    </tr>
  );
};

export { Item };
