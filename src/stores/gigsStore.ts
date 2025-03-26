import { create } from "zustand";
import apiClient from "../utils/axiosInterceptors";
import { AxiosError } from "axios";

// ✅ Types
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

interface SingleGig {
  clientId: string;
  email: string;
  location: string;
  gig: {
    gigId: string;
    title: string;
    type: string;
    hourly_rate: number;
    amount_amount: number;
    sentiment: string;
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

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalGigs: number;
}

interface GigsStore {
  gigs: Gig[];
  singleGig: SingleGig | null;
  loading: boolean;
  success: boolean;
  error: string | null;
  pagination: Pagination;
  fetchGigs: (page?: number, limit?: number) => Promise<void>;
  fetchSingleGig: (gigId: string) => Promise<void>;
  createGig: (clientId: string, gigData: Partial<Gig>) => Promise<void>;
  updateGig: (
    clientId: string,
    gigId: string,
    updatedData: Partial<Gig>
  ) => Promise<void>;
  deleteGig: (clientId: string, gigId: string) => Promise<void>;
  setRecentlyViewedGig: (gigId: string) => void;
  loadRecommendedGigsOnStartup: () => void;
  clearError: () => void;
}

export const useGigsStore = create<GigsStore>((set) => ({
  gigs: [],
  singleGig: null,
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalGigs: 0,
  },
  success: false,

  setRecentlyViewedGig: (gigId: string) => {
    localStorage.setItem("recentlyViewedGigId", gigId);
  },

  loadRecommendedGigsOnStartup: async () => {
    const gigId = localStorage.getItem("recentlyViewedGigId");
    if (gigId) {
      await useGigsStore.getState().fetchGigs();
    }
  },

  fetchGigs: async (page = 1, limit = 10) => {
    set({ loading: true, error: null });

    try {
      const gigId = localStorage.getItem("recentlyViewedGigId") || "";

      const queryString = gigId
        ? `/gigs/?page=${page}&limit=${limit}&gigId=${gigId}`
        : `/gigs/?page=${page}&limit=${limit}`;

      const response = await apiClient.get(queryString);

      const allGigs = response.data.data;

      set({
        gigs: allGigs,
        pagination: response.data.message.pagination, // ✅ Store pagination data
        loading: false,
      });
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error:
          (axiosError.response?.data as { message?: string })?.message ||
          "Failed to fetch gigs",
        loading: false,
      });
    }
  },

  fetchSingleGig: async (gigId: string) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.get(`/gigs/${gigId}`);

      const item = response.data.data;

      const flattenedGig = {
        ...item.gig,
        clientId: item.clientId,
        email: item.email,
        location: item.location,
      };

      set({ singleGig: item, loading: false, error: null });
      // set().setRecentlyViewedGig(gigId);
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error:
          (axiosError.response?.data as { message?: string })?.message ||
          "Failed to fetch gigs",
        loading: false,
      });
    }
  },

  createGig: async (clientId: string, gigData: Partial<Gig>) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.post(
        `/gigs/create/${clientId}`,
        gigData
      );

      set((state) => ({
        gigs: [...state.gigs, response.data.data],
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error:
          (axiosError.response?.data as { message?: string })?.message ||
          "Failed to create gig",
        loading: false,
      });
    }
  },

  updateGig: async (
    clientId: string,
    gigId: string,
    updatedData: Partial<Gig>
  ) => {
    set({ loading: true, error: null });

    try {
      const response = await apiClient.put(
        `/gigs/${clientId}/${gigId}`,
        updatedData
      );

      set((state) => ({
        gigs: state.gigs.map((gig) =>
          gig.gigs.gigId === gigId ? { ...gig, ...updatedData } : gig
        ),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error:
          (axiosError.response?.data as { message?: string })?.message ||
          "Failed to update gig",
        loading: false,
      });
    }
  },

  deleteGig: async (clientId: string, gigId: string) => {
    set({ loading: true, error: null });

    try {
      await apiClient.delete(`/gigs/${clientId}/${gigId}`);

      set((state) => ({
        gigs: state.gigs.filter((gig) => gig.gigs.gigId !== gigId),
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({
        error:
          (axiosError.response?.data as { message?: string })?.message ||
          "Failed to delete gig",
        loading: false,
      });
    }
  },

  clearError: () => set({ error: null }),
}));
