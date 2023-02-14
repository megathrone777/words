import React from "react";

import { TProps } from "./types";

const Item: React.FC<TProps> = ({
  audioLink,
  translation,
  transcription,
  word,
}) => {
  return (
    <tr key={word}>
      <td>{word}</td>
      <td>
        <span>{transcription}</span>

        {audioLink && (
          <audio controls preload="metadata">
            <source src={audioLink} type="audio/ogg" />
          </audio>
        )}
      </td>
      <td>{translation}</td>
    </tr>
  );
};

export { Item };
