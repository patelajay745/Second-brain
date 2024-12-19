import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading) return <div>Loading....</div>;

  if (!isAuthenticated) return null;

  return children;
};
