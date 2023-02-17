import React, { useState } from "react";
import axios from "axios";
import bufferToWav from "audiobuffer-to-wav";

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
    const reader = new FileReader();
    // @ts-ignore
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const response = await axios.get(audioLink, {
      responseType: "arraybuffer",
    });

    reader.onloadend = (): void => {
      if (reader["result"]) {
        const audio = new window.Audio(reader["result"] as string);
        const source = audioContext.createMediaElementSource(audio);

        console.log(source);
        source.connect(audioContext.destination);
        audio.play();
      }
    };

    if (response && response["data"]) {
      audioContext.decodeAudioData(
        response["data"],
        (buffer: AudioBuffer): void => {
          const wav: ArrayBuffer = bufferToWav(buffer);
          const blob: Blob = new window.Blob([new DataView(wav)], {
            type: "audio/wav",
          });

          reader.readAsDataURL(blob);
        }
      );
    }
    togglePlaying(true);
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
