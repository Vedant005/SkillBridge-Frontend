import { create } from "zustand";
import apiClient from "../utils/axiosInterceptors";
import { persist } from "zustand/middleware";

interface Freelancer {
  freelancer: {
    _id: string;
    fullName: string;
    email: string;
    experience_level: string;
    location: string;
    hourly_rate: number;
    occupation: string;
    skills: string[];
    description: string;
    qualification: string;
    resume?: string;
  };
}

interface AuthState {
  freelancer: Freelancer | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  registerFreelancer: (formData: FormData) => Promise<void>;
  loginFreelancer: (email: string, password: string) => Promise<void>;
  logoutFreelancer: () => Promise<void>;
  fetchFreelancerProfile: () => Promise<void>;
  updateFreelancerDetails: (updatedData: Partial<Freelancer>) => Promise<void>;
  uploadFreelancerResume: (resumeFile: File) => Promise<void>;
}

export const useFreelancerStore = create<AuthState>()(
  persist(
    (set, get) => ({
      freelancer: null,
      accessToken: null,
      isLoading: false,
      error: null,

      // Register Freelancer
      registerFreelancer: async (formData: FormData) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post(
            "/freelancer/register",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );
          set({ freelancer: response.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Registration failed",
            isLoading: false,
          });
        }
      },

      // Login Freelancer
      loginFreelancer: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.post("/freelancer/login", {
            email,
            password,
          });
          console.log(response);

          set({
            freelancer: response.data.data,
            isLoading: false,
          });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Login failed",
            isLoading: false,
          });
        }
      },

      // Logout Freelancer
      logoutFreelancer: async () => {
        try {
          await apiClient.post("/freelancer/logout");
          set({ freelancer: null });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Logout failed" });
        }
      },

      // Fetch Freelancer Profile
      fetchFreelancerProfile: async () => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.get("/freelancer/current-user");
          set({ freelancer: response.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Failed to fetch profile",
            isLoading: false,
          });
        }
      },

      // Update Freelancer Details
      updateFreelancerDetails: async (updatedData: Partial<Freelancer>) => {
        try {
          set({ isLoading: true, error: null });
          const response = await apiClient.patch(
            "/freelancer/update-details",
            updatedData
          );
          set({ freelancer: response.data.data, isLoading: false });
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Update failed",
            isLoading: false,
          });
        }
      },

      // Upload Freelancer Resume
      uploadFreelancerResume: async (resumeFile: File) => {
        try {
          set({ isLoading: true, error: null });

          const formData = new FormData();
          formData.append("resume", resumeFile);

          const response = await apiClient.patch(
            "/freelancer/upload-resume",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          set((state) => ({
            freelancer: state.freelancer
              ? { ...state.freelancer, resume: response.data.data.resume }
              : null,
            isLoading: false,
          }));
        } catch (error: any) {
          set({
            error: error.response?.data?.message || "Resume upload failed",
            isLoading: false,
          });
        }
      },
      refreshAccessToken: async () => {
        try {
          await apiClient.post(
            "/freelancer/refresh-token",
            {},
            { withCredentials: true }
          );
          console.log("Access token refreshed successfully");
          return true;
        } catch (error) {
          set({
            freelancer: null,
            error: "Session expired. Please login again.",
          });
          return false;
        }
      },
      isAuthenticated: () => {
        return !!get().freelancer;
      },
    }),

    {
      name: "freelance-storage", // name of the item in the storage (must be unique)
    }
  )
);
