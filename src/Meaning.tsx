import React from "react";
import { IMeaning, Definition, Synonym } from "./App";

interface Props {
  meaning: IMeaning;
}

export default function Meaning({ meaning }: Props): JSX.Element {
  const { definitions, partOfSpeech, synonyms } = meaning;
  return (
    <>
      <h2 className="part-of-speech">{partOfSpeech}</h2>
      <ol className="definitions">
        {definitions.map((def: Definition) => {
          return <li>{def.definition}</li>;
        })}
      </ol>
      <>
        {synonyms.length > 0 && <h3>Synonyms</h3>}
        <div className="synonyms">
          {synonyms.map((syn: Synonym) => {
            return <div className="synonym">{syn}</div>;
          })}
        </div>
      </>
    </>
  );
}
