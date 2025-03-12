import { UserButton } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

// Header component for the admin page, displaying the logo, title, and user button
const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3 mb-8">
        <Link to="/" className="rounded-lg">
          <img src="/spotify.png" className="size-10 text-black" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold">音乐管理器</h1>
          <p className="text-zinc-400 mt-1">管理你的音乐目录</p>
        </div>
      </div>
      <UserButton />
    </div>
  );
};
export default Header;
