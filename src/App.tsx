import React, { useRef, useState } from "react";
import Dictionary from "./Dictionary";
import "./App.css";

function App() {
  const [dictionary, setDictionary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDefinition, setHasDefinition] = useState(true)

  const ref = useRef<HTMLInputElement | null>(null);
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const handleSearchWord = async (term: string) => {
    if(!term) return
    try {
      setIsLoading(true);
      const res = await fetch(`${url}/${term}`);
      const response = await res.json();
      if (res.status === 404) {
        setHasDefinition(false)
        return 
      }
      setDictionary(response);
      setHasDefinition(true)
    } catch (error) {
      console.error(error);
    } finally {
      ref.current!.value = "";
      setIsLoading(false);
    }
  };

  const showClass = () => { 
    return dictionary && hasDefinition && !isLoading ? 'show' : ''
  }
  
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
        {isLoading && <p>Please wait...</p>}
        {!hasDefinition && !isLoading &&  <p>No Definitions Found...</p>}
        {(!isLoading && hasDefinition && dictionary) ? <Dictionary dictionary={dictionary} /> : null}
      </div>
    </div>
  );
}

export default App;
