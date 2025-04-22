import React, { useState } from "react";
import { useClientStore } from "../stores/clientStore";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const ClientSignup: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });

  const { registerClient, error, isLoading } = useClientStore();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerClient(form);
    if (!error) navigate("/client/dashboard");
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <form
            onSubmit={handleSignup}
            className="bg-white shadow-md rounded p-8 w-96 space-y-4"
          >
            <h2 className="text-2xl font-bold text-center">Client Signup</h2>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              className="w-full border px-3 py-2 rounded"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              className="w-full border px-3 py-2 rounded"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              className="w-full border px-3 py-2 rounded"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
          </form>
          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/client/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default ClientSignup;
