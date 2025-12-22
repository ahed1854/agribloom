import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

const PaymentInstructions = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useSimpleLanguage();
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  useEffect(() => {
    if (!user || user.role !== "user") {
      navigate("/");
      return;
    }
    fetchConsultation();
  }, [consultationId, user, navigate]);

  const fetchConsultation = async () => {
    try {
      setError("");
      const response = await axios.get("/api/consultations/my-consultations");

      if (response.data && response.data.success) {
        const consultations = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
        const foundConsultation = consultations.find((c) => c._id === consultationId);
        if (foundConsultation) {
          setConsultation(foundConsultation);
          if (foundConsultation.payment?.paid) {
            setPaymentCompleted(true);
          }
        } else {
          setError(language === "ar" ? "الاستشارة غير موجودة" : "Consultation not found");
        }
      } else {
        setError(response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data"));
      }
    } catch (err) {
      console.error("Error fetching consultation:", err);
      setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsPaid = async () => {
    try {
      const response = await axios.put(`/api/consultations/${consultationId}/payment`);
      if (response.data && response.data.success) {
        setPaymentCompleted(true);
        setTimeout(() => {
          navigate(`/chat/${consultationId}`);
        }, 2000);
      }
    } catch (err) {
      console.error("Error marking payment:", err);
      setError(
        err.response?.data?.message ||
          (language === "ar" ? "حدث خطأ أثناء تحديث حالة الدفع" : "Error updating payment status")
      );
    }
  };

  if (loading) return <LoadingSpinner message={language === "ar" ? "جاري التحميل..." : "Loading..."} />;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Button as={Link} to={`/chat/${consultationId}`} variant="outline-secondary" className="mb-4">
            <i className="bi bi-arrow-right me-2"></i>
            {t("btn.back", language)}
          </Button>

          {error && (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </Alert>
          )}

          {paymentCompleted ? (
            <Card className="border-success shadow">
              <Card.Body className="p-5 text-center">
                <div className="mb-4">
                  <i className="bi bi-check-circle-fill text-success" style={{ fontSize: "4rem" }}></i>
                </div>
                <h2 className="text-success mb-3">{language === "ar" ? "تم الدفع بنجاح!" : "Payment Successful!"}</h2>
                <p className="text-muted mb-4">
                  {language === "ar"
                    ? "تم تأكيد دفعتك بنجاح. يمكنك الآن العودة إلى المحادثة والبدء في التواصل مع الأخصائي."
                    : "Your payment has been confirmed successfully. You can now return to the chat and start communicating with the specialist."}
                </p>
                <Button as={Link} to={`/chat/${consultationId}`} variant="success" size="lg" className="px-5">
                  <i className="bi bi-chat-dots me-2"></i>
                  {language === "ar" ? "العودة إلى المحادثة" : "Back to Chat"}
                </Button>
              </Card.Body>
            </Card>
          ) : consultation ? (
            <Card className="shadow">
              <Card.Header className="bg-success text-white">
                <h4 className="mb-0">
                  <i className="bi bi-credit-card me-2"></i>
                  {language === "ar" ? "تعليمات الدفع" : "Payment Instructions"}
                </h4>
              </Card.Header>
              <Card.Body className="p-4">
                <div className="mb-4">
                  <h5 className="text-success mb-3">
                    {language === "ar" ? "تفاصيل الاستشارة" : "Consultation Details"}
                  </h5>
                  <Card className="bg-light">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p className="mb-2">
                            <strong>{language === "ar" ? "الأخصائي:" : "Specialist:"}</strong>{" "}
                            {consultation.specialistId?.username || "N/A"}
                          </p>
                        </Col>
                        <Col md={6}>
                          <p className="mb-2">
                            <strong>{language === "ar" ? "قيمة الاستشارة:" : "Consultation Amount:"}</strong> $
                            {consultation.payment?.amount || 0}
                          </p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>

                <div className="mb-5">
                  <h5 className="text-success mb-3">{language === "ar" ? "طريقة الدفع" : "Payment Method"}</h5>
                  <Card className="border-warning">
                    <Card.Body>
                      <p className="mb-3">
                        {language === "ar"
                          ? "حالياً، نقبل الدفع عن طريق التحويل البنكي. يرجى اتباع الخطوات التالية:"
                          : "Currently, we accept payment via bank transfer. Please follow these steps:"}
                      </p>
                      <ol className="mb-0">
                        <li className="mb-2">
                          {language === "ar"
                            ? "قم بالتحويل إلى الحساب البنكي: 1234 5678 9012 3456"
                            : "Transfer to bank account: 1234 5678 9012 3456"}
                        </li>
                        <li className="mb-2">
                          {language === "ar"
                            ? "اكتب في وصف التحويل: استشارة رقم {consultationId}"
                            : "Write in transfer description: Consultation #{consultationId}"}
                        </li>
                        <li className="mb-2">
                          {language === "ar"
                            ? "بعد إتمام التحويل، اضغط على زر 'تم الدفع' أدناه"
                            : "After completing the transfer, click the 'Payment Completed' button below"}
                        </li>
                        <li>
                          {language === "ar"
                            ? "سنتحقق من الدفع ونقوم بتفعيل المحادثة مع الأخصائي"
                            : "We will verify the payment and activate the chat with the specialist"}
                        </li>
                      </ol>
                    </Card.Body>
                  </Card>
                </div>

                <div className="text-center">
                  <Button variant="success" size="lg" className="px-5" onClick={handleMarkAsPaid}>
                    <i className="bi bi-check-circle me-2"></i>
                    {language === "ar" ? "تم الدفع" : "Payment Completed"}
                  </Button>
                  <p className="text-muted mt-3 small">
                    {language === "ar"
                      ? "ملاحظة: سيتم التحقق من الدفع يدوياً من قبل فريق الدعم. قد يستغرق ذلك بعض الوقت خلال أوقات العمل."
                      : "Note: Payment verification is done manually by our support team. This may take some time during business hours."}
                  </p>
                </div>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="warning">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {language === "ar" ? "الاستشارة غير موجودة" : "Consultation not found"}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentInstructions;
