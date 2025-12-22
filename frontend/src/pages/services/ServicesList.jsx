// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const ServicesList = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { language } = useSimpleLanguage();

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const fetchServices = async () => {
//     try {
//       setError("");
//       const response = await axios.get("/api/services");

//       if (response.data && response.data.success) {
//         setServices(Array.isArray(response.data.data) ? response.data.data : []);
//       } else {
//         setError(
//           response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل الخدمات" : "Error loading services")
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching services:", err);
//       setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
//       setServices([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSpinner message={language === "ar" ? "جاري تحميل الخدمات..." : "Loading services..."} />;

//   return (
//     <Container className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold text-success">{t("services.title", language)}</h2>
//           <p className="text-muted">
//             {language === "ar" ? "اكتشف خدماتنا الزراعية المتخصصة" : "Discover our specialized agricultural services"}
//           </p>
//         </Col>
//       </Row>

//       {error && (
//         <Alert variant="danger" className="mb-4">
//           <i className="bi bi-exclamation-triangle me-2"></i>
//           {error}
//         </Alert>
//       )}

//       {!error && services.length > 0 ? (
//         <Row className="g-4">
//           {services.map((service) => {
//             const serviceId = service?._id || "";
//             const title = service?.title || (language === "ar" ? "خدمة بدون عنوان" : "Untitled Service");
//             const description =
//               service?.description || (language === "ar" ? "لا يوجد وصف متاح" : "No description available");
//             const price = service?.price || 0;

//             return (
//               <Col key={serviceId} md={6} lg={4}>
//                 <Card className="h-100 service-card shadow-sm">
//                   <Card.Body className="d-flex flex-column">
//                     <div className="mb-3">
//                       <div
//                         className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
//                         style={{
//                           width: "80px",
//                           height: "80px",
//                           background: "linear-gradient(135deg, #28a745, #20c997)",
//                           color: "white",
//                         }}
//                       >
//                         <i className="bi bi-tools" style={{ fontSize: "2rem" }}></i>
//                       </div>
//                     </div>

//                     <Card.Title className="h5 text-success mb-3">{title}</Card.Title>

//                     <Card.Text className="text-muted small mb-3 flex-grow-1">
//                       {description.length > 100 ? `${description.substring(0, 100)}...` : description}
//                     </Card.Text>

//                     <div className="mt-auto">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div className="text-success fw-bold">
//                           {price} $
//                           <small className="text-muted d-block">{language === "ar" ? "للخدمة" : "per service"}</small>
//                         </div>
//                       </div>

//                       <Button
//                         as={Link}
//                         to={`/services/${serviceId}`}
//                         variant="outline-success"
//                         className="w-100"
//                         disabled={!serviceId}
//                       >
//                         {language === "ar" ? (
//                           <>
//                             {language === "ar" ? "عرض التفاصيل" : "View Details"}
//                             <i className="bi bi-info-circle ms-2"></i>
//                           </>
//                         ) : (
//                           <>
//                             <i className="bi bi-info-circle me-2"></i>
//                             {language === "ar" ? "عرض التفاصيل" : "View Details"}
//                           </>
//                         )}
//                       </Button>
//                     </div>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             );
//           })}
//         </Row>
//       ) : (
//         !error && (
//           <Row>
//             <Col className="text-center py-5">
//               <div
//                 className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4"
//                 style={{
//                   width: "100px",
//                   height: "100px",
//                   background: "#f8f9fa",
//                   border: "2px dashed #dee2e6",
//                 }}
//               >
//                 <i className="bi bi-tools text-muted" style={{ fontSize: "2.5rem" }}></i>
//               </div>
//               <h4 className="text-muted">{language === "ar" ? "لا توجد خدمات" : "No Services"}</h4>
//               <p className="text-muted">
//                 {language === "ar" ? "لم يتم إضافة أي خدمات بعد" : "No services have been added yet"}
//               </p>
//               <Button variant="outline-success" className="mt-3" onClick={fetchServices}>
//                 <i className="bi bi-arrow-clockwise me-2"></i>
//                 {language === "ar" ? "إعادة المحاولة" : "Try Again"}
//               </Button>
//             </Col>
//           </Row>
//         )
//       )}
//     </Container>
//   );
// };

// export default ServicesList;











import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

import ThemedButton from "../../components/ThemedButton";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedText from "../../components/ThemedText";

const ServicesList = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { language } = useSimpleLanguage();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setError("");
      const response = await axios.get("/api/services");

      if (response.data && response.data.success) {
        setServices(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        setError(
          response.data?.message ||
            (language === "ar" ? "حدث خطأ أثناء تحميل الخدمات" : "Error loading services")
        );
      }
    } catch (err) {
      console.error("Error fetching services:", err);
      setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <LoadingSpinner
        message={language === "ar" ? "جاري تحميل الخدمات..." : "Loading services..."}
      />
    );

  return (
    <div className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
      <div className="mb-4" style={{textAlign: "center"}}>
        <ThemedHeading level={2} color="success">
          {t("services.title", language)}
        </ThemedHeading>
        <ThemedText variant="muted">
          {language === "ar"
            ? "اكتشف خدماتنا الزراعية المتخصصة"
            : "Discover our specialized agricultural services"}
        </ThemedText>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">⚠️ {error}</div>
      )}

      {!error && services.length > 0 ? (
        <div className="services-grid">
          {services.map((service) => {
            const serviceId = service?._id || "";
            const title =
              service?.title || (language === "ar" ? "خدمة بدون عنوان" : "Untitled Service");
            const description =
              service?.description ||
              (language === "ar" ? "لا يوجد وصف متاح" : "No description available");
            const price = service?.price || 0;

            return (
              <div key={serviceId} className="service-card">
                <div className="avatar-circle">
                  🔧
                </div>

                <ThemedHeading level={4} color="success">
                  {title}
                </ThemedHeading>

                <ThemedText variant="muted" size="small">
                  {description.length > 100
                    ? `${description.substring(0, 100)}...`
                    : description}
                </ThemedText>

                <div className="info-row">
                  <ThemedText color="success" bold>
                    {price} $
                    <div className="small muted">
                      {language === "ar" ? "للخدمة" : "per service"}
                    </div>
                  </ThemedText>
                </div>

                <Link to={`/services/${serviceId}`}>
                  <ThemedButton
                    color="success"
                    outline
                    fullWidth
                    disabled={!serviceId}
                  >
                    {language === "ar" ? "عرض التفاصيل" : "View Details"}
                  </ThemedButton>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        !error && (
          <div className="no-services text-center py-5">
            <div className="avatar-empty">🔧</div>
            <ThemedHeading level={4} variant="muted">
              {language === "ar" ? "لا توجد خدمات" : "No Services"}
            </ThemedHeading>
            <ThemedText variant="muted">
              {language === "ar"
                ? "لم يتم إضافة أي خدمات بعد"
                : "No services have been added yet"}
            </ThemedText>
            <ThemedButton color="success" outline onClick={fetchServices}>
              🔄 {language === "ar" ? "إعادة المحاولة" : "Try Again"}
            </ThemedButton>
          </div>
        )
      )}
    </div>
  );
};

export default ServicesList;
