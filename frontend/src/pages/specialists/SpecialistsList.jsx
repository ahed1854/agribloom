// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Badge, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const SpecialistsList = () => {
//   const [specialists, setSpecialists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { language } = useSimpleLanguage();

//   useEffect(() => {
//     fetchSpecialists();
//   }, []);

//   const fetchSpecialists = async () => {
//     try {
//       setError("");
//       const response = await axios.get("/api/specialists");

//       if (response.data && response.data.success) {
//         setSpecialists(Array.isArray(response.data.data) ? response.data.data : []);
//       } else {
//         setError(
//           response.data?.message ||
//             (language === "ar" ? "حدث خطأ أثناء تحميل قائمة الأخصائيين" : "Error loading specialists")
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching specialists:", err);
//       setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
//       setSpecialists([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading)
//     return <LoadingSpinner message={language === "ar" ? "جاري تحميل قائمة الأخصائيين..." : "Loading specialists..."} />;

//   return (
//     <Container className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold text-success">{t("specialists.title", language)}</h2>
//           <p className="text-muted">
//             {language === "ar"
//               ? "اختر من بين أفضل الأخصائيين الزراعيين للحصول على استشارة متخصصة"
//               : "Choose from the best agricultural specialists for expert consultation"}
//           </p>
//         </Col>
//       </Row>

//       {error && (
//         <Alert variant="danger" className="mb-4">
//           <i className="bi bi-exclamation-triangle me-2"></i>
//           {error}
//         </Alert>
//       )}

//       {!error && specialists.length > 0 ? (
//         <Row className="g-4">
//           {specialists.map((specialist) => {
//             const specialistId = specialist?._id || "";
//             const username = specialist?.username || (language === "ar" ? "غير معروف" : "Unknown");
//             const expertises = specialist?.specialistProfile?.expertise || [];
//             const bio =
//               specialist?.specialistProfile?.bio ||
//               (language === "ar" ? "لا توجد سيرة ذاتية متاحة" : "No bio available");
//             const experienceYears = specialist?.specialistProfile?.experienceYears || 0;
//             const price = specialist?.specialistProfile?.price || 0;

//             return (
//               <Col key={specialistId} md={6} lg={4}>
//                 <Card className="h-100 specialist-card shadow-sm">
//                   <Card.Body className="text-center d-flex flex-column">
//                     <div className="mb-3">
//                       <div
//                         className="rounded-circle mx-auto d-flex align-items-center justify-content-center"
//                         style={{
//                           width: "120px",
//                           height: "120px",
//                           background: "linear-gradient(135deg, #28a745, #20c997)",
//                           color: "white",
//                         }}
//                       >
//                         <i className="bi bi-person-check" style={{ fontSize: "3rem" }}></i>
//                       </div>
//                     </div>

//                     <Card.Title className="h5 text-success mb-3">{username}</Card.Title>

//                     <div className="mb-3 flex-grow-1">
//                       {expertises.length > 0 ? (
//                         <>
//                           {expertises.slice(0, 3).map((skill, index) => (
//                             <Badge
//                               key={index}
//                               bg="light"
//                               text="success"
//                               className="me-1 mb-1 border border-success"
//                               style={{ fontWeight: "normal" }}
//                             >
//                               {skill}
//                             </Badge>
//                           ))}
//                           {expertises.length > 3 && (
//                             <Badge
//                               bg="outline-success"
//                               text="success"
//                               className={`mb-1 ${language === "ar" ? "me-1" : "ms-1"}`}
//                             >
//                               +{expertises.length - 3} {language === "ar" ? "أكثر" : "more"}
//                             </Badge>
//                           )}
//                         </>
//                       ) : (
//                         <Badge bg="secondary" className="mb-1">
//                           {language === "ar" ? "بدون تخصصات" : "No specialties"}
//                         </Badge>
//                       )}
//                     </div>

//                     <Card.Text className="text-muted small mb-3" style={{ minHeight: "40px" }}>
//                       {bio.length > 100 ? `${bio.substring(0, 100)}...` : bio}
//                     </Card.Text>

//                     <div className="mt-auto">
//                       <div className="d-flex justify-content-between align-items-center mb-3">
//                         <div>
//                           <i className="bi bi-star-fill text-warning me-1"></i>
//                           <span className="fw-bold text-dark">
//                             {experienceYears} {language === "ar" ? "سنة خبرة" : "years experience"}
//                           </span>
//                         </div>
//                         <div className="text-success fw-bold">
//                           {price} $
//                           <small className="text-muted d-block">
//                             {language === "ar" ? "للاستشارة" : "per consultation"}
//                           </small>
//                         </div>
//                       </div>

//                       <Button
//                         as={Link}
//                         to={`/specialists/${specialistId}`}
//                         variant="success"
//                         className="w-100"
//                         disabled={!specialistId}
//                       >
//                         {language === "ar" ? (
//                           <>
//                             {language === "ar" ? "عرض الملف الشخصي" : "View Profile"}
//                             <i className="bi bi-person ms-2"></i>
//                           </>
//                         ) : (
//                           <>
//                             <i className="bi bi-person me-2"></i>
//                             {language === "ar" ? "عرض الملف الشخصي" : "View Profile"}
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
//                 <i className="bi bi-person-x text-muted" style={{ fontSize: "2.5rem" }}></i>
//               </div>
//               <h4 className="text-muted">{language === "ar" ? "لا توجد أخصائيين" : "No Specialists"}</h4>
//               <p className="text-muted">
//                 {language === "ar" ? "لم يتم تسجيل أي أخصائيين بعد" : "No specialists have registered yet"}
//               </p>
//               <Button variant="outline-success" className="mt-3" onClick={fetchSpecialists}>
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

// export default SpecialistsList;




import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";

// مكوناتك المخصصة
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedHeading from "../../components/ThemedHeading";

const SpecialistsList = () => {
  const [specialists, setSpecialists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { language } = useSimpleLanguage();

  useEffect(() => {
    fetchSpecialists();
  }, []);

  const fetchSpecialists = async () => {
    try {
      setError("");
      const response = await axios.get("/api/specialists");

      if (response.data && response.data.success) {
        setSpecialists(Array.isArray(response.data.data) ? response.data.data : []);
      } else {
        setError(
          response.data?.message ||
            (language === "ar"
              ? "حدث خطأ أثناء تحميل قائمة الأخصائيين"
              : "Error loading specialists")
        );
      }
    } catch (err) {
      console.error("Error fetching specialists:", err);
      setError(language === "ar" ? "حدث خطأ أثناء تحميل البيانات" : "Error loading data");
      setSpecialists([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <LoadingSpinner
        message={language === "ar" ? "جاري تحميل قائمة الأخصائيين..." : "Loading specialists..."}
      />
    );

  return (
    <div className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
      <div className="mb-4" style={{textAlign: "center"}}>
        <ThemedHeading level={2} color="success">
          {t("specialists.title", language)}
        </ThemedHeading>
        <ThemedText variant="muted">
          {language === "ar"
            ? "اختر من بين أفضل الأخصائيين الزراعيين للحصول على استشارة متخصصة"
            : "Choose from the best agricultural specialists for expert consultation"}
        </ThemedText>
      </div>

      {error && (
        <div className="alert alert-danger mb-4">
          <span>⚠️ {error}</span>
        </div>
      )}

      {!error && specialists.length > 0 ? (
        <div className="specialists-grid">
          {specialists.map((specialist) => {
            const specialistId = specialist?._id || "";
            const username = specialist?.username || (language === "ar" ? "غير معروف" : "Unknown");
            const expertises = specialist?.specialistProfile?.expertise || [];
            const bio =
              specialist?.specialistProfile?.bio ||
              (language === "ar" ? "لا توجد سيرة ذاتية متاحة" : "No bio available");
            const experienceYears = specialist?.specialistProfile?.experienceYears || 0;
            const price = specialist?.specialistProfile?.price || 0;

            return (
              <div key={specialistId} className="specialist-card">
                <div className="avatar">
                  <span role="img" aria-label="specialist">
                    👨‍🌾
                  </span>
                </div>

                <ThemedHeading level={5} color="success">
                  {username}
                </ThemedHeading>

                <div className="expertise-list">
                  {expertises.length > 0 ? (
                    <>
                      {expertises.slice(0, 3).map((skill, index) => (
                        <span key={index} className="badge badge-success">
                          {skill}
                        </span>
                      ))}
                      {expertises.length > 3 && (
                        <span className="badge badge-outline-success">
                          +{expertises.length - 3} {language === "ar" ? "أكثر" : "more"}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="badge badge-secondary">
                      {language === "ar" ? "بدون تخصصات" : "No specialties"}
                    </span>
                  )}
                </div>

                <ThemedText variant="muted" size="small">
                  {bio.length > 100 ? `${bio.substring(0, 100)}...` : bio}
                </ThemedText>

                <div className="info-row">
                  <ThemedText>
                    ⭐ {experienceYears} {language === "ar" ? "سنة خبرة" : "years experience"}
                  </ThemedText>
                  <ThemedText color="success" bold>
                    {price} $
                    <div className="small muted">
                      {language === "ar" ? "للاستشارة" : "per consultation"}
                    </div>
                  </ThemedText>
                </div>

                {/* <ThemedButton
                  as={Link}
                  to={`/specialists/${specialistId}`}
                  color="success"
                  fullWidth
                  disabled={!specialistId}
                >
                  {language === "ar" ? "عرض الملف الشخصي" : "View Profile"}
                </ThemedButton> */}
                <Link to={`/specialists/${specialistId}`}>
                  <ThemedButton color="success" fullWidth disabled={!specialistId}>
                    {language === "ar" ? "عرض الملف الشخصي" : "View Profile"}
                  </ThemedButton>
                </Link>
              </div>
            );
          })}
        </div>
      ) : (
        !error && (
          <div className="no-specialists text-center py-5">
            <div className="avatar-empty">🙅‍♂️</div>
            <ThemedHeading level={4} variant="muted">
              {language === "ar" ? "لا توجد أخصائيين" : "No Specialists"}
            </ThemedHeading>
            <ThemedText variant="muted">
              {language === "ar" ? "لم يتم تسجيل أي أخصائيين بعد" : "No specialists have registered yet"}
            </ThemedText>
            <ThemedButton color="success" outline onClick={fetchSpecialists}>
              🔄 {language === "ar" ? "إعادة المحاولة" : "Try Again"}
            </ThemedButton>
          </div>
        )
      )}
    </div>
  );
};

export default SpecialistsList;