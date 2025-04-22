import React from "react";
import { useClientStore } from "../stores/clientStore";
import { Loader2, MapPin, Mail } from "lucide-react";
import { useNavigate } from "react-router";

const ClientProfilePage: React.FC = () => {
  const { client, isLoading, error, logoutClient } = useClientStore();
  const navigate = useNavigate();
  // useEffect(() => {
  //   if (!client) {
  //     fetchClientProfile();
  //   }
  // }, []);

  const handleLogout = async () => {
    await logoutClient();
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!client) {
    return (
      <div className="text-center mt-20 text-gray-500">
        <p>Client not logged in.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-xl rounded-2xl p-6 mb-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {client.client.name || "Unnamed Client"}
        </h1>
        <p className="flex items-center text-gray-600 mb-1">
          <Mail className="h-4 w-4 mr-2" />
          {client.client.email}
        </p>
        <p className="flex items-center text-gray-600 mb-1">
          <MapPin className="h-4 w-4 mr-2" />
          {client.client.location || "No location"}
        </p>
        <p className="text-gray-600 mt-2">
          Total Spent:{" "}
          <span className="font-medium">${client.client.total_spent}</span>
        </p>
        <button
          onClick={handleLogout}
          className="mt-4 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ClientProfilePage;
