import React, { useState } from "react";
import { useClientStore } from "../stores/clientStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface FormState {
  title: string;
  Description: string;
  type: string;
  duration: string;
  engagement: string;
  proposals_tier: string;
  tier: string;
  occupations_category_pref_label: string;
  occupations_oservice_pref_label: string;
  hourly_rate: number | string;
  amount_amount: number | string;
  freelancers_to_hire: number | string;
}

const typeOptions = ["hourly", "fixed_budget", "no_budget"];
const durationOptions = [
  "Less than 1 month",
  "1 to 3 months",
  "3 to 6 months",
  "More than 6 months",
];
const engagementOptions = [
  "30+ hrs/week",
  "Less than 30 hrs/week",
  "not_sure",
  "Hours to be determined",
];
const proposalsTierOptions = [
  "Less than 5",
  "5 to 10",
  "10 to 15",
  "15 to 20",
  "20 to 50",
  "50+",
];
const tierOptions = ["Entry level", "Intermediate", "Expert"];
const categoryOptions = [
  "Translation",
  "Design & Creative",
  "Sales & Marketing",
  "Writing",
  "Web, Mobile & Software Dev",
  "Engineering & Architecture",
  "Customer Service",
  "Accounting & Consulting",
  "Admin Support",
  "Data Science & Analytics",
];
const serviceOptions = [
  "Live Interpretation",
  "Cartoons & Comics",
  "Graphic Design",
  "Social Media Marketing",
  "Telemarketing",
  "Scriptwriting",
  "Mobile App Development",
  "Mechanical Engineering",
  "Business & Proposal Writing",
  "Ecommerce Website Development",
];

const CreateGig: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    Description: "",
    type: "",
    duration: "",
    engagement: "",
    proposals_tier: "",
    tier: "",
    occupations_category_pref_label: "",
    occupations_oservice_pref_label: "",
    hourly_rate: "",
    amount_amount: "",
    freelancers_to_hire: "",
  });

  const [loading, setLoading] = useState(false);
  const [predicting, setPredicting] = useState<boolean>(false);
  const { addGigToClient } = useClientStore();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: e.target.type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await addGigToClient(form);
    setLoading(false);
    navigate("/client-dashboard");
  };

  const predictPrice = async () => {
    setPredicting(true);
    try {
      // Extract only the fields needed by the ML model
      const predictionInput = {
        amount_amount: form.amount_amount,
        type: form.type,
        duration: form.duration,
        engagement: form.engagement,
        proposals_tier: form.proposals_tier,
        tier: form.tier,
        freelancers_to_hire: form.freelancers_to_hire,
        occupations_category_pref_label: form.occupations_category_pref_label,
        occupations_oservice_pref_label: form.occupations_oservice_pref_label,
      };

      const { data } = await axios.post("/api/predict-price", predictionInput);
      setForm((prev) => ({
        ...prev,
        hourly_rate: Math.round(data.predicted_price),
      }));
    } catch (err) {
      console.error("Prediction failed", err);
      alert("Failed to predict price. Please try again.");
    } finally {
      setPredicting(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Gig</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        {/* Title & Description */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="Description"
            value={form.Description}
            onChange={handleChange}
            required
            rows={4}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Pricing */}
        <div className="grid grid-cols-2 gap-4 items-end">
          <div>
            <label className="block mb-1 font-medium">Hourly Rate</label>
            <input
              type="number"
              name="hourly_rate"
              value={form.hourly_rate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={predictPrice}
              disabled={predicting}
              className={`bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center ${
                predicting && "opacity-70 cursor-not-allowed"
              }`}
            >
              {predicting ? (
                <svg
                  className="animate-spin h-5 w-5 mr-1 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : null}
              {predicting ? "Predicting..." : "Predict Price"}
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Amount</label>
          <input
            type="number"
            name="amount_amount"
            value={form.amount_amount}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
          />
        </div>

        {/* Categorical dropdowns */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select type</option>
              {typeOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Duration</label>
            <select
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select duration</option>
              {durationOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Engagement</label>
            <select
              name="engagement"
              value={form.engagement}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select engagement</option>
              {engagementOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Proposals Tier</label>
            <select
              name="proposals_tier"
              value={form.proposals_tier}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select tier</option>
              {proposalsTierOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Gig Tier</label>
            <select
              name="tier"
              value={form.tier}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select gig tier</option>
              {tierOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">
              # Freelancers to Hire
            </label>
            <input
              type="number"
              name="freelancers_to_hire"
              value={form.freelancers_to_hire}
              onChange={handleChange}
              min={1}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            />
          </div>
        </div>

        {/* Occupational preferences */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="occupations_category_pref_label"
              value={form.occupations_category_pref_label}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select category</option>
              {categoryOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Service</label>
            <select
              name="occupations_oservice_pref_label"
              value={form.occupations_oservice_pref_label}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring"
            >
              <option value="">Select service</option>
              {serviceOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="flex justify-center items-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8z"
                />
              </svg>
              Creating...
            </span>
          ) : (
            "Create Gig"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
