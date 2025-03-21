import { create } from "zustand";
import apiClient from "../utils/axiosInterceptors";
import { AxiosError } from "axios";

// Types
interface Gig {
  _id: string;
  connect_price: Number;
  created_on: Date;

  tz_date: Date;
  duration: String;
  engagement: String;

  freelancers_to_hire: Number;
  amount_amount: Number;

  hourly_rate: Number;

  type: String;
  job_ts: Number;
  proposals_tier: String;

  published_on: Date;
  tier: String;
  title: String;
  uid: Number;
  total_freelancers_to_hire: Number;

  client_company_org_uid: Number;

  client_payment_verification_status: Number;

  client_total_feedback: Number;

  occupations_category_pref_label: String;
  occupations_oservice_pref_label: String;
  client_total_reviews: Number;

  client_total_spent: Number;

  client_location_country: String;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalGigs: number;
}

interface GigsStore {
  gigs: Gig[];
  loading: boolean;
  success: boolean;
  error: string | null;
  pagination: Pagination;
  fetchGigs: (page?: number, limit?: number) => Promise<void>;
  createGig: (gigData: Partial<Gig>) => Promise<void>;
  updateGig: (id: string, updatedData: Partial<Gig>) => Promise<void>;
  deleteGig: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useGigsStore = create<GigsStore>((set) => ({
  gigs: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalGigs: 0,
  },
  success: false,

  // Fetch Gigs with Pagination
  fetchGigs: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get("/gigs/");
      console.log(response);

      set({
        gigs: response.data.data,
        pagination: response.data.message.pagination,
        success: true,
        loading: false,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: (axiosError.response?.data as string) || "Failed to fetch gigs",
        loading: false,
      });
    }
  },

  // Create Gig
  createGig: async (gigData: Partial<Gig>) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.post("/gigs/create", gigData);

      set((state) => ({
        gigs: [...state.gigs, response.data.data],
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: (axiosError.response?.data as string) || "Failed to create gig",
        loading: false,
      });
    }
  },

  // Update Gig
  updateGig: async (_id: string, updatedData: Partial<Gig>) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.put(`/gigs/update/${_id}`, updatedData);

      // Update the gig in the store
      set((state) => ({
        gigs: state.gigs.map((gig) =>
          gig._id === _id ? response.data.data : gig
        ),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: (axiosError.response?.data as string) || "Failed to update gig",
        loading: false,
      });
    }
  },

  // Delete Gig
  deleteGig: async (id: string) => {
    set({ loading: true, error: null });

    try {
      await apiClient.delete(`/gigs/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // JWT token
        },
      });

      // Remove the deleted gig from the store
      set((state) => ({
        gigs: state.gigs.filter((gig) => gig._id !== id),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error: (axiosError.response?.data as string) || "Failed to delete gig",
        loading: false,
      });
    }
  },

  // Clear Errors
  clearError: () => set({ error: null }),
}));
