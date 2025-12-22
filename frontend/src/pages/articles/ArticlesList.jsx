// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t, formatDate } from "../../utils/simpleTranslations";
// import axios from "axios";
// import LoadingSpinner from "../../components/LoadingSpinner";


// const ArticlesList = () => {
//   const [articles, setArticles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const { user } = useAuth();
//   const { language } = useSimpleLanguage();

//   useEffect(() => {
//     fetchArticles();
//   }, []);

//   const fetchArticles = async () => {
//     try {
//       const response = await axios.get("/api/articles");
//       if (response.data.success) {
//         setArticles(response.data.data || []);
//       } else {
//         setError("حدث خطأ أثناء تحميل المقالات");
//       }
//     } catch (err) {
//       console.error("Error fetching articles:", err);
//       setError("حدث خطأ أثناء تحميل المقالات");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) return <LoadingSpinner message="جاري التحميل..." />;

//   return (
//     <Container className="my-5">
//       <Row className="mb-4">
//         <Col>
//           <h2 className="fw-bold text-success">{t("articles.title", language)}</h2>
//           {/* <p className="text-muted">اطلع على أحدث المقالات والأبحاث في مجال الزراعة</p> */}
//           <p> {t("articles.subTitle", language)} </p>
//         </Col>
//         {user?.role === "specialist" && (
//           <Col xs="auto">
//             <Button as={Link} to="/articles/create" variant="success">
//               <i className="bi bi-plus-circle me-2"></i>
//               {t("articles.create", language)}
//             </Button>
//           </Col>
//         )}
//       </Row>

//       {error && <Alert variant="danger">{error}</Alert>}

//       <Row className="g-4">
//         {articles.map((article) => (
//           <Col key={article._id} md={6} lg={4}>
//             <Card className="h-100">
//               <Card.Body>
//                 <Card.Title>{article.title}</Card.Title>
//                 <Card.Text className="text-muted">{article.content.substring(0, 150)}...</Card.Text>
//               </Card.Body>
//               <Card.Footer>
//                 <div className="d-flex justify-content-between align-items-center">
//                   <small className="text-muted">{formatDate(article.createdAt, language)}</small>
//                   <Button as={Link} to={`/articles/${article._id}`} variant="outline-success" size="sm">
//                     {t("articles.readMore", language)}
//                   </Button>
//                 </div>
//               </Card.Footer>
//             </Card>
//           </Col>
//         ))}
//       </Row>

//       {articles.length === 0 && !loading && (
//         <Row>
//           <Col className="text-center py-5">
//             <i className="bi bi-journal-x" style={{ fontSize: "4rem", color: "#7d706cff" }}></i>
//             <h4 className="mt-3 text-muted">{t("articles.noArticles", language)}</h4>
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default ArticlesList;






import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t, formatDate } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import ThemedButton from "../../components/ThemedButton";
import ThemedText from "../../components/ThemedText";
import ThemedCard from "../../components/ThemedCard";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedContainer from "../../components/ThemedContainer";
import colors from "../../context/color";
import heroImg from "../../assets/img/wheat.jpg";



const ArticlesList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const { language } = useSimpleLanguage();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles");
      if (response.data.success) {
        setArticles(response.data.data || []);
      } else {
        setError("حدث خطأ أثناء تحميل المقالات");
      }
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("حدث خطأ أثناء تحميل المقالات");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner message="جاري التحميل..." />;

  return (
    <div style={{ padding: "40px" }}>
      {/* Header */}
            {/* <div
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(55, 55, 55, 0.4)), url(${heroImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: "30px",
                border: "none",
                marginTop: "40px",
                textAlign: "center",
                color: "#fff",
                width: "100%",
                height: "10%"
              }}
            >
              <ThemedHeading>{t("articles.title", language)}</ThemedHeading>
              <ThemedText>{t("articles.subTitle", language)}</ThemedText>
            </div> */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "30px" }}>
        <div style={{ textAlign: "center", margin: "0 auto" }}>
          <ThemedHeading>{t("articles.title", language)}</ThemedHeading>
          <ThemedText>{t("articles.subTitle", language)}</ThemedText>
        </div>
        {user?.role === "specialist" && (
          <Link
            to="/articles/create"
            style={{
              backgroundColor: "#2d5a27",
              color: "#fff",
              padding: "10px 16px",
              borderRadius: "6px",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1f3d1a")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2d5a27")}
          >
            ➕ {t("articles.create", language)}
          </Link>
        )}
      </div>

      {/* Error */}
      {error && (
        <div
          style={{
            backgroundColor: "#fff7e9",
            color: "#703030",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      {/* Articles Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "20px",
        }}
      >
        {articles.map((article) => (
          <div
            key={article._id}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.15)";
            }}
          >
            <div>
              <h2 style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "10px", color: colors.green}}>
                {article.title}
              </h2>
              <ThemedText>
                {article.content.substring(0, 150)}...
              </ThemedText>
            </div>
            <div
              style={{
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <small style={{ color: "#777" }}>{formatDate(article.createdAt, language)}</small>
              <Link
                to={`/articles/${article._id}`}
                style={{
                  backgroundColor: "#703030",
                  border: "1px solid #703030",
                  color: "#ffffff",
                  padding: "6px 12px",
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#ffffff";
                  e.currentTarget.style.color = "#703030";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#703030";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                {t("articles.readMore", language)}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* No Articles */}
      {articles.length === 0 && !loading && (
        <div style={{ textAlign: "center", padding: "50px 0" }}>
          <div style={{ fontSize: "4rem", color: "#7d706cff" }}>📕</div>
          <h4 style={{ marginTop: "20px", color: "#666" }}>{t("articles.noArticles", language)}</h4>
        </div>
      )}
    </div>
  );
};

export default ArticlesList;
