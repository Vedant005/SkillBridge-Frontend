import { Navigate, Outlet } from "react-router-dom";
import { useFreelancerStore } from "../stores/freelancerStore";

const AuthGuard = ({ redirectTo = "/login" }) => {
  const { freelancer } = useFreelancerStore();

  if (!freelancer) {
    return <Navigate to={redirectTo} replace />;
  }
  return <Outlet />;
};

export default AuthGuard;
