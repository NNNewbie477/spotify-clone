import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatStore } from "@/stores/useChatStore";
import { useUser } from "@clerk/clerk-react";
import { Send } from "lucide-react";
import { useState } from "react";

// MessageInput component handles the input and sending of messages in a chat interface
const MessageInput = () => {
  const [newMessage, setNewMessage] = useState("");
  const { user } = useUser();
  const { selectedUser, sendMessage } = useChatStore();

  // handleSend function sends the new message to the selected user if all required data is available
  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return;
    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage("");
  };

  // Render the input field and send button for composing and sending messages
  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="bg-zinc-800 border-none"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />

        <Button
          size={"icon"}
          onClick={handleSend}
          disabled={!newMessage.trim()}
        >
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
};
export default MessageInput;
