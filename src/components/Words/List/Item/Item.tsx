import React, { useEffect, useRef, useState } from "react";
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
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer>();
  const [isPlaying, togglePlaying] = useState<boolean>(false);

  const handleAudioPlay = async (): Promise<void> => {
    if (audioContext.current && audioBuffer) {
      const source: AudioBufferSourceNode =
        audioContext.current.createBufferSource();

      togglePlaying(true);
      source.buffer = audioBuffer;
      source.connect(audioContext.current.destination);
      source.start(0);
      source.onended = () => {
        togglePlaying(false);
      };
    }
  };

  // const handleAudioPlay = async (): Promise<void> => {
  //   if (audioBuffer) {
  //     const source = audioContext.createBufferSource();

  //     source.buffer = audioBuffer;
  //     source.connect(audioContext.destination);
  //     source.start();
  //   }

  //   if ("AudioContext" in window || "webkitAudioContext" in window) {
  //     const audioContext = new AudioContext();
  //     const gainNode = audioContext.createGain();

  //     gainNode.gain.value = 1;

  //     if (buffer) {
  //       const audioBuffer = await audioContext.decodeAudioData(buffer);
  //     }

  //     const unlock = () => {
  //       console.log("unlocking");
  //       var buffer = audioContext.createBuffer(1, 1, 22050);
  //       var source = audioContext.createBufferSource();
  //       source.buffer = buffer;
  //       source.connect(audioContext.destination);

  //       //@ts-ignore
  //       source.start ? source.start(0) : source.noteOn(0);
  //     };

  //     unlock();
  //   }
  // };

  useEffect((): void => {
    if ("AudioContext" in window || "webkitAudioContext" in window) {
      const context = new AudioContext();
      const gainNode = context.createGain();

      if (audioLink) {
        axios
          .get(audioLink, {
            responseType: "arraybuffer",
          })
          .then((response): void => {
            audioContext.current = context;
            context.decodeAudioData(response["data"], (buffer) => {
              setAudioBuffer(buffer);
            });
          });
      }
    }
  }, [audioLink]);

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

