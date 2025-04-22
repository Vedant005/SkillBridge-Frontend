import { useState } from "react";
import { useFreelancerStore } from "../stores/freelancerStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const FreelancerSignup = () => {
  const { registerFreelancer, isLoading, error } = useFreelancerStore();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    experience_level: "",
    location: "",
    hourly_rate: "",
    occupation: "",
    skills: "",
    description: "",
    qualification: "",
    password: "",
  });
  const [resume, setResume] = useState<File | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const data = new FormData();

      // Ensure all values are converted to strings before appending
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          data.append(key, String(value));
        }
      });

      if (resume) data.append("resume", resume);

      // Debugging: Log FormData
      for (const [key, value] of data.entries()) {
        console.log(`FormData Key: ${key}, Value: ${value}`);
      }

      await registerFreelancer(data);
      navigate("/freelancer/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800">
            Freelancer Signup
          </h2>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <input
              className="input-field"
              type="text"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
              required
            />
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
              type="text"
              name="experience_level"
              placeholder="Experience Level"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="location"
              placeholder="Location"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="number"
              name="hourly_rate"
              placeholder="Hourly Rate"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="occupation"
              placeholder="Occupation"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="skills"
              placeholder="Skills (comma separated)"
              onChange={handleChange}
              required
            />
            <textarea
              className="input-field"
              name="description"
              placeholder="Description"
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="text"
              name="qualification"
              placeholder="Qualification"
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
            <input
              className="input-field"
              type="file"
              onChange={handleResumeUpload}
              accept=".pdf,.doc,.docx"
              required
            />

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer hover:underline"
              onClick={() => navigate("/freelancer/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default FreelancerSignup;
