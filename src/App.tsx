import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./pages/HomePage";
import GigsPage from "./pages/GigsPage";
import SingleGigPage from "./pages/SingleGigPage";
import AuthGuard from "./components/AuthGuard";
import FreelancerLogin from "./components/FreelancerLogin";
import FreelancerSignup from "./components/FreelancerSingup";
import ProfilePage from "./pages/ProfilePage";
import ClientLogin from "./components/clientLogin";
import ClientSignup from "./components/clientSignup";
import ClientDashboard from "./pages/clientDashboard";
import CreateGig from "./components/createGIg";
import Redirection from "./components/Redirection";
import ClientProfilePage from "./pages/clientProfilePage,";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/freelancer/login" element={<FreelancerLogin />} />
        <Route path="/freelancer/signup" element={<FreelancerSignup />} />

        {/* Protected Routes */}

        <Route path="/gigs" element={<GigsPage />} />
        <Route path="/gigs/:gigId" element={<SingleGigPage />} />
        <Route path="/freelancer/profile" element={<ProfilePage />} />

        <Route path="/client/login" element={<ClientLogin />} />
        <Route path="/client/signup" element={<ClientSignup />} />
        <Route path="/client/dashboard" element={<ClientDashboard />} />
        <Route path="/client/create-gig" element={<CreateGig />} />
        <Route path="/client/profile" element={<ClientProfilePage />} />

        <Route path="/redirection" element={<Redirection />} />
      </Routes>
    </>
  );
}

export default App;
