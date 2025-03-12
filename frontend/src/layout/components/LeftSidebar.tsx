import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

// LeftSidebar component renders the navigation and library sections for the music application
const LeftSidebar = () => {
  // Destructure albums, fetchAlbums, and isLoading from the useMusicStore
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  // Fetch albums when the component mounts
  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  console.log({ albums });

  // Render the navigation menu and the library section
  return (
    <div className="h-full flex flex-col gap-2">
      {/* Navigation menu */}

      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">
          {/* Link to the home page */}
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg-zinc-800",
              })
            )}
          >
            <HomeIcon className="mr-2 size-5" />
            <span className="hidden md:inline">主页</span>
          </Link>

          {/* Link to the chat page, visible only when signed in */}
          <SignedIn>
            <Link
              to={"/chat"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-zinc-800",
                })
              )}
            >
              <MessageCircle className="mr-2 size-5" />
              <span className="hidden md:inline">消息</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          {/* Header for the library section */}
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">播放列表</span>
          </div>
        </div>

        {/* Scrollable area for the list of albums */}
        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {/* Display a skeleton loader if albums are still loading */}
            {isLoading ? (
              <PlaylistSkeleton />
            ) : (
              // Map through albums and render a link for each album
              albums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="p-2 hover:bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer"
                >
                  <img
                    src={album.imageUrl}
                    alt="Playlist img"
                    className="size-12 rounded-md flex-shrink-0 object-cover"
                  />

                  {/* Album details visible on medium and larger screens */}
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">
                      专辑 • {album.artist}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};
export default LeftSidebar;
