import React, { useRef, useState } from "react";
import Dictionary from "./Dictionary";
import "./App.css";
import icon from "./dictionary-icon.svg";

export interface License {
  name: string;
  url: string;
}

export interface IPhonetic {
  text: string;
  audio: string;
  license: License;
}

export interface Definition {
  definition: string;
  example: string;
  synonyms: Synonym[];
}

export type Synonym = string;

export type SourceUrl = string;

export interface IMeaning {
  definitions: Definition[];
  partOfSpeech: string;
  synonyms: Synonym[];
}

export interface IDictionary {
  word: string;
  license: License;
  meanings: IMeaning[];
  phonetic: string;
  phonetics: IPhonetic[];
  sourceUrls: SourceUrl[];
}

function App() {
  const [dictionary, setDictionary] = useState<IDictionary[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasDefinition, setHasDefinition] = useState<boolean>(true);

  const ref = useRef<HTMLInputElement | null>(null);
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const handleSearchWord = async (term: string): Promise<void> => {
    if (!term) return;
    try {
      setIsLoading(true);
      const res = await fetch(`${url}/${term}`);
      const response = await res.json();
      if (res.status === 404) {
        setHasDefinition(false);
        return;
      }
      setDictionary(response);
      setHasDefinition(true);
    } catch (error) {
      console.error(error);
    } finally {
      ref.current!.value = "";
      setIsLoading(false);
    }
  };

  const showClass = (): string => {
    return dictionary && hasDefinition && !isLoading ? "show" : "";
  };

  // TODO: CLEANUP STATES
  const initState = !isLoading && hasDefinition && !dictionary;
  const showResult = !isLoading && hasDefinition && dictionary;

  return (
    <div className="App">
      <div className="search-header">
        <input
          className="search-input"
          type="text"
          ref={ref}
          onKeyDown={(e) =>
            e.code === "Enter" && handleSearchWord(ref.current?.value as string)
          }
          placeholder="search word"
        />
        <button
          className="search-button"
          onClick={() => handleSearchWord(ref.current?.value as string)}
        >
          Search
        </button>
      </div>
      <div className={`container ${showClass()}`}>
        {initState && <img className="init-image" src={icon} />}
        {isLoading && <p>Please wait...</p>}
        {!hasDefinition && !isLoading && <p>No Definitions Found...</p>}
        {showResult && <Dictionary dictionary={dictionary} />}
      </div>
    </div>
  );
}

export default App;
