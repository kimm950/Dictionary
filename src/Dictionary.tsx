import React from "react";
import soundImage from "./sound.png";
import { IDictionary } from './App'

//TODO: CORRECT TYPES
interface Props {
  dictionary: IDictionary[];
}

//TODO: SPERATE COMPONENTS, DEFINE TYPES
export default function Dictionary({ dictionary }: Props) {
  return (
    <div>
      {dictionary?.map((dic) => {
        return (
          <>
            <div className="word-header">
              <h1 className="word">{dic.word}</h1>
              <span className="phonetic">{dic.phonetic}</span>
            </div>
            {dic.phonetics.map((phn: any) => {
              if (!phn.audio) return;
              let pronunciation = new Audio(phn.audio);
              return (
                <div className="word-header">
                  <button
                    className="audio-button"
                    onClick={() => pronunciation.play()}
                    id={phn?.license?.name}
                    key={phn?.license?.name}
                  >
                    <img className="audio-image" src={soundImage} />
                  </button>
                  <p className="text">{phn.text}</p>
                </div>
              );
            })}

            <>
              {dic?.meanings?.map((meaning: any) => {
                return (
                  <>
                    <h2 className="part-of-speech">{meaning.partOfSpeech}</h2>
                    <ol className="definitions">
                      {meaning.definitions.map((def: any) => {
                        return <li>{def.definition}</li>;
                      })}
                    </ol>
                    <>
                      {meaning.synonyms.length > 0 && <h3>Synonyms</h3>}
                      <div className="synonyms">
                        {meaning.synonyms.map((syn: string) => {
                          return <div className="synonym">{syn}</div>;
                        })}
                      </div>
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
