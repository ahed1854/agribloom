// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Badge, Button, Alert } from "react-bootstrap";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const SpecialistDetail = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const { language } = useSimpleLanguage();
//   const [specialist, setSpecialist] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     fetchSpecialist();
//   }, [id]);

//   const fetchSpecialist = async () => {
//     try {
//       setError("");
//       const response = await axios.get(`/api/specialists/${id}`);

//       if (response.data && response.data.success) {
//         setSpecialist(response.data.data);
//       } else {
//         setError(
//           response.data?.message ||
//             (language === "ar" ? "حدث خطأ أثناء تحميل بيانات الأخصائي" : "Error loading specialist")
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching specialist:", err);
//       if (err.response?.status === 404) {
//         setError(language === "ar" ? "الأخصائي غير موجود" : "Specialist not found");
//         setTimeout(() => navigate("/specialists"), 2000);
//       } else {
//         setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRequestConsultation = () => {
//     if (!user) {
//       navigate("/login");
//       return;
//     }
//     navigate(`/consultations/create/${id}`);
//   };

//   if (loading)
//     return (
//       <LoadingSpinner message={language === "ar" ? "جاري تحميل بيانات الأخصائي..." : "Loading specialist data..."} />
//     );

//   return (
//     <Container className="my-5">
//       <Row className="mb-4">
//         <Col>
//           <Button as={Link} to="/specialists" variant="outline-secondary">
//             <i className="bi bi-arrow-right me-2"></i>
//             {t("btn.back", language)}
//           </Button>
//         </Col>
//       </Row>

//       {error ? (
//         <Alert variant="danger" className="mb-4">
//           <i className="bi bi-exclamation-triangle me-2"></i>
//           {error}
//         </Alert>
//       ) : specialist ? (
//         <>
//           <Row className="mb-4">
//             <Col lg={8}>
//               <Card className="border-0 shadow-sm">
//                 <Card.Body className="p-4">
//                   <div className="d-flex align-items-start">
//                     <div
//                       className="rounded-circle d-flex align-items-center justify-content-center me-4"
//                       style={{
//                         width: "100px",
//                         height: "100px",
//                         background: "linear-gradient(135deg, #28a745, #20c997)",
//                         color: "white",
//                       }}
//                     >
//                       <i className="bi bi-person-check" style={{ fontSize: "2.5rem" }}></i>
//                     </div>
//                     <div className="flex-grow-1">
//                       <h2 className="text-success mb-2">{specialist.username}</h2>
//                       <p className="text-muted mb-3">
//                         {language === "ar" ? "أخصائي زراعي متخصص" : "Agricultural Specialist"}
//                       </p>
//                       <div className="mb-3">
//                         {specialist.specialistProfile?.expertise?.map((skill, index) => (
//                           <Badge
//                             key={index}
//                             bg="light"
//                             text="success"
//                             className="me-2 mb-2 border border-success py-2 px-3"
//                           >
//                             {skill}
//                           </Badge>
//                         ))}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-4">
//                     <h5 className="text-success mb-3">
//                       {language === "ar" ? "نبذة عن الأخصائي" : "About the Specialist"}
//                     </h5>
//                     <p className="text-muted" style={{ lineHeight: "1.8" }}>
//                       {specialist.specialistProfile?.bio ||
//                         (language === "ar"
//                           ? "لا توجد نبذة متاحة عن هذا الأخصائي"
//                           : "No biography available for this specialist")}
//                     </p>
//                   </div>
//                 </Card.Body>
//               </Card>
//             </Col>

//             <Col lg={4}>
//               <Card className="border-success shadow-sm">
//                 <Card.Header className="bg-success text-white">
//                   <h5 className="mb-0">{language === "ar" ? "معلومات الاستشارة" : "Consultation Info"}</h5>
//                 </Card.Header>
//                 <Card.Body>
//                   <div className="mb-4">
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <span className="text-muted">{language === "ar" ? "سعر الاستشارة" : "Consultation Price"}</span>
//                       <span className="fw-bold text-success fs-4">${specialist.specialistProfile?.price || 0}</span>
//                     </div>
//                     <div className="d-flex justify-content-between align-items-center mb-3">
//                       <span className="text-muted">{language === "ar" ? "سنوات الخبرة" : "Years of Experience"}</span>
//                       <span className="fw-bold">{specialist.specialistProfile?.experienceYears || 0}</span>
//                     </div>
//                   </div>

//                   <Button
//                     variant="success"
//                     size="lg"
//                     className="w-100 py-2"
//                     onClick={handleRequestConsultation}
//                     disabled={user?.role !== "user"}
//                   >
//                     <i className="bi bi-calendar-plus me-2"></i>
//                     {user?.role === "user"
//                       ? language === "ar"
//                         ? "طلب استشارة"
//                         : "Request Consultation"
//                       : language === "ar"
//                       ? "متاح للمستخدمين فقط"
//                       : "Available for users only"}
//                   </Button>

//                   {!user && (
//                     <p className="text-muted text-center mt-3 small">
//                       {language === "ar"
//                         ? "يجب تسجيل الدخول لطلب استشارة"
//                         : "You must be logged in to request a consultation"}
//                     </p>
//                   )}
//                 </Card.Body>
//               </Card>
//             </Col>
//           </Row>
//         </>
//       ) : (
//         <Alert variant="warning">
//           <i className="bi bi-exclamation-triangle me-2"></i>
//           {language === "ar" ? "الأخصائي غير موجود" : "Specialist not found"}
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default SpecialistDetail;












import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedHeading from "../../components/ThemedHeading";

const SpecialistDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useSimpleLanguage();
  const [specialist, setSpecialist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchSpecialist();
  }, [id]);

  const fetchSpecialist = async () => {
    try {
      setError("");
      const response = await axios.get(`/api/specialists/${id}`);

      if (response.data && response.data.success) {
        setSpecialist(response.data.data);
      } else {
        setError(
          response.data?.message ||
            (language === "ar" ? "حدث خطأ أثناء تحميل بيانات الأخصائي" : "Error loading specialist")
        );
      }
    } catch (err) {
      console.error("Error fetching specialist:", err);
      if (err.response?.status === 404) {
        setError(language === "ar" ? "الأخصائي غير موجود" : "Specialist not found");
        setTimeout(() => navigate("/specialists"), 2000);
      } else {
        setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRequestConsultation = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/consultations/create/${id}`);
  };

  if (loading)
    return (
      <LoadingSpinner
        message={language === "ar" ? "جاري تحميل بيانات الأخصائي..." : "Loading specialist data..."}
      />
    );

  return (
    <div className="specialist-detail my-5">
      {/* زر العودة */}
      <div className="mb-4" style={{margin: "20px"}}>
        <Link to="/specialists">
          <ThemedButton color="secondary" outline>
            {t("btn.back", language)}
          </ThemedButton>
        </Link>
      </div>

      {/* خطأ */}
      {error ? (
        <div className="alert alert-danger mb-4">
          ⚠️ {error}
        </div>
      ) : specialist ? (
        <div className="detail-grid" style={{display: "flex", justifyContent: "space-evenly"}}>
          {/* القسم الأول */}
          <div className="detail-main">
            <div className="card shadow-sm p-4">
              <div className="flex items-start">
                <div
                  className="avatar-circle me-4"
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #4a6048, #cdd0cdff)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Image
                </div>
                <div className="flex-grow">
                  <ThemedHeading level={2} color="success">
                    {specialist.username}
                  </ThemedHeading>
                  <ThemedText variant="muted">
                    {language === "ar" ? "أخصائي زراعي متخصص" : "Agricultural Specialist"}
                  </ThemedText>

                  <div className="expertise-list mt-3">
                    {specialist.specialistProfile?.expertise?.map((skill, index) => (
                      <span key={index} className="badge badge-success me-2 mb-2">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <ThemedHeading level={5} color="success">
                  {language === "ar" ? "نبذة عن الأخصائي" : "About the Specialist"}
                </ThemedHeading>
                <ThemedText variant="muted">
                  {specialist.specialistProfile?.bio ||
                    (language === "ar"
                      ? "لا توجد نبذة متاحة عن هذا الأخصائي"
                      : "No biography available for this specialist")}
                </ThemedText>
              </div>
            </div>
          </div>

          {/* القسم الثاني */}
          <div className="detail-side">
            <div className="card border-success shadow-sm p-4">
              <ThemedHeading level={5} color="success">
                {language === "ar" ? "معلومات الاستشارة" : "Consultation Info"}
              </ThemedHeading>

              <div className="info-row mt-3">
                <ThemedText variant="muted">
                  {language === "ar" ? "سعر الاستشارة" : "Consultation Price"}
                </ThemedText>
                <ThemedText color="success" bold>
                  ${specialist.specialistProfile?.price || 0}
                </ThemedText>
              </div>

              <div className="info-row mt-3">
                <ThemedText variant="muted">
                  {language === "ar" ? "سنوات الخبرة" : "Years of Experience"}
                </ThemedText>
                <ThemedText bold>
                  {specialist.specialistProfile?.experienceYears || 0}
                </ThemedText>
              </div>

              <ThemedButton
                color="success"
                fullWidth
                onClick={handleRequestConsultation}
                disabled={user?.role !== "user"}
              >
                {user?.role === "user"
                  ? language === "ar"
                    ? "طلب استشارة"
                    : "Request Consultation"
                  : language === "ar"
                  ? "متاح للمستخدمين فقط"
                  : "Available for users only"}
              </ThemedButton>

              {!user && (
                <ThemedText variant="muted" size="small" className="text-center mt-3">
                  {language === "ar"
                    ? "يجب تسجيل الدخول لطلب استشارة"
                    : "You must be logged in to request a consultation"}
                </ThemedText>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="alert alert-warning">
          ⚠️ {language === "ar" ? "الأخصائي غير موجود" : "Specialist not found"}
        </div>
      )}
    </div>
  );
};

export default SpecialistDetail;
