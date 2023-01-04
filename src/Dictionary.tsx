import React from "react";

interface Props {
  dictionary: any[];
}

export default function Dictionary({ dictionary }: Props) {
  return (
    <div>
      {dictionary?.map((dic) => {
        return (
          <>
            <h1>{dic.word}</h1>
            <span>{dic.phonetic}</span>
            {dic.phonetics.map((phn: any) => {
              if (!phn.audio) return;
              let pronunciation = new Audio(phn.audio);
              return (
                <>
                  <p>{phn.text}</p>
                  <button
                    onClick={() => pronunciation.play()}
                    id={phn?.license?.name}
                    key={phn?.license?.name}
                  >
                    sound
                  </button>
                </>
              );
            })}

            <>
              {dic?.meanings?.map((meaning: any) => {
                return (
                  <>
                    <h2>{meaning.partOfSpeech}</h2>
                    <>
                      {meaning.definitions.map((def: any) => {
                        return <p>{def.definition}</p>;
                      })}
                    </>
                    <>
                      {meaning.synonyms.length > 0 && <h3>Synonyms</h3>}
                      {meaning.synonyms.map((syn: string) => {
                        return <p>{syn}</p>;
                      })}
                    </>
                  </>
                );
              })}
            </>
          </>
        );
      })}
    </div>
  );
}
