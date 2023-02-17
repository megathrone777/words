import React, { useEffect, useState } from "react";

import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

const Item: React.FC<TProps> = ({
  audioLink,
  translation,
  transcription,
  word,
}) => {
  const [audio] = useState<HTMLAudioElement>(new Audio(audioLink));
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = (): void => {
    audio.play();
    togglePlaying(true);
  };

  useEffect((): VoidFunction => {
    audio.setAttribute("preload", "auto");
    audio.setAttribute("type", "audio/ogg");
    audio.addEventListener("ended", (): void => {
      togglePlaying(false);
    });

    return (): void => {
      audio.removeEventListener("ended", (): void => togglePlaying(false));
    };
  }, [audio]);

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
