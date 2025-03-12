import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

// PlayButton component that accepts a song as a prop
const PlayButton = ({ song }: { song: Song }) => {
  // Destructuring state and actions from usePlayerStore
  const { currentSong, isPlaying, setCurrentSong, togglePlay } =
    usePlayerStore();
  // Checks if the current song in the player matches the provided song
  const isCurrentSong = currentSong?._id === song._id;

  // Handles play/pause functionality for the song
  const handlePlay = () => {
    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  // Returns a button that conditionally displays play or pause icon based on the song's state
  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
    opacity-0 translate-y-2 group-hover:translate-y-0 ${
      isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
    }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-black" />
      ) : (
        <Play className="size-5 text-black" />
      )}
    </Button>
  );
};
export default PlayButton;
