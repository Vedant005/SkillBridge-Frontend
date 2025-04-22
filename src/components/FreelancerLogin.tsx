import { useState } from "react";
import { useFreelancerStore } from "../stores/freelancerStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const FreelancerLogin = () => {
  const { loginFreelancer, isLoading, error } = useFreelancerStore();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  console.log(isLoading);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginFreelancer(credentials.email, credentials.password);
    if (!isLoading) {
      navigate("/gigs");
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Freelancer Login
          </h2>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/freelancer/signup")}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FreelancerLogin;
