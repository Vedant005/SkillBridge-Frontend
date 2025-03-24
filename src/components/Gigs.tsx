import { useNavigate } from "react-router";
import { useGigsStore } from "../stores/gigsStore"; // ✅ Import Zustand store

interface Gig {
  clientId: string;
  email: string;
  location: string;
  gigs: {
    gigId: string;
    title: string;
    type: string;
    hourly_rate: number;
    amount_amount: number;
    duration: string;
    engagement: string;
    Description: string;
    client_location_country: string;
    tier: string;
    Status: string;
    created_on: Date;
    published_on: Date;

    client_total_reviews: number;
    client_total_spent: number;
    proposals_tier: string;
  };
}

function Gigs(gig: Gig) {
  const {
    gigId,
    title,
    type,
    hourly_rate,
    amount_amount,

    client_total_reviews,
    published_on,
  } = gig.gigs;

  const navigate = useNavigate();
  const { setRecentlyViewedGig } = useGigsStore(); // ✅ Zustand function

  // ✅ Store gigId in localStorage on click
  const handleClick = () => {
    setRecentlyViewedGig(gigId); // Store the gigId for recommendations
    navigate(`/gigs/${gigId}`);
  };

  // Format date
  const formattedDate = new Date(published_on).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className="bg-cyan-200 shadow-md rounded-2xl p-3  transition transform hover:scale-105 hover:shadow-lg w-[380px] cursor-pointer"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-500 mt-2">{type}</div>

      <div className="flex justify-between items-center mt-4">
        <span className="text-lg font-semibold text-green-600">
          ${hourly_rate?.toString() || "N/A"}/hr
        </span>
        <span className="text-sm bg-blue-100 text-blue-600 px-2 py-1 rounded-md">
          ${amount_amount?.toString()}
        </span>
      </div>

      <div className="flex justify-between items-center mt-4">
        {/* <div className="text-sm text-gray-600">📍 {location || "Unknown"}</div> */}
        <div className="text-sm text-yellow-600">
          ⭐ {client_total_reviews?.toString()} reviews
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-400">
        Published on: {formattedDate}
      </div>
    </div>
  );
}

export default Gigs;
