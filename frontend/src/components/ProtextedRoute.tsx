import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <div>Loading....</div>;

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      console.log("redirecting bcoz of not authenticated");
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (!isAuthenticated) return null;

  return children;
};
