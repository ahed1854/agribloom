import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Badge, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t, formatDate } from "../../utils/simpleTranslations";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import colors from "../../context/color";
import ThemedButton from "../../components/ThemedButton";
import ThemedHeading from "../../components/ThemedHeading";
import ThemedText from "../../components/ThemedText";

const ConsultationsList = ({ specialistView = false }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { language } = useSimpleLanguage();
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        fetchConsultations();
    }, [user, specialistView, navigate]);

    const fetchConsultations = async () => {
        try {
            setError("");
            let endpoint;
            if (specialistView) {
                endpoint = "/api/consultations/specialist-all-consultations";
            } else {
                endpoint = "/api/consultations/my-consultations";
            }

            const response = await axios.get(endpoint);

            if (response.data && response.data.success) {
                const data = response.data.data;
                setConsultations(Array.isArray(data) ? data : []);
            } else {
                setError(
                    response.data?.message ||
                    (language === "ar" ? "حدث خطأ أثناء تحميل الاستشارات" : "Error loading consultations")
                );
            }
        } catch (err) {
            console.error("Error fetching consultations:", err);
            setError(language === "ar" ? "حدث خطأ أثناء تحميل الاستشارات" : "Error loading consultations");
        } finally {
            setLoading(false);
        }
    };

    const getStatusVariant = (status) => {
        switch (status) {
            case "open":
                return "warning";
            case "paid":
                return "success";
            case "closed":
                return "secondary";
            default:
                return "secondary";
        }
    };

    const getStatusText = (status) => {
        const statusMap =
            language === "ar"
                ? { open: "مفتوحة", paid: "مدفوعة", closed: "مغلقة" }
                : { open: "Open", paid: "Paid", closed: "Closed" };
        return statusMap[status] || status;
    };

    const handleUpdateStatus = async (consultationId, newStatus) => {
        try {
            await axios.put(`/api/consultations/${consultationId}/status`, { status: newStatus });
            fetchConsultations();
        } catch (error) {
            console.error("Error updating consultation status:", error);
            alert(language === "ar" ? "حدث خطأ أثناء تحديث حالة الاستشارة" : "Error updating consultation status");
        }
    };

    if (loading)
        return <LoadingSpinner message={language === "ar" ? "جاري تحميل الاستشارات..." : "Loading consultations..."} />;

    return (
        <Container className="my-5">
            <Row className="mb-4">
                <Col>
                    <ThemedHeading className="fw-bold text-success">
                        {specialistView
                            ? language === "ar"
                                ? "استشاراتي كمختص"
                                : "My Consultations as Specialist"
                            : t("consultations.title", language)}
                    </ThemedHeading>
                    <ThemedText className="text-muted">
                        {specialistView
                            ? language === "ar"
                                ? "إدارة استشارات العملاء والرد على استفساراتهم"
                                : "Manage client consultations and respond to inquiries"
                            : language === "ar"
                                ? "تابع استشاراتك مع الأخصائيين"
                                : "Track your consultations with specialists"}
                    </ThemedText>
                </Col>
                {!specialistView && (
                    <Col xs="auto">
                        {/* <Button as={Link} to="/specialists" variant="success">
                            <i className="bi bi-plus-circle me-2"></i>
                            {t("consultations.new", language)}
                        </Button> */}

                    <Link to="/specialists">
                    <ThemedButton className="me-2">
                        <i className="bi bi-plus-circle me-2"></i>
                        {t("consultations.new", language)}
                    </ThemedButton>
                    </Link>
                    </Col>
                )}
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}

            {consultations.length > 0 ? (
                <Row className="g-4">
                    {consultations.map((consultation) => {
                        const consultationId = consultation?._id || "";
                        const status = consultation?.status || "open";
                        const paymentPaid = consultation?.payment?.paid || false;
                        const createdAt = consultation?.createdAt ? new Date(consultation.createdAt) : new Date();

                        let otherPartyName = "";
                        if (specialistView) {
                            otherPartyName =
                                consultation?.userId?.username || (language === "ar" ? "مستخدم غير معروف" : "Unknown user");
                        } else {
                            otherPartyName =
                                consultation?.specialistId?.username || (language === "ar" ? "أخصائي غير معروف" : "Unknown specialist");
                        }

                        return (
                            <Col key={consultationId} lg={6}>
                                <Card className="h-100 shadow-sm border-0">
                                    <Card.Body className="d-flex flex-column">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <div>
                                                <Badge bg={paymentPaid ? "success" : "warning"} className="py-2 px-3 me-2">
                                                    {paymentPaid
                                                        ? language === "ar"
                                                            ? "✅ مدفوعة"
                                                            : "✅ Paid"
                                                        : language === "ar"
                                                            ? "⚡ بانتظار الدفع"
                                                            : "⚡ Pending Payment"}
                                                </Badge>
                                                <Badge bg={getStatusVariant(status)} className="py-2 px-3">
                                                    {getStatusText(status)}
                                                </Badge>
                                            </div>
                                            <small className="text-muted">{formatDate(createdAt, language)}</small>
                                        </div>

                                        <Card.Title className="h5 mb-3">
                                            {specialistView
                                                ? language === "ar"
                                                    ? `مستخدم: ${otherPartyName}`
                                                    : `User: ${otherPartyName}`
                                                : language === "ar"
                                                    ? `أخصائي: ${otherPartyName}`
                                                    : `Specialist: ${otherPartyName}`}
                                        </Card.Title>

                                        <div className="mb-3">
                                            <small className="text-muted">
                                                {paymentPaid
                                                    ? language === "ar"
                                                        ? "✅ يمكنك الرد على المستخدم"
                                                        : "✅ You can reply to the user"
                                                    : specialistView
                                                        ? language === "ar"
                                                            ? "⚡ يمكنك رؤية رسائل المستخدم، ولكن لا يمكنك الرد حتى يكمل الدفع"
                                                            : "⚡ You can see user messages, but cannot reply until payment"
                                                        : language === "ar"
                                                            ? "⚡ يمكنك إرسال رسائل الآن، الأخصائي سيرد بعد اكتمال الدفع"
                                                            : "⚡ You can send messages, specialist will reply after payment"}
                                            </small>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <Button
                                                    as={Link}
                                                    to={`/chat/${consultationId}`}
                                                    variant={paymentPaid ? "outline-success" : "outline-warning"}
                                                    size="sm"
                                                    disabled={!consultationId}
                                                >
                                                    <i className="bi bi-chat-dots me-2"></i>
                                                    {paymentPaid
                                                        ? language === "ar"
                                                            ? "الدخول للمحادثة"
                                                            : "Enter Chat"
                                                        : language === "ar"
                                                            ? "عرض الرسائل"
                                                            : "View Messages"}
                                                </Button>

                                                {specialistView && paymentPaid && status === "open" && (
                                                    <Button
                                                        variant="outline-secondary"
                                                        size="sm"
                                                        onClick={() => handleUpdateStatus(consultationId, "closed")}
                                                    >
                                                        {language === "ar" ? "إغلاق الاستشارة" : "Close Consultation"}
                                                    </Button>
                                                )}
                                            </div>

                                            {!paymentPaid && (
                                                <div className="mt-2">
                                                    <small className="text-warning">
                                                        <i className="bi bi-info-circle me-1"></i>
                                                        {specialistView
                                                            ? language === "ar"
                                                                ? "يمكنك رؤية رسائل المستخدم، ولكن لا يمكنك الرد حتى يكمل الدفع"
                                                                : "You can see user messages, but cannot reply until payment is complete"
                                                            : language === "ar"
                                                                ? "يمكنك إرسال رسائل الآن، الأخصائي سيرد بعد اكتمال الدفع"
                                                                : "You can send messages now, specialist will reply after payment"}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })}
                </Row>
            ) : (
                !error && (
                    <Row>
                        <Col className="text-center py-5">
                            <div
                                className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-4"
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    background: "#f8f9fa",
                                    border: "2px dashed #dee2e6",
                                }}
                            >
                                <i className="bi bi-chat-square-text text-muted" style={{ fontSize: "2.5rem" }}></i>
                            </div>
                            <h4 className="text-muted">{language === "ar" ? "لا توجد استشارات" : "No Consultations"}</h4>
                            <ThemedText className="text-muted">
                                {specialistView
                                    ? language === "ar"
                                        ? "لا توجد استشارات مطلوبة من العملاء بعد"
                                        : "No consultations requested by clients yet"
                                    : language === "ar"
                                        ? "لم تطلب أي استشارات بعد"
                                        : "You haven't requested any consultations yet"}
                            </ThemedText>
                            <div className="mt-3">
                                {!specialistView && (
                                    // <Button as={Link} to="/specialists" variant="success" className="me-2">
                                    //     {language === "ar" ? "اطلب استشارة جديدة" : "Request New Consultation"}
                                    // </Button>
                                    <Link to="/specialists">
                                    <ThemedButton className="me-2">
                                        {language === "ar" ? "اطلب استشارة جديدة" : "Request New Consultation"}
                                    </ThemedButton>
                                    </Link>
                                )}
                                {/* <Button variant="outline-success" onClick={fetchConsultations}>
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    {language === "ar" ? "إعادة التحميل" : "Reload"}
                                </Button> */}
                                <Button 
                                    onClick={fetchConsultations} 
                                    style={{background: "#fff", borderColor: "#703030", color: "#703030", margin: "10px" }}
                                    >
                                    <i className="bi bi-arrow-clockwise me-2"></i>
                                    {language === "ar" ? "إعادة التحميل" : "Reload"}
                                </Button>

                            </div>
                        </Col>
                    </Row>
                )
            )}
        </Container>
    );
};

export default ConsultationsList;







