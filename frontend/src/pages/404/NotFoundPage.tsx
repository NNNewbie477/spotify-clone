import { Home, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Component for rendering the 404 Not Found page
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen bg-neutral-900 flex items-center justify-center">
      <div className="text-center space-y-8 px-4">
        {/* Large animated musical note */}
        <div className="flex justify-center animate-bounce">
          <Music2 className="h-24 w-24 text-emerald-500" />
        </div>

        {/* Error message */}
        <div className="space-y-4">
          <h1 className="text-7xl font-bold text-white">404</h1>
          <h2 className="text-2xl font-semibold text-white">未找到页面</h2>
          <p className="text-neutral-400 max-w-md mx-auto">
            看起来你迷路了，让我们带你回到音乐。
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700 w-full sm:w-auto"
          >
            返回
          </Button>
          <Button
            onClick={() => navigate("/")}
            className="bg-emerald-500 hover:bg-emerald-600 text-white w-full sm:w-auto"
          >
            <Home className="mr-2 h-4 w-4" />
            回到主页
          </Button>
        </div>
      </div>
    </div>
  );
}
