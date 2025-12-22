import React from "react";
import { Spinner, Container } from "react-bootstrap";
import { useSimpleLanguage } from "../context/SimpleLanguageContext";

const LoadingSpinner = ({ message }) => {
  const { language } = useSimpleLanguage();

  const defaultMessage = language === "ar" ? "جاري التحميل..." : "Loading...";

  return (
    <Container className="text-center my-5 py-5">
      <Spinner animation="border" role="status" variant="success" className="mb-3">
        <span className="visually-hidden">{message || defaultMessage}</span>
      </Spinner>
      <p className="text-muted">{message || defaultMessage}</p>
    </Container>
  );
};

export default LoadingSpinner;
