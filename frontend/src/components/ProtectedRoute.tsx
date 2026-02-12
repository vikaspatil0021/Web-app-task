import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

import type { AuthContextType } from "../types/auth.type";


export default function ProtectedRoute() {
  const { user, loading } = useContext(AuthContext) as AuthContextType;


  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
