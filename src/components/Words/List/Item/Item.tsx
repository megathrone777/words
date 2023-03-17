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

    // if (audioContext.current && audioBuffer) {
    //   const source: AudioBufferSourceNode =
    //     audioContext.current.createBufferSource();

    //   source.buffer = audioBuffer;
    //   source.connect(audioContext.current.destination);
    //   // @ts-ignore
    //   source.noteOn(0);
    //   source.onended = (): void => {
    //     audioContext.current?.close();
    //     togglePlaying(false);
    //   };
    //   togglePlaying(true);
    // }
  };

  // useEffect((): void => {
  //   if (audioContext.current && !isPlaying) {
  //     audioContext.current.resume();
  //     togglePlaying(true);
  //   } else if (
  //     audioContext.current &&
  //     audioContext.current.state === "running"
  //   ) {
  //     // setPlayDuration(audioCtxContainer.current.currentTime);
  //     audioContext.current.suspend();
  //     togglePlaying(false);
  //   } else if (
  //     audioContext.current &&
  //     audioContext.current.state === "suspended"
  //   ) {
  //     audioContext.current.resume();
  //   }
  // }, [isPlaying]);

  // useEffect((): void => {
  //   if (audioContext.current) {
  //     const buffer = audioContext.current.createBuffer(1, 1, 22050);
  //     const source = audioContext.current.createBufferSource();

  //     source.buffer = buffer;
  //     source.connect(audioContext.current.destination);

  //     //@ts-ignore
  //     source.start ? source.start(0) : source.noteOn(0);
  //   }
  // }, [audioContext]);

  // useEffect((): void => {
  //   if ("AudioContext" in window || "webkitAudioContext" in window) {
  //     const context: AudioContext = new AudioContext();
  //     const gainNode: GainNode = context.createGain();

  //     if (audioLink) {
  //       gainNode.gain.value = 1;
  //       axios
  //         .get(audioLink, {
  //           responseType: "arraybuffer",
  //         })
  //         .then((response): void => {
  //           audioContext.current = context;
  //           context.decodeAudioData(response["data"], (buffer) => {
  //             setAudioBuffer(buffer);
  //           });
  //         });
  //     }
  //   }
  // }, [audioLink]);

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

