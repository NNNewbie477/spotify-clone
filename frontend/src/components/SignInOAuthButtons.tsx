import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

// A React component that renders OAuth sign-in buttons using Clerk's authentication service
const SignInOAuthButtons = () => {
  // Destructure signIn and isLoaded from the useSignIn hook provided by Clerk
  const { signIn, isLoaded } = useSignIn();

  // If the sign-in object is not yet loaded, return null to avoid rendering
  if (!isLoaded) {
    return null;
  }

  // A function to handle Google OAuth sign-in, initiating the authentication process with redirect URLs
  const signInWithGoogle = () => {
    signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  // Render a Button component that triggers Google sign-in when clicked
  return (
    <Button
      onClick={signInWithGoogle}
      variant={"secondary"}
      className="w-full text-white border-zinc-200 h-11"
    >
      <img src="/google.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  );
};
// Export the SignInOAuthButtons component as the default export of this module
export default SignInOAuthButtons;
