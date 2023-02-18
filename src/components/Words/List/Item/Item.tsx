import React, { useEffect, useState } from "react";
import axios from "axios";
// import webAudioTouchUnlock from "web-audio-touch-unlock";
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
    if ("AudioContext" in window || "webkitAudioContext" in window) {
      const audioContext = new AudioContext();
      const reader = new FileReader();
      const response = await axios.get(audioLink, {
        responseType: "arraybuffer",
      });
      const iOSbuffer = audioContext.createBuffer(1, 1, 22050);
      const source = audioContext.createBufferSource();

      source.buffer = iOSbuffer;
      source.connect(audioContext.destination);
      // @ts-ignore
      source.start ? source.start(0) : source.noteOn(0);
      alert(iOSbuffer);

      reader.onloadend = async (): Promise<void> => {
        if (reader["result"]) {
          const soundUrl = reader["result"] as string;
          const gainNode = audioContext.createGain();
          const response = await axios.get(soundUrl, {
            responseType: "arraybuffer",
          });

          gainNode.gain.value = 1;
          audioContext.decodeAudioData(
            response["data"],
            (buffer: AudioBuffer): void => {
              const source = audioContext.createBufferSource();

              source.buffer = buffer;
              source.connect(audioContext.destination);
              source.start();
              source.onended = () => {
                togglePlaying(false);
              };
            }
          );
        }
      };

      if (response && response["data"]) {
        audioContext.decodeAudioData(
          response["data"],
          (buffer: AudioBuffer): void => {
            const wav = bufferToWav(buffer, { float32: true });
            const blob: Blob = new window.Blob([new DataView(wav)], {
              type: "audio/wav",
            });
            const url = window.URL.createObjectURL(blob);

            window.URL.revokeObjectURL(url);
            reader.readAsDataURL(blob);
          }
        );
      }

      togglePlaying(true);
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
