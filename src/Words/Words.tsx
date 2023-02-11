import React from "react";

import { TWord } from "./types";
import { list1 } from "./data";

const Words: React.FC = () => (
  <>
    <table>
      {list1 && (
        <tbody>
          {list1.map(
            ({
              word,
              transcription,
              translation,
            }: TWord): React.ReactElement => (
              <tr key={word}>
                <td>{word}</td>
                <td>{transcription}</td>
                <td>{translation}</td>
              </tr>
            )
          )}
        </tbody>
      )}
    </table>

    <p style={{ marginInline: "auto", maxWidth: "800px" }}>{list1.length}</p>
  </>
);

export { Words };
