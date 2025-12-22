

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const ServiceDetail = () => {
//   const { id } = useParams();
//   const { language } = useSimpleLanguage();
//   const [service, setService] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!id) {
//       setError(language === "ar" ? "معرف الخدمة غير صالح" : "Invalid service ID");
//       setLoading(false);
//       return;
//     }
//     fetchService();
//   }, [id, language]);

//   const fetchService = async () => {
//     try {
//       setError("");
//       const response = await axios.get(`/api/services/${id}`);

//       if (response.data && response.data.success) {
//         setService(response.data.data);
//       } else {
//         setError(
//           response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل الخدمة" : "Error loading service")
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching service:", err);
//       if (err.response?.status === 404) {
//         setError(language === "ar" ? "الخدمة غير موجودة" : "Service not found");
//       } else {
//         setError(language === "ar" ? "حدث خطأ أثناء تحميل الخدمة" : "Error loading service");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSpinner message={language === "ar" ? "جاري تحميل الخدمة..." : "Loading service..."} />;

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Button as={Link} to="/services" variant="outline-secondary" className="mb-4">
//             <i className="bi bi-arrow-right me-2"></i>
//             {t("btn.back", language)}
//           </Button>

//           {error ? (
//             <Alert variant="danger">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {error}
//             </Alert>
//           ) : service ? (
//             <Card className="shadow border-0">
//               <Card.Body className="p-4">
//                 <div className="text-center mb-4">
//                   <div
//                     className="rounded-circle d-inline-flex align-items-center justify-content-center p-4 mb-3"
//                     style={{
//                       background: "linear-gradient(135deg, #28a745, #20c997)",
//                       color: "white",
//                     }}
//                   >
//                     <i className="bi bi-tools" style={{ fontSize: "3rem" }}></i>
//                   </div>
//                   <Card.Title className="h1 text-success mb-3">{service.title}</Card.Title>
//                   <div className="text-success fw-bold fs-4 mb-4">
//                     ${service.price} {language === "ar" ? "للخدمة" : "per service"}
//                   </div>
//                 </div>

//                 <div className="mb-5">
//                   <h5 className="text-success mb-3">{language === "ar" ? "وصف الخدمة" : "Service Description"}</h5>
//                   <div
//                     className="text-muted"
//                     style={{
//                       lineHeight: "1.8",
//                       fontSize: "1.1rem",
//                       whiteSpace: "pre-line",
//                     }}
//                   >
//                     {service.description}
//                   </div>
//                 </div>

//                 {service.features && service.features.length > 0 && (
//                   <div className="mb-5">
//                     <h5 className="text-success mb-3">{language === "ar" ? "مميزات الخدمة" : "Service Features"}</h5>
//                     <Row>
//                       {service.features.map((feature, index) => (
//                         <Col key={index} md={6} className="mb-3">
//                           <div className="d-flex align-items-start">
//                             <i className="bi bi-check-circle-fill text-success me-3 mt-1"></i>
//                             <span>{feature}</span>
//                           </div>
//                         </Col>
//                       ))}
//                     </Row>
//                   </div>
//                 )}

//                 <Card className="border-success mt-4">
//                   <Card.Body className="text-center p-4">
//                     <h5 className="text-success mb-3">
//                       {language === "ar" ? "طلب هذه الخدمة" : "Request This Service"}
//                     </h5>
//                     <p className="text-muted mb-4">
//                       {language === "ar"
//                         ? "للحصول على هذه الخدمة، يرجى التواصل مع أحد أخصائيينا"
//                         : "To get this service, please contact one of our specialists"}
//                     </p>
//                     <Button as={Link} to="/specialists" variant="success" size="lg" className="px-5">
//                       <i className="bi bi-person me-2"></i>
//                       {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Card.Body>
//             </Card>
//           ) : (
//             <Alert variant="warning">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {language === "ar" ? "الخدمة غير موجودة" : "Service not found"}
//             </Alert>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ServiceDetail;




import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

import ThemedButton from "../../components/ThemedButton";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedText from "../../components/ThemedText";

const ServiceDetail = () => {
  const { id } = useParams();
  const { language } = useSimpleLanguage();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) {
      setError(language === "ar" ? "معرف الخدمة غير صالح" : "Invalid service ID");
      setLoading(false);
      return;
    }
    fetchService();
  }, [id, language]);

  const fetchService = async () => {
    try {
      setError("");
      const response = await axios.get(`/api/services/${id}`);

      if (response.data && response.data.success) {
        setService(response.data.data);
      } else {
        setError(
          response.data?.message ||
            (language === "ar" ? "حدث خطأ أثناء تحميل الخدمة" : "Error loading service")
        );
      }
    } catch (err) {
      console.error("Error fetching service:", err);
      if (err.response?.status === 404) {
        setError(language === "ar" ? "الخدمة غير موجودة" : "Service not found");
      } else {
        setError(language === "ar" ? "حدث خطأ أثناء تحميل الخدمة" : "Error loading service");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <LoadingSpinner
        message={language === "ar" ? "جاري تحميل الخدمة..." : "Loading service..."}
      />
    );

  return (
    <div className="service-detail my-5" style={{ display: "flex", justifyContent: "center"}}>
      {/* زر العودة */}
      <div className="mb-4" style={{margin: "20px"}}>
        <Link to="/services">
          <ThemedButton color="secondary" outline>
            {t("btn.back", language)}
          </ThemedButton>
        </Link>
      </div>

      {error ? (
        <div className="alert alert-danger">⚠️ {error}</div>
      ) : service ? (
        <div className="card shadow p-4" style={{margin: "30px", textAlign: "center", alignItems: "center"}}>
          <div className="text-center mb-4">
            <div
              className="avatar-circle mx-auto mb-3"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #4a6048, #a4ada3)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "3rem",
              }}
            >
              🔧
            </div>
            <ThemedHeading level={2} color="success">
              {service.title}
            </ThemedHeading>
            <ThemedText color="success" bold size="large">
              ${service.price} {language === "ar" ? "للخدمة" : "per service"}
            </ThemedText>
          </div>

          <div className="mb-5">
            <ThemedHeading level={4} color="success">
              {language === "ar" ? "وصف الخدمة" : "Service Description"}
            </ThemedHeading>
            <ThemedText variant="muted">
              {service.description}
            </ThemedText>
          </div>

          {service.features && service.features.length > 0 && (
            <div className="mb-5">
              <ThemedHeading level={4} color="success">
                {language === "ar" ? "مميزات الخدمة" : "Service Features"}
              </ThemedHeading>
              <div className="features-grid">
                {service.features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    ✅ {feature}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card border-success mt-4 p-4 text-center" style={{ backgroundColor: "#fff7e9"}}>
            <ThemedHeading level={5} color="success">
              {language === "ar" ? "طلب هذه الخدمة" : "Request This Service"}
            </ThemedHeading>
            <ThemedText variant="muted">
              {language === "ar"
                ? "للحصول على هذه الخدمة، يرجى التواصل مع أحد أخصائيينا"
                : "To get this service, please contact one of our specialists"}
            </ThemedText>
            <Link to="/specialists">
              <ThemedButton color="success" fullWidth>
                {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
              </ThemedButton>
            </Link>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          ⚠️ {language === "ar" ? "الخدمة غير موجودة" : "Service not found"}
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
