import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedContainer from "../../components/ThemedContainer";
import colors from "../../context/color";

const CreateConsultation = () => {
  const { specialistId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useSimpleLanguage();
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || user.role !== "user") {
      navigate("/");
      return;
    }
    fetchSpecialist();
  }, [specialistId, user, navigate]);

  const fetchSpecialist = async () => {
    try {
      const response = await axios.get(`/api/specialists/${specialistId}`);
      setSpecialist(response.data);
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ أثناء تحميل بيانات الأخصائي" : "Error loading specialist data");
      console.error("Error fetching specialist:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await axios.post("/api/consultations", {
        specialistId,
      });

      if (response.data && response.data.success && response.data.data) {
        const consultationId = response.data.data._id;
        navigate(`/chat/${consultationId}`);
      } else {
        setError(
          response.data?.message ||
            (language === "ar" ? "حدث خطأ أثناء إنشاء الاستشارة" : "Error creating consultation")
        );
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          (language === "ar" ? "حدث خطأ أثناء إنشاء الاستشارة" : "Error creating consultation")
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner message={language === "ar" ? "جاري التحميل..." : "Loading..."} />;
  if (!specialist) {
    return (
      <Container className="my-5">
        <Alert variant="warning">{language === "ar" ? "الأخصائي غير موجود" : "Specialist not found"}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* <Button as={Link} to={`/specialists/${specialistId}`} variant="outline-secondary" className="mb-4">
            <i className="bi bi-arrow-right me-2"></i>
            {t("btn.back", language)}
          </Button> */}
          {/* Back Button */}
          <div style={{ margin: "20px" }}>
            <Link to={`/specialists/${specialistId}`}>
              <ThemedButton type="secondary">{t("btn.back", language)}</ThemedButton>
            </Link>
          </div>


          <Card className="shadow">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <ThemedHeading className="text-success">{language === "ar" ? "طلب استشارة جديدة" : "New Consultation Request"}</ThemedHeading>
                <ThemedText className="text-muted">
                  {language === "ar" ? "تأكيد طلب استشارة مع الأخصائي" : "Confirm consultation request with specialist"}
                </ThemedText>
              </div>

              {error && <Alert variant="danger">{error}</Alert>}

              <Row className="mb-4">
                <Col md={6}>
                  <Card className="bg-light">
                    <Card.Body>
                      <h5 className="text-success" style={{color: "#4a6048"}}>
                        {language === "ar" ? "معلومات الأخصائي" : "Specialist Information"}
                      </h5>
                      <ThemedText className="mb-1">
                        <strong>{language === "ar" ? "الاسم:" : "Name:"}</strong> {specialist.username}
                      </ThemedText>
                      <ThemedText className="mb-1">
                        <strong>{language === "ar" ? "التخصص:" : "Specialization:"}</strong>{" "}
                        {specialist.specialistProfile?.expertise?.join("، ") || "N/A"}
                      </ThemedText>
                      <ThemedText className="mb-1">
                        <strong>{language === "ar" ? "سنوات الخبرة:" : "Experience:"}</strong>{" "}
                        {specialist.specialistProfile?.experienceYears || 0} {language === "ar" ? "سنة" : "years"}
                      </ThemedText>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="bg-light">
                    <Card.Body>
                      <h5 className="text-success">
                        {language === "ar" ? "تفاصيل الاستشارة" : "Consultation Details"}
                      </h5>
                      <p className="mb-1">
                        <strong>{language === "ar" ? "سعر الاستشارة:" : "Consultation Price:"}</strong>{" "}
                        {specialist.specialistProfile?.price || 0} $
                      </p>
                      <p className="mb-1">
                        <strong>{language === "ar" ? "الحالة:" : "Status:"}</strong>{" "}
                        {language === "ar" ? "مفتوحة" : "Open"}
                      </p>
                      <p className="mb-0">
                        <strong>{language === "ar" ? "نظام الدفع:" : "Payment:"}</strong>{" "}
                        {language === "ar" ? "لاحقاً" : "Later"}
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>

              <Card className="border-warning">
                <Card.Body>
                  <h6 className="text-warning mb-3">
                    <i className="bi bi-info-circle me-2"></i>
                    {language === "ar" ? "معلومات هامة" : "Important Information"}
                  </h6>
                  <ul className="list-unstyled mb-0">
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {language === "ar"
                        ? "يمكنك بدء المحادثة مع الأخصائي مباشرة بعد تأكيد الطلب"
                        : "You can start chatting with the specialist immediately after confirming the request"}
                    </li>
                    <li className="mb-2">
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {language === "ar"
                        ? "ستحتاج لدفع قيمة الاستشارة قبل أن يتمكن الأخصائي من تقديم استشارة مفصلة"
                        : "You need to pay for the consultation before the specialist can provide detailed advice"}
                    </li>
                    <li>
                      <i className="bi bi-check-circle text-success me-2"></i>
                      {language === "ar"
                        ? "يمكنك إلغاء الاستشارة في أي وقت قبل الدفع"
                        : "You can cancel the consultation anytime before payment"}
                    </li>
                  </ul>
                </Card.Body>
              </Card>

              <Form onSubmit={handleSubmit} className="mt-4">
                <div className="d-flex justify-content-between">
                  {/* <Button as={Link} to={`/specialists/${specialistId}`} variant="outline-secondary">
                    {t("btn.cancel", language)}
                  </Button> */}
                  <Button 
                    as={Link} 
                    to={`/specialists/${specialistId}`} 
                    style={{ borderColor: "#703030", color: "#703030", background: "#fff" }}

                  >
                    {t("btn.cancel", language)}
                  </Button>

                  {/* <Button type="submit" variant="success" disabled={submitting} className="px-5">
                    {submitting
                      ? language === "ar"
                        ? "جاري إنشاء الاستشارة..."
                        : "Creating consultation..."
                      : language === "ar"
                      ? "تأكيد طلب الاستشارة"
                      : "Confirm Consultation Request"}
                  </Button> */}
                  <ThemedButton type="submit" disabled={submitting} className="px-5">
                    {submitting
                      ? language === "ar"
                        ? "جاري إنشاء الاستشارة..."
                        : "Creating consultation..."
                      : language === "ar"
                      ? "تأكيد طلب الاستشارة"
                      : "Confirm Consultation Request"}
                  </ThemedButton>


                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateConsultation;
