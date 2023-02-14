import React, { useEffect, useState } from "react";

import { SvgPauseIcon, SvgPlayIcon } from "~/icons";
import { TProps } from "./types";

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

  useEffect(() => {
    audio.addEventListener("ended", () => {
      togglePlaying(false);
    });
  }, [audio]);

  return (
    <tr key={word}>
      <td>{word}</td>
      <td>
        <span>{transcription}</span>

        {audioLink && (
          <button onClick={handleAudioPlay} type="button">
            {isPlaying ? <SvgPauseIcon /> : <SvgPlayIcon />}
          </button>
        )}
      </td>
      <td>{translation}</td>
    </tr>
  );
};

export { Item };
