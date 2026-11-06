import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export default function NotFoundPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="text-center animate-fade-in">
        <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-blue-600 to-indigo-600 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Page not found</h1>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">
          Sorry, we couldn't find the page you're looking for. It may have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to={isAuthenticated ? "/dashboard" : "/login"}>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <Home className="w-4 h-4 mr-2" />
              {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
            </Button>
          </Link>
          <button onClick={() => window.history.back()}>
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </button>
        </div>
      </div>
    </div>
  );
}
