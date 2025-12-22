import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import axios from "axios";

const CreateArticle = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useSimpleLanguage();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await axios.post("/api/articles", formData);

      if (response.data && response.data.success) {
        setSuccess(language === "ar" ? "تم إنشاء المقال بنجاح!" : "Article created successfully!");
        setFormData({
          title: "",
          content: "",
          category: "",
        });

        setTimeout(() => {
          navigate("/articles");
        }, 2000);
      } else {
        setError(
          response.data?.message || (language === "ar" ? "حدث خطأ أثناء إنشاء المقال" : "Error creating article")
        );
      }
    } catch (err) {
      console.error("Error creating article:", err);
      setError(
        err.response?.data?.message || (language === "ar" ? "حدث خطأ أثناء إنشاء المقال" : "Error creating article")
      );
    } finally {
      setLoading(false);
    }
  };

  const categories =
    language === "ar"
      ? ["زراعة عامة", "الري والتسميد", "مكافحة الآفات", "تقنيات حديثة", "اقتصاد زراعي"]
      : [
          "General Agriculture",
          "Irrigation & Fertilization",
          "Pest Control",
          "Modern Techniques",
          "Agricultural Economy",
        ];

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          <Button as={Link} to="/articles" variant="outline-secondary" className="mb-4">
            <i className="bi bi-arrow-right me-2"></i>
            {t("btn.back", language)}
          </Button>

          <Card className="shadow">
            <Card.Header className="bg-success text-white">
              <h4 className="mb-0">
                <i className="bi bi-journal-plus me-2"></i>
                {t("articles.create", language)}
              </h4>
            </Card.Header>
            <Card.Body className="p-4">
              {error && (
                <Alert variant="danger">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </Alert>
              )}

              {success && (
                <Alert variant="success">
                  <i className="bi bi-check-circle me-2"></i>
                  {success}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>{language === "ar" ? "عنوان المقال" : "Article Title"}</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={language === "ar" ? "أدخل عنوان المقال" : "Enter article title"}
                    required
                    className="border-success"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>{language === "ar" ? "التصنيف" : "Category"}</Form.Label>
                  <Form.Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="border-success"
                  >
                    <option value="">{language === "ar" ? "اختر تصنيف المقال" : "Select category"}</option>
                    {categories.map((category, index) => (
                      <option key={index} value={category}>
                        {category}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>{language === "ar" ? "محتوى المقال" : "Article Content"}</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    placeholder={language === "ar" ? "أدخل محتوى المقال هنا..." : "Enter article content here..."}
                    rows={10}
                    required
                    className="border-success"
                    style={{ minHeight: "200px" }}
                  />
                  <Form.Text className="text-muted">
                    {language === "ar" ? "سيتم عرض المقال كما تكتبه" : "The article will be displayed as you write it"}
                  </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-between">
                  <Button as={Link} to="/articles" variant="outline-secondary" disabled={loading}>
                    {t("btn.cancel", language)}
                  </Button>
                  <Button type="submit" variant="success" disabled={loading} className="px-4">
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        {language === "ar" ? "جاري النشر..." : "Publishing..."}
                      </>
                    ) : (
                      <>
                        <i className="bi bi-journal-check me-2"></i>
                        {language === "ar" ? "نشر المقال" : "Publish Article"}
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateArticle;
