import soundImage from "./sound.png";
import { IPhonetic } from "./App";

interface Props {
  phonetic: IPhonetic;
}

export default function Phonetic({ phonetic }: Props): JSX.Element {
  const { audio, license, text } = phonetic;
  if (!audio) return <></>;
  let pronunciation = new Audio(audio);
  return (
    <div className="word-header">
      <button
        className="audio-button"
        onClick={() => pronunciation.play()}
        id={license?.name}
        key={license?.name}
      >
        <img className="audio-image" src={soundImage} />
      </button>
      <p className="text">{text}</p>
    </div>
  );
}
