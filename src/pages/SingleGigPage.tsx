import { useEffect } from "react";
import { useGigsStore } from "../stores/gigsStore";
import { useParams, useNavigate } from "react-router";
import Lottie from "lottie-react";
import loadingAnimation from "../animations/loading_ani.json";
import { FaMapMarkerAlt, FaStar, FaDollarSign, FaClock } from "react-icons/fa";
import {
  MdOutlinePayment,
  MdOutlineFeedback,
  MdWorkOutline,
} from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { GrServices } from "react-icons/gr";

function SingleGigPage() {
  const { singleGig, fetchSingleGig, loading, error } = useGigsStore();
  const { gigId } = useParams<{ gigId: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (gigId) {
      fetchSingleGig(gigId);
    }
  }, [gigId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
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
        <h2 className="text-red-600 font-bold text-2xl">
          ❌ Error loading gig
        </h2>
        <p className="text-gray-600">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          🔙 Go Back
        </button>
      </div>
    );
  }

  if (!singleGig) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-gray-700 font-bold text-2xl">😢 Gig not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
        >
          🔙 Go Back
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
    Description,
    Status,
    created_on,
    proposals_tier,
    occupations_category_pref_label,
    occupations_oservice_pref_label,
    amount_amount,
    duration,
    engagement,
    client_total_spent,
  } = singleGig.gig;

  const formattedCreatedDate = new Date(created_on).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const formattedPublishedDate = new Date(published_on).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="container mx-auto bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
          {title}{" "}
          <span className="text-blue-500">({Status.toUpperCase()})</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 flex items-center">
              <BiCategoryAlt className="text-blue-500 mr-2" />{" "}
              <strong>Category: </strong> {occupations_category_pref_label}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              <GrServices className="text-blue-500 mr-2" />{" "}
              <strong>Service: </strong> {occupations_oservice_pref_label}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              <MdWorkOutline className="text-blue-500 mr-2" />{" "}
              <strong>Type:</strong> {type}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              <FaClock className="text-green-500 mr-2" />{" "}
              <strong>Duration:</strong> {duration}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              ⏱️ <strong>Engagement:</strong> {engagement}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              <FaMapMarkerAlt className="text-red-500 mr-2" />{" "}
              <strong>Location:</strong> {client_location_country}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              <FaStar className="text-yellow-400 mr-2" />{" "}
              <strong>Client Reviews:</strong> {client_total_reviews}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              💰 <strong>Client Total Expenditure:</strong> $
              {client_total_spent}
            </p>
          </div>

          <div className="space-y-6">
            <p className="text-lg text-gray-700 flex items-center">
              <FaDollarSign className="text-green-500 mr-2" />{" "}
              <strong>Hourly Rate:</strong> ${hourly_rate}/hr
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              💵 <strong>Total Amount:</strong> ${amount_amount}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              🛠️ <strong>Tier:</strong> {tier}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              📅 <strong>Created On:</strong> {formattedCreatedDate}
            </p>
            <p className="text-lg text-gray-700 flex items-center">
              📢 <strong>Published On:</strong> {formattedPublishedDate}
            </p>
          </div>
        </div>

        <div className="mt-10 p-6 bg-gray-50 rounded-lg shadow-inner">
          <h2 className="text-2xl font-semibold text-gray-800">
            📄 Description
          </h2>
          <p className="text-md text-gray-600 mt-4 leading-relaxed">
            {Description || "No description provided."}
          </p>
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition transform hover:scale-105"
          >
            🔙 Go Back
          </button>

          <button className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600 transition transform hover:scale-105">
            💼 Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleGigPage;
