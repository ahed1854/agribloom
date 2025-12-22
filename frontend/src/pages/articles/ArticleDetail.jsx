
// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Badge, Button, Alert } from "react-bootstrap";
// import { useParams, Link } from "react-router-dom";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t, formatDate } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";

// const ArticleDetail = () => {
//   const { id } = useParams();
//   const [article, setArticle] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { language } = useSimpleLanguage();

//   useEffect(() => {
//     if (!id) {
//       setError(language === "ar" ? "معرف المقال غير صالح" : "Invalid article ID");
//       setLoading(false);
//       return;
//     }
//     fetchArticle();
//   }, [id, language]);

//   const fetchArticle = async () => {
//     try {
//       setError("");
//       const response = await axios.get(`/api/articles/${id}`);

//       if (response.data && response.data.success) {
//         setArticle(response.data.data);
//       } else {
//         setError(
//           response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل المقال" : "Error loading article")
//         );
//       }
//     } catch (err) {
//       console.error("Error fetching article:", err);
//       if (err.response?.status === 404) {
//         setError(language === "ar" ? "المقال غير موجود" : "Article not found");
//       } else {
//         setError(language === "ar" ? "حدث خطأ أثناء تحميل المقال" : "Error loading article");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSpinner message={language === "ar" ? "جاري تحميل المقال..." : "Loading article..."} />;

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col lg={8}>
//           <Button as={Link} to="/articles" variant="outline-secondary" className="mb-4">
//             <i className="bi bi-arrow-right me-2"></i>
//             {t("btn.back", language)}
//           </Button>

//           {error ? (
//             <Alert variant="danger">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {error}
//             </Alert>
//           ) : article ? (
//             <Card className="shadow border-0">
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between align-items-start mb-4">
//                   <Badge bg="success" className="fs-6 py-2 px-3">
//                     {article.category}
//                   </Badge>
//                   <small className="text-muted">{formatDate(article.createdAt, language)}</small>
//                 </div>

//                 <Card.Title className="h1 text-success mb-4">{article.title}</Card.Title>

//                 <Card.Text
//                   className="lead"
//                   style={{
//                     lineHeight: "1.8",
//                     fontSize: "1.1rem",
//                     whiteSpace: "pre-line",
//                   }}
//                 >
//                   {article.content}
//                 </Card.Text>

//                 <div className="border-top pt-4 mt-4">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div>
//                       <i className="bi bi-calendar3 text-success me-2"></i>
//                       <small className="text-muted">
//                         {language === "ar" ? "تاريخ النشر: " : "Published: "}
//                         {formatDate(article.createdAt, language)}
//                       </small>
//                     </div>
//                   </div>
//                 </div>
//               </Card.Body>
//             </Card>
//           ) : (
//             <Alert variant="warning">
//               <i className="bi bi-exclamation-triangle me-2"></i>
//               {language === "ar" ? "لم يتم العثور على المقال" : "Article not found"}
//             </Alert>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ArticleDetail;





import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t, formatDate } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedContainer from "../../components/ThemedContainer";
import colors from "../../context/color";

const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { language } = useSimpleLanguage();

  useEffect(() => {
    if (!id) {
      setError(language === "ar" ? "معرف المقال غير صالح" : "Invalid article ID");
      setLoading(false);
      return;
    }
    fetchArticle();
  }, [id, language]);

  const fetchArticle = async () => {
    try {
      setError("");
      const response = await axios.get(`/api/articles/${id}`);

      if (response.data && response.data.success) {
        setArticle(response.data.data);
      } else {
        setError(
          response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل المقال" : "Error loading article")
        );
      }
    } catch (err) {
      console.error("Error fetching article:", err);
      if (err.response?.status === 404) {
        setError(language === "ar" ? "المقال غير موجود" : "Article not found");
      } else {
        setError(language === "ar" ? "حدث خطأ أثناء تحميل المقال" : "Error loading article");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <LoadingSpinner message={language === "ar" ? "جاري تحميل المقال..." : "Loading article..."} />;

  return (
    <ThemedContainer>
      {/* Back Button */}
      <div style={{ margin: "20px" }}>
        <Link to="/articles">
          <ThemedButton type="secondary">{t("btn.back", language)}</ThemedButton>
        </Link>
      </div>

      {/* Error */}
      {error ? (
        <div
          style={{
            backgroundColor: "#fff7e9",
            color: "#703030",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          ⚠️ {error}
        </div>
      ) : article ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            padding: "30px",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "space-between" }}>
            <span
              style={{
                backgroundColor: "#4a6048",
                color: "#ffffff",
                padding: "6px 12px",
                borderRadius: "6px",
                fontSize: "0.9rem",
              }}
            >
              {article.category}
            </span>
            <small style={{ color: "#777" }}>{formatDate(article.createdAt, language)}</small>
          </div>

          {/* Title */}
          <ThemedHeading level={1} style={{ color: colors.green, marginBottom: "20px" }}>
            {article.title}
          </ThemedHeading>

          {/* Content */}
          {/* <ThemedText size="16px" style={{ lineHeight: "1.8", whiteSpace: "pre-line" }}>
            {article.content}
          </ThemedText> */}
          {article.content.split("\n").map((para, index) => (
          <p key={index} style={{ marginBottom: "1rem", lineHeight: "1.8" }}>
            {para}
          </p>
          ))}


          {/* Footer */}
          <div style={{ borderTop: "1px solid #ddd", marginTop: "30px", paddingTop: "15px" }}>
            <small style={{ color: "#777" }}>
              📅 {language === "ar" ? "تاريخ النشر: " : "Published: "} {formatDate(article.createdAt, language)}
            </small>
          </div>
        </div>
      ) : (
        <div
          style={{
            backgroundColor: "#fff7e9",
            color: "#856404",
            padding: "12px 16px",
            borderRadius: "6px",
          }}
        >
          ⚠️ {language === "ar" ? "لم يتم العثور على المقال" : "Article not found"}
        </div>
      )}
    </ThemedContainer>
  );
};

export default ArticleDetail;
