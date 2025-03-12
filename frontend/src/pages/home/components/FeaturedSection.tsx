import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";

// FeaturedSection is a React component that displays a grid of featured songs.
// It uses the useMusicStore custom hook to access the isLoading, featuredSongs, and error states.
const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  // If the data is still loading, return a skeleton grid to indicate loading state.
  if (isLoading) return <FeaturedGridSkeleton />;

  // If there is an error in fetching the data, display an error message.
  if (error) return <p className="text-red-500 mb-4 text-lg">{error}</p>;

  // Render the grid of featured songs with play buttons.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
         hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <PlayButton song={song} />
        </div>
      ))}
    </div>
  );
};
export default FeaturedSection;
