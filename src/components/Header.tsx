import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-md py-4 px-8">
      <nav className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-blue-600 cursor-pointer transition transform hover:scale-105"
        >
          SkillBridge
        </div>

        <div className="flex items-center space-x-8">
          <div
            onClick={() => navigate("/gigs")}
            className={`cursor-pointer text-lg font-medium transition hover:text-blue-500 ${
              isActive("/gigs")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            💼 Gigs
          </div>

          <div
            onClick={() => navigate("/profile")}
            className={`cursor-pointer text-lg font-medium transition hover:text-blue-500 ${
              isActive("/profile")
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            👤 Profile
          </div>
        </div>

        <div>
          <button
            onClick={() => navigate("/create-gig")}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
          >
            ➕ Create Gig
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
