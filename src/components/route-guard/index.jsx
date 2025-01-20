import { Navigate, useLocation } from "react-router-dom";
import { useUserState } from "@/store/user";

export default function RouteGuard({ authenticated, user, element }) {
  const [userState, setUserState] = useUserState();

  const location = useLocation();
  if (!userState.authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"} />;
  } else if (
    userState.authenticated &&
    userState.user.role !== "admin" &&
    (location.pathname.includes("admin") || location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/home"} />;
  } else if (
    userState.authenticated &&
    userState.user.role === "admin" &&
    (!location.pathname.includes("admin") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/admin"} />;
  } else {
    return <>{element}</>;
  }
}
