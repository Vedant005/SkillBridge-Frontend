import { useEffect } from "react";
import { useGigsStore } from "../stores/gigsStore";
import { useParams, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading_ani.json";

function SingleGigPage() {
  const { singleGig, fetchSingleGig, loading, error } = useGigsStore();
  const { gigId } = useParams<{ gigId: string }>(); // ✅ Use gigId
  const navigate = useNavigate();

  useEffect(() => {
    if (gigId) {
      fetchSingleGig(gigId);
    }
  }, [gigId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Lottie
          animationData={loadingAnimation}
          loop
          autoplay
          style={{ height: 200, width: 200 }}
        />
        <p className="text-lg font-semibold text-gray-700">Loading gig...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-red-600 font-bold text-2xl">Error loading gig</h2>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!singleGig) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-gray-700 font-bold text-2xl">Gig not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Go Back
        </button>
      </div>
    );
  }

  const {
    title,
    type,
    hourly_rate,
    tier,
    client_location_country,
    client_total_reviews,
    published_on,
    amount_amount,
    duration,
    engagement,
    client_total_spent,
  } = singleGig.gig;

  const formattedDate = new Date(published_on).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-lg text-gray-600">
              <strong>Type:</strong> {type}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Duration:</strong> {duration}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Engagement:</strong> {engagement}
            </p>
          </div>

          <div>
            <p className="text-lg text-gray-600">
              <strong>Hourly Rate:</strong> ${hourly_rate?.toString()}/hr
            </p>
            <p className="text-lg text-gray-600">
              <strong>Total Amount:</strong> ${amount_amount?.toString()}
            </p>
            <p className="text-lg text-gray-600">
              <strong>Tier:</strong> {tier}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleGigPage;
