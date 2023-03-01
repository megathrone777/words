import React, { useEffect, useRef, useState } from "react";
import axios, { AxiosResponse } from "axios";

import { Loader } from "~/components";
import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";
import styles from "./item.module.css";

const Item: React.FC<TProps> = ({
  index,
  pronunciation,
  translation,
  url,
  word,
}) => {
  const [isLoading, toggleLoading] = useState<boolean>(true);
  const audioElement = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, togglePlaying] = useState<boolean>(false);
  const audioFile =
    pronunciation && pronunciation.find((value) => value.audio !== null)?.audio;

  const transcriprion =
    pronunciation && pronunciation.find((value) => value.audio === null)?.IPA;

  const handleAudioPlay = async (): Promise<void> => {
    togglePlaying(true);

    if (audioElement && audioElement.current) {
      audioElement.current.play();
    }
  };

  useEffect((): void => {
    const getAudio = async () => {
      const response: AxiosResponse = await axios.post("/api/audio", {
        audioFile,
      });
      const fileURL: string = await response["data"]["imageinfo"][0]["url"];

      audioElement.current.src = fileURL;
      audioElement.current.oncanplay = (): void => {
        toggleLoading(false);
      };

      audioElement.current.onerror = (): void => {
        audioElement.current.src = fileURL;
      };

      audioElement.current.onended = (): void => {
        togglePlaying(false);
      };
    };

    if (audioFile) {
      getAudio();
    }
  }, [pronunciation]);

  return (
    <tr className={styles.tr}>
      <td className={styles.td}>
        {word && (
          <a
            className={styles.link}
            href={url}
            rel="noreferrer"
            target="_blank"
          >
            <span className={styles.index}>{index + 1}</span>
            {word}
          </a>
        )}
      </td>

      <td className={styles.td}>
        {isLoading ? (
          <span className={styles["loader-wrapper"]}>
            <Loader />
          </span>
        ) : (
          <button
            className={styles["audio-button"]}
            onClick={handleAudioPlay}
            type="button"
          >
            <span className={styles.icon}>
              {isPlaying ? <SvgPauseIcon /> : <SvgPlayIcon />}
            </span>

            <span>{transcriprion}</span>
          </button>
        )}
      </td>

      <td className={styles.td}>{translation}</td>
    </tr>
  );
};

export { Item };

