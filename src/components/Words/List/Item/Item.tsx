import React, { useRef, useState } from "react";
import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

const Item: React.FC<TProps> = ({
  audioLink,
  index,
  transcription,
  translation,
  word,
}) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = async (): Promise<void> => {
    togglePlaying(true);

    if (audioElement && audioElement.current) {
      audioElement.current.src = audioLink;
      audioElement.current.play();

      audioElement.current.onerror = (): void => {
        audioElement.current.src = "";
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
        {word && (
          <a className={styles.link} href="#" rel="noreferrer" target="_blank">
            <span className={styles.index}>{index + 1}</span>
            {word}
          </a>
        )}
      </td>

      <td className={styles.td}>
        <button
          className={styles["audio-button"]}
          onClick={handleAudioPlay}
          type="button"
        >
          {audioLink && audioLink.length > 0 && (
            <span className={styles.icon}>
              {isPlaying ? <SvgPauseIcon /> : <SvgPlayIcon />}
            </span>
          )}

          <span>{transcription}</span>
        </button>
      </td>

      <td className={styles.td}>{translation}</td>
    </tr>
  );
};

export { Item };

