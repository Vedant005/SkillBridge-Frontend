import { create } from "zustand";
import { AxiosError } from "axios";
import apiClient from "../utils/axiosInterceptors";
import { useGigsStore } from "./gigsStore";
import Gigs from "../components/Gigs";

// Define the chatbot store state and actions
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
    occupations_category_pref_label: string;
    occupations_oservice_pref_label: string;
    client_total_reviews: number;
    client_total_spent: number;
    proposals_tier: string;
  };
}
interface ChatbotState {
  answer: string;
  loading: boolean;
  error: string | null;
  chatbotHandler: (query: string) => Promise<void>;
}

export const useChatbotStore = create<ChatbotState>((set) => ({
  answer: "",
  loading: false,
  error: null,

  chatbotHandler: async (query: string) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get<{
        data: { ai_response: string; gigs: Gig[] };
      }>(`/gigs/chat/?query=${encodeURIComponent(query)}`);

      console.log("📩 Chatbot Response:", response.data);

      set({
        answer: response.data.data.ai_response,

        loading: false,
        error: null,
      });
      console.log(response.data.data.gigs);

      // useGigsStore.setState({ gigs: response.data.data.gigs });
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      set({
        error:
          axiosError.response?.data?.message ||
          "Failed to connect with chatbot",
        loading: false,
      });
    }
  },
}));
