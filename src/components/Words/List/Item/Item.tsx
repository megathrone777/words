import React, { useRef, useState } from "react";

import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

const Item: React.FC<TProps> = ({
  audioLink,
  index,
  translation,
  transcription,
  word,
}) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = (): void => {
    togglePlaying(true);

    if (audioElement) {
      const mp3: string = `${audioLink.replace(
        "commons",
        "commons/transcoded"
      )}/En-us-${word}.ogg.mp3`;

      audioElement.current.src = mp3;
      audioElement.current.play();

      audioElement.current.onerror = (): void => {
        audioElement.current.src = audioLink;
        audioElement.current.play();
      };

      audioElement.current.onended = (): void => {
        togglePlaying(false);
      };
    }
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        <span className={styles.index}>{index + 1}</span>
        {word}
      </td>

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

