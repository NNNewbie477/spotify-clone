import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

// ChatHeader is a React component that displays the header of a chat interface.
// It shows the profile picture, full name, and online status of the selected user.
const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  // If no user is selected, the component returns null and does not render anything.
  if (!selectedUser) return null;

  // The component returns a div containing the user's avatar and status information.
  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser.imageUrl} />
          <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p className="text-sm text-zinc-400">
            {onlineUsers.has(selectedUser.clerkId) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
