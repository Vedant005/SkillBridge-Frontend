import { useNavigate } from "react-router";

function Redirection() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Who do you want to sign up as?
        </h1>
        <div className="flex flex-col gap-4">
          {/* <button
            onClick={() => navigate("/client/signup")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Sign up as Client
          </button> */}
          <button
            onClick={() => navigate("/freelancer/signup")}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
          >
            Sign up as Freelancer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Redirection;
