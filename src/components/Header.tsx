import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { useFreelancerStore } from "../stores/freelancerStore";
import { useClientStore } from "../stores/clientStore";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const { freelancer } = useFreelancerStore();
  const { client } = useClientStore();

  const isAuthenticated = !!freelancer || !!client;
  const isFreelancer = !!freelancer;
  const isClient = !!client;

  const isActive = (path: string) => location.pathname === path;

  const handleProfileClick = () => {
    if (isClient) {
      navigate("/client/profile");
    } else if (isFreelancer) {
      navigate("/freelancer/profile");
    }
  };

  return (
    <header className="bg-white py-4 px-8 shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center">
        <div
          onClick={() => navigate("/")}
          className="text-3xl font-extrabold text-blue-600 cursor-pointer transition transform hover:scale-105"
        >
          SkillBridge
        </div>

        <div className="flex items-center space-x-8">
          {/* CLIENT NAVIGATION */}
          {isClient && (
            <>
              <div
                onClick={() => navigate("/client/dashboard")}
                className={`cursor-pointer text-lg font-medium transition hover:text-blue-500 ${
                  isActive("/client/dashboard")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                🏠 Dashboard
              </div>

              <div
                onClick={() => navigate("/client/freelancer-list")}
                className={`cursor-pointer text-lg font-medium transition hover:text-blue-500 ${
                  isActive("/client/freelancer-list")
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                📋 Find Freelancers
              </div>
            </>
          )}

          {/* FREELANCER NAVIGATION */}
          {isFreelancer && (
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
          )}
        </div>

        <div>
          {isAuthenticated ? (
            <button
              onClick={handleProfileClick}
              className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition transform hover:scale-105 shadow-md"
            >
              👤 Profile
            </button>
          ) : (
            <button
              onClick={() => navigate("/redirection")}
              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105 shadow-md"
            >
              Signup
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
