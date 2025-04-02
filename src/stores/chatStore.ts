import { create } from "zustand";
import { AxiosError } from "axios";
import apiClient from "../utils/axiosInterceptors";

// Define the chatbot store state and actions
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
      const response = await apiClient.get<{ data: { ai_response: string } }>(
        `/gigs/chat/?query=${encodeURIComponent(query)}`
      );

      console.log("📩 Chatbot Response:", response.data);

      set({
        answer: response.data.data.ai_response,
        loading: false,
        error: null,
      });
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
