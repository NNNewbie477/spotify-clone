import { usePlayerStore } from "@/stores/usePlayerStore";
import { useEffect, useRef } from "react";

// AudioPlayer component manages the audio playback functionality using the player store
const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null); // Reference to the HTML audio element
  const prevSongRef = useRef<string | null>(null); // Reference to keep track of the previous song URL

  const { currentSong, isPlaying, playNext } = usePlayerStore(); // Destructure player store state and actions

  // Effect to handle play/pause functionality based on the isPlaying state
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  }, [isPlaying]);

  // Effect to handle the logic when the current song ends, playing the next song
  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      playNext();
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [playNext]);

  // Effect to handle changes in the current song, updating the audio source and resetting playback
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;
    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;

      if (isPlaying) audio.play();
    }
  }, [currentSong, isPlaying]);

  return <audio ref={audioRef} />; // Render the audio element with a reference
};
export default AudioPlayer;
