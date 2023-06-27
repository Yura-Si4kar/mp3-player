import { ListGroup } from "react-bootstrap";
import { useAudioPlayer } from "../hooks/useAudioPlayer";
import AudioElement from "./items/AudioElement";

export default function LibraryList({ audioList }) {
  const { isPlaying, progress, startPlay, handleProgressClick, currentAudioIndex } = useAudioPlayer(audioList);

  return (
    <ListGroup className='w-100 bg-black h-75'>
      {audioList.map((item, i) => (
        <AudioElement
          key={i}
          index={i}
          list={audioList}
          isPlaying={isPlaying}
          progress={progress}
          startPlay={startPlay}
          handleProgressClick={handleProgressClick}
          currentAudioIndex={currentAudioIndex}
        />
      ))}
    </ListGroup>
  );
}
