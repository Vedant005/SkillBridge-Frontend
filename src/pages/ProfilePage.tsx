import React from "react";
import { useFreelancerStore } from "../stores/freelancerStore";
import Header from "../components/Header";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const { freelancer, isLoading, logoutFreelancer } = useFreelancerStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutFreelancer();
    navigate("/");
  };

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;

  if (!freelancer)
    return <div className="text-center mt-10">No profile found.</div>;

  const {
    fullName,
    email,
    location,
    description,
    experience_level,
    hourly_rate,
    skills,
  } = freelancer.freelancer;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-2xl">
        <h1 className="text-4xl font-bold text-blue-600 text-center mb-8">
          Freelancer Profile
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">
              Personal Info
            </h2>
            <div className="text-gray-700 space-y-1">
              <p>
                <strong>Name:</strong> {fullName}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Location:</strong> {location}
              </p>
              <p>
                <strong>Experience Level:</strong> {experience_level}
              </p>
              <p>
                <strong>Hourly Rate:</strong> ${hourly_rate}/hr
              </p>
            </div>

            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-800">About Me</h2>
              <p className="text-gray-700 mt-2">
                {description || "No description provided."}
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
            {skills && skills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {skills.map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No skills added.</p>
            )}

            <div className="mt-8 space-x-4">
              <button
                onClick={() => alert("Edit profile feature coming soon!")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow"
              >
                ✏️ Edit Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition shadow"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
