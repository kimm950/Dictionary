import React, { useRef, useState } from "react";
import Dictionary from "./Dictionary";
import "./App.css";

function App() {
  const [dictionary, setDictionary] = useState(null);
  const ref = useRef<HTMLInputElement | null>(null);
  const url = "https://api.dictionaryapi.dev/api/v2/entries/en";

  const handleSearchWord = async (term: string) => {
    try {
      const res = await fetch(`${url}/${term}`);
      const response = await res.json();
      if (res.status === 404) {
        return alert(response.title);
      }
      setDictionary(response);
    } catch (error) {
      console.error(error);
    } finally {
      ref.current!.value = "";
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        ref={ref}
        onKeyDown={(e) =>
          e.code === "Enter" && handleSearchWord(ref.current?.value as string)
        }
      />
      <button onClick={() => handleSearchWord(ref.current?.value as string)}>
        Search
      </button>
      {dictionary ? <Dictionary dictionary={dictionary} /> : null}
    </div>
  );
}

export default App;
