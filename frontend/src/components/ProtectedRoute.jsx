import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";
import { useSimpleLanguage } from "../context/SimpleLanguageContext";

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();
  const { language } = useSimpleLanguage();

  if (loading) {
    return <LoadingSpinner message={language === "ar" ? "جاري التحقق من المصادقة..." : "Checking authentication..."} />;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
