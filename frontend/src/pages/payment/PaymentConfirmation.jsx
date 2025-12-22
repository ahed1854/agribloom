import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const PaymentConfirmation = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const { language } = useSimpleLanguage();
  const [loading, setLoading] = useState(true);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Simulate payment confirmation
    setTimeout(() => {
      setConfirmed(true);
      setLoading(false);
    }, 3000);
  }, []);

  if (loading) {
    return <LoadingSpinner message={language === "ar" ? "جاري تأكيد الدفع..." : "Confirming payment..."} />;
  }

  return (
    <Container className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
      <Row className="justify-content-center">
        <Col lg={6}>
          {error ? (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          ) : (
            <Card className="text-center shadow border-0">
              <Card.Body className="p-5">
                {confirmed ? (
                  <>
                    <div className="mb-4">
                      <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "5rem" }}></i>
                    </div>
                    <h2 className="text-success mb-3">
                      {language === "ar" ? "تم تأكيد الدفع بنجاح!" : "Payment Confirmed Successfully!"}
                    </h2>
                    <p className="text-muted mb-4">
                      {language === "ar"
                        ? "شكراً لك على دفع قيمة الاستشارة. يمكنك الآن العودة إلى المحادثة والاستفادة الكاملة من خدمة الأخصائي."
                        : "Thank you for paying for the consultation. You can now return to the chat and fully benefit from the specialist's service."}
                    </p>
                    <div className="d-flex justify-content-center gap-3">
                      <Button as={Link} to={`/chat/${consultationId}`} variant="success" size="lg">
                        {language === "ar" ? (
                          <>
                            {language === "ar" ? "العودة إلى المحادثة" : "Back to Chat"}
                            <i className="bi bi-chat-dots ms-2"></i>
                          </>
                        ) : (
                          <>
                            <i className="bi bi-chat-dots me-2"></i>
                            {language === "ar" ? "العودة إلى المحادثة" : "Back to Chat"}
                          </>
                        )}
                      </Button>
                      <Button as={Link} to="/my-consultations" variant="outline-success" size="lg">
                        <i className="bi bi-list-ul me-2"></i>
                        {language === "ar" ? "استشاراتي" : "My Consultations"}
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-4">
                      <i className="bi bi-clock-history text-warning" style={{ fontSize: "5rem" }}></i>
                    </div>
                    <h2 className="text-warning mb-3">{language === "ar" ? "قيد الانتظار" : "Pending"}</h2>
                    <p className="text-muted mb-4">
                      {language === "ar"
                        ? "جاري التحقق من الدفع. قد يستغرق هذا بعض الوقت. سيتم إعلامك بمجرد اكتمال التحقق."
                        : "Payment verification is in progress. This may take some time. You will be notified once verification is complete."}
                    </p>
                    <Button as={Link} to={`/chat/${consultationId}`} variant="outline-secondary" size="lg">
                      <i className="bi bi-arrow-left me-2"></i>
                      {language === "ar" ? "العودة إلى المحادثة" : "Back to Chat"}
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentConfirmation;
