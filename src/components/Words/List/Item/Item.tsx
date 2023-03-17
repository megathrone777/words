import React, { useRef, useState } from "react";
import { AudioContext } from "standardized-audio-context";
import axios from "axios";

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
  const audioContext = useRef<AudioContext>();
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const playSound = (buffer: AudioBuffer): void => {
    if (audioContext.current) {
      const sourceNode = audioContext.current.createBufferSource();

      sourceNode.buffer = buffer;
      sourceNode.connect(audioContext.current.destination);
      sourceNode.start(0);
      sourceNode.onended = (): void => {
        audioContext.current?.close();
        togglePlaying(false);
      };
      togglePlaying(true);
    }
  };

  const handleAudioPlay = async (): Promise<void> => {
    axios
      .get(audioLink, {
        responseType: "arraybuffer",
      })
      .then((response): void => {
        audioContext.current = new AudioContext();
        audioContext.current.decodeAudioData(response["data"], (buffer) => {
          playSound(buffer);
        });
      });
  };

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        {word && (
          <a
            className={styles.link}
            href={`https://en.wiktionary.org/wiki/${word}`}
            rel="noreferrer"
            target="_blank"
          >
            <span className={styles.index}>{index + 1}</span>
            {word}
          </a>
        )}
      </td>

      <td className={styles.td}>
        <button
          className={styles["audio-button"]}
          disabled={isPlaying}
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

