import React, { useEffect } from "react";
import { useClientStore } from "../stores/clientStore";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ClientDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { client } = useClientStore();
  console.log(client);

  // useEffect(() => {
  //   fetchClientProfile();
  // }, [fetchClientProfile]);

  if (!client) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Header />
      <h1 className="text-3xl font-bold mb-4">Welcome, {client.client.name}</h1>
      <button
        onClick={() => navigate("/client/create-gig")}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        Create New Gig
      </button>
      <h2 className="text-2xl font-semibold mb-2">Your Gigs:</h2>
      <div className="grid gap-4">
        {client.gigs && client.gigs.length > 0 ? (
          client.gigs.map((gig) => (
            <div
              key={gig.gigId}
              className="border p-4 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold">{gig.title}</h3>
              <p className="text-sm text-gray-600">{gig.Description}</p>
              <div className="mt-2">
                <strong>Status:</strong> {gig.Status}
              </div>
              <div>
                <strong>Type:</strong> {gig.type} | <strong>Rate:</strong>{" "}
                {gig.hourly_rate} ₹/hr
              </div>
            </div>
          ))
        ) : (
          <p>No gigs yet. Start by creating one!</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
