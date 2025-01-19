import { Navigate, useLocation } from "react-router-dom";

export default function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();
  console.log(authenticated, user, location.pathname.includes("/auth"));

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to={"/auth"} />;
  } else if (
    authenticated &&
    user.role !== "admin" &&
    (location.pathname.includes("admin") || location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/home"} />;
  } else if (
    authenticated &&
    user.role === "admin" &&
    (!location.pathname.includes("admin") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to={"/admin"} />;
  } else {
    console.log(element);

    return <>{element}</>;
  }
}
