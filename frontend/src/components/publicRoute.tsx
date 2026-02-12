import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { AuthContextType } from "../types/auth.type";

export default function PublicRoute() {
  const { user, loading } = useContext(AuthContext) as AuthContextType;

  if (loading) return null;

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
