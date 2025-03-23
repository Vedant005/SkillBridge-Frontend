import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  return (
    <header>
      <div className="flex items-center justify-between">
        <div>
          <h1 onClick={() => navigate("/")} className="cursor-pointer">
            SkillBridge
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <h1 onClick={() => navigate("/gigs")} className="cursor-pointer">
              {" "}
              Gigs
            </h1>
          </div>
          <div>
            <h1 onClick={() => navigate("/profile")} className="cursor-pointer">
              Profile
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
