import Phonetic from "./Phonetic";
import { IDictionary, IPhonetic, IMeaning, Definition, Synonym } from "./App";
import Meaning from "./Meaning";

interface Props {
  dictionary: IDictionary[];
}

export default function Dictionary({ dictionary }: Props) {
  return (
    <div>
      {dictionary?.map((dic: IDictionary) => {
        return (
          <>
            <div className="word-header">
              <h1 className="word">{dic.word}</h1>
              <span className="phonetic">{dic.phonetic}</span>
            </div>
            <>
              {dic.phonetics.map((phn: IPhonetic) => {
                return <Phonetic phonetic={phn} />;
              })}
            </>
            <>
              {dic?.meanings.map((meaning: IMeaning) => {
                return <Meaning meaning={meaning} />;
              })}
            </>
          </>
        );
      })}
    </div>
  );
}
