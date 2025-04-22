import { create } from "zustand";
import apiClient from "../utils/axiosInterceptors";
import { persist } from "zustand/middleware";

interface Gig {
  gigId: string;
  title: string;
  amount_amount?: number | string;
  hourly_rate?: number | string;
  duration?: string;
  type?: string;
  Description?: string;
  Status?: string;
  created_on?: string;
  engagement?: string;
  freelancers_to_hire?: number | string;
  proposals_tier?: string;
  published_on?: string;
  tier?: string;
  client_total_reviews?: number;
  client_total_spent?: number;
  client_location_country?: string;
  client_total_feedback?: number;
  occupations_category_pref_label?: string;
  occupations_oservice_pref_label?: string;
}

interface Client {
  client: {
    _id: string;
    email: string;
    name?: string;
    location?: string;
    total_spent: number;
    gigs: Gig[];
  };
}

interface ClientAuthState {
  client: Client | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  registerClient: (data: {
    email: string;
    password: string;
    name?: string;
    location?: string;
  }) => Promise<void>;
  loginClient: (email: string, password: string) => Promise<void>;
  logoutClient: () => Promise<void>;
  // fetchClientProfile: () => Promise<void>;
  updateClientDetails: (updatedData: Partial<Client>) => Promise<void>;
  addGigToClient: (gigData: Partial<Gig>) => Promise<void>;
  removeGigFromClient: (gigId: string) => Promise<void>;
  isAuthenticated: () => boolean;
}

export const useClientStore = create<ClientAuthState>()(
  persist(
    (set, get) => ({
      client: null,
      accessToken: null,
      isLoading: false,
      error: null,

      registerClient: async (data) => {
        try {
          set({ isLoading: true, error: null });
          const res = await apiClient.post("/client/register", data);
          set({
            client: res.data.data,
            accessToken: res.data.accessToken,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          });
        }
      },

      loginClient: async (email, password) => {
        try {
          set({ isLoading: true, error: null });
          const res = await apiClient.post("/client/login", {
            email,
            password,
          });
          set({
            client: res.data.data,
            accessToken: res.data.accessToken,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message,
            isLoading: false,
          });
        }
      },

      logoutClient: async () => {
        try {
          await apiClient.post("/client/logout");
          set({ client: null, accessToken: null });
        } catch (error: any) {
          console.log(error);

          set({ error: error.response?.data?.message });
        }
      },

      // fetchClientProfile: async () => {
      //   try {
      //     set({ isLoading: true });
      //     const res = await apiClient.get("/client/current-user");
      //     set({ client: res.data.data, isLoading: false });
      //   } catch (error: any) {
      //     set({
      //       error: error.response?.data?.message || "Failed to fetch profile",
      //       isLoading: false,
      //     });
      //   }
      // },

      updateClientDetails: async (updatedData) => {
        try {
          set({ isLoading: true });
          const res = await apiClient.put(
            `/client/${get().client?.client._id}`,
            updatedData
          );
          set({ client: res.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to update client",
            isLoading: false,
          });
        }
      },

      addGigToClient: async (gigData) => {
        try {
          const clientId = get().client?.client._id;
          if (!clientId) return;

          set({ isLoading: true });
          const res = await apiClient.put(
            `/client/${clientId}/add-gig`,
            gigData
          );
          set({ client: res.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to add gig",
            isLoading: false,
          });
        }
      },

      removeGigFromClient: async (gigId: string) => {
        try {
          const clientId = get().client?.client._id;
          if (!clientId) return;

          set({ isLoading: true });
          const res = await apiClient.put(`/client/${clientId}/remove-gig`, {
            gigId,
          });
          set({ client: res.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to remove gig",
            isLoading: false,
          });
        }
      },

      isAuthenticated: () => {
        return !!get().client;
      },
    }),
    {
      name: "client-storage",
    }
  )
);
