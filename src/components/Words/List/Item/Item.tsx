import React, { useRef, useState } from "react";

import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

function webAudioTouchUnlock(context: AudioContext) {
  return new Promise(function (resolve, reject) {
    if (context.state === "suspended" && "ontouchstart" in window) {
      var unlock = function () {
        context.resume().then(
          function () {
            document.body.removeEventListener("touchstart", unlock);
            document.body.removeEventListener("touchend", unlock);

            resolve(true);
          },
          function (reason) {
            reject(reason);
          }
        );
      };

      document.body.addEventListener("touchstart", unlock, false);
      document.body.addEventListener("touchend", unlock, false);
    } else {
      resolve(false);
    }
  });
}

const Item: React.FC<TProps> = ({
  audioLink,
  translation,
  transcription,
  word,
}) => {
  const audioElement = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = (): void => {
    if (audioElement) {
      audioElement.current!.play();
      togglePlaying(true);
      audioElement.current!.src =
        "https://upload.wikimedia.org/wikipedia/commons/c/c0/LL-Q1860_%28eng%29-Exilexi-forest.wav";
      audioElement.current.play();
      audioElement.current.onended = () => {
        togglePlaying(false);
      };
    }
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
