import React, { useState } from "react";
import { useClientStore } from "../stores/clientStore";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ClientLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginClient, error, isLoading } = useClientStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginClient(email, password);
    if (!error) navigate("/client/dashboard");
  };

  return (
    <>
      <Header />

      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <form
            onSubmit={handleLogin}
            className="bg-white shadow-md rounded p-8 w-96 space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Client Login</h2>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ClientLogin;
