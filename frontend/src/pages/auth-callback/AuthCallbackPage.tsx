import { Card, CardContent } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

// AuthCallbackPage component handles the authentication callback process
// It syncs the user data with the backend and redirects to the home page
const AuthCallbackPage = () => {
  const { isLoaded, user } = useUser(); // Retrieves user loading status and user object from Clerk
  const navigate = useNavigate(); // Hook for navigation
  const syncAttempted = useRef(false); // Ref to track if the sync attempt has been made

  // useEffect hook to perform the user sync when component mounts or dependencies change
  useEffect(() => {
    const syncUser = async () => {
      if (!isLoaded || !user || syncAttempted.current) return; // Early return if user is not loaded, user object is missing, or sync has already been attempted

      try {
        syncAttempted.current = true; // Set syncAttempted to true to prevent multiple sync attempts

        await axiosInstance.post("/auth/callback", {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl,
        }); // Sends a POST request to sync user data with the backend
      } catch (error) {
        console.log("Error in auth callback", error); // Logs any errors that occur during the sync process
      } finally {
        navigate("/"); // Redirects to the home page regardless of the sync result
      }
    };

    syncUser();
  }, [isLoaded, user, navigate]); // Dependencies for the useEffect hook

  // Renders a loading screen while the user is being synced and redirected
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <Card className="w-[90%] max-w-md bg-zinc-900 border-zinc-800">
        <CardContent className="flex flex-col items-center gap-4 pt-6">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-zinc-400 text-xl font-bold">正在将您登陆</h3>
          <p className="text-zinc-400 text-sm">重定向中...</p>
        </CardContent>
      </Card>
    </div>
  );
};
export default AuthCallbackPage;
