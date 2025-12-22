import React, { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Form, Button, Alert, Badge } from "react-bootstrap";
import { useParams, Link, useNavigate } from "react-router-dom";
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

const Chat = () => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { language } = useSimpleLanguage();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [consultation, setConsultation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [paymentRequired, setPaymentRequired] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!consultationId || consultationId === "undefined") {
      setError(language === "ar" ? "معرف الاستشارة غير صالح" : "Invalid consultation ID");
      setLoading(false);
      return;
    }

    if (!user) {
      navigate("/login");
      return;
    }

    fetchConsultation();
    fetchMessages();

    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, [consultationId, user, navigate, language]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchConsultation = async () => {
    try {
      if (user?.role === "user") {
        const response = await axios.get("/api/consultations/my-consultations");
        if (response.data && response.data.success) {
          const consultations = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          const foundConsultation = consultations.find((c) => c._id === consultationId);
          if (foundConsultation) {
            setConsultation(foundConsultation);
          } else {
            setError(
              language === "ar" ? "الاستشارة غير موجودة أو غير مصرح بها" : "Consultation not found or unauthorized"
            );
          }
        }
      } else if (user?.role === "specialist") {
        const response = await axios.get("/api/consultations/specialist-all-consultations");
        if (response.data && response.data.success) {
          const consultations = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          const foundConsultation = consultations.find((c) => c._id === consultationId);
          if (foundConsultation) {
            setConsultation(foundConsultation);
            if (!foundConsultation.payment?.paid) {
              setPaymentRequired(true);
              setError(
                language === "ar"
                  ? "لا يمكن إرسال رسائل حتى يتم دفع الاستشارة من قبل المستخدم"
                  : "Cannot send messages until user pays for consultation"
              );
            }
          } else {
            setError(
              language === "ar" ? "الاستشارة غير موجودة أو غير مصرح بها" : "Consultation not found or unauthorized"
            );
          }
        }
      }
    } catch (err) {
      console.error("Error fetching consultation:", err);
      setError(language === "ar" ? "حدث خطأ أثناء تحميل بيانات الاستشارة" : "Error loading consultation data");
    }
  };

  const fetchMessages = async () => {
    try {
      if (!consultationId || consultationId === "undefined") {
        setError(language === "ar" ? "معرف الاستشارة غير صالح" : "Invalid consultation ID");
        setLoading(false);
        return;
      }

      const response = await axios.get(`/api/messages/${consultationId}`);
      if (response.data && response.data.success) {
        const messagesData = response.data.data;
        setMessages(Array.isArray(messagesData) ? messagesData : []);
        setError("");
      } else {
        setError(
          response.data?.message || (language === "ar" ? "حدث خطأ أثناء تحميل الرسائل" : "Error loading messages")
        );
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      if (err.response?.status === 403) {
        const errorMsg = err.response.data?.message;
        setError(errorMsg);
        if (user?.role === "specialist" && errorMsg.includes("دفع")) {
          setPaymentRequired(true);
        }
      } else if (err.response?.status === 404) {
        setError(language === "ar" ? "غرفة المحادثة غير موجودة" : "Chat room not found");
      }
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    if (user?.role === "specialist" && !consultation?.payment?.paid) {
      setError(
        language === "ar"
          ? "لا يمكن إرسال رسائل حتى يتم دفع الاستشارة من قبل المستخدم"
          : "Cannot send messages until user pays for consultation"
      );
      return;
    }

    setSending(true);
    try {
      const response = await axios.post("/api/messages", {
        consultationId,
        text: newMessage,
      });

      if (response.data && response.data.success) {
        setMessages((prev) => [...prev, response.data.data]);
        setNewMessage("");
        setError("");
      } else {
        setError(
          response.data?.message || (language === "ar" ? "حدث خطأ أثناء إرسال الرسالة" : "Error sending message")
        );
      }
    } catch (err) {
      console.error("Error sending message:", err);
      const errorMsg =
        err.response?.data?.message || (language === "ar" ? "حدث خطأ أثناء إرسال الرسالة" : "Error sending message");
      setError(errorMsg);
      if (errorMsg.includes("دفع")) {
        setPaymentRequired(true);
      }
    } finally {
      setSending(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const locale = language === "ar" ? "ar-SA" : "en-US";
    return date.toLocaleTimeString(locale, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) return <LoadingSpinner message={language === "ar" ? "جاري تحميل المحادثة..." : "Loading chat..."} />;

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={8}>
          {/* <Button
            as={Link}
            to={user?.role === "specialist" ? "/specialist-consultations" : "/my-consultations"}
            variant="outline-secondary"
            className="mb-4"
          >
            <i className="bi bi-arrow-right me-2"></i>
            {t("btn.back", language)}
          </Button> */}
            <div style={{ margin: "20px" }}>
            <Link to={user?.role === "specialist" ? "/specialist-consultations" : "/my-consultations"}>
              <ThemedButton type="secondary">{t("btn.back", language)}</ThemedButton>
            </Link>
          </div>

          {user?.role === "specialist" && paymentRequired && (
            <Alert variant="warning" className="mb-4">
              <div className="d-flex align-items-center">
                <i className="bi bi-credit-card me-3" style={{ fontSize: "2rem" }}></i>
                <div>
                  <h5 className="mb-2">{language === "ar" ? "في انتظار الدفع" : "Waiting for Payment"}</h5>
                  <p className="mb-0">
                    {language === "ar"
                      ? "يمكنك رؤية رسائل المستخدم، ولكن لا يمكنك الرد حتى يقوم المستخدم بدفع قيمة الاستشارة."
                      : "You can see user messages, but cannot reply until the user pays for the consultation."}
                  </p>
                </div>
              </div>
            </Alert>
          )}

          {(!consultationId || consultationId === "undefined") && (
            <Alert variant="danger" className="mb-4">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error || (language === "ar" ? "معرف الاستشارة غير صالح" : "Invalid consultation ID")}
            </Alert>
          )}

          {consultationId && consultationId !== "undefined" && (
            <>
              <Card className="shadow">
                {/* <Card.Header
                  className={`${
                    paymentRequired ? "bg-warning text-dark" : "bg-success text-white"
                  } d-flex justify-content-between align-items-center`}
                  style={{background: "#4a6048 !important"}}
                > */}
                <Card.Header
                  className={`${
                    paymentRequired ? "text-dark" : "text-white"
                  } card-header-custom d-flex justify-content-between align-items-center`}
                >
                  <div style={{background: "#4a6048"}}>
                    <h5 className="mb-0">
                      <i className="bi bi-chat-dots me-2"></i>
                      {paymentRequired
                        ? language === "ar"
                          ? "استشارة قيد الانتظار للدفع"
                          : "Consultation Pending Payment"
                        : language === "ar"
                        ? "غرفة المحادثة"
                        : "Chat Room"}
                    </h5>
                    <small className="d-block mt-1">
                      {consultation?.specialistId?.username
                        ? language === "ar"
                          ? `أخصائي: ${consultation.specialistId.username}`
                          : `Specialist: ${consultation.specialistId.username}`
                        : consultation?.userId?.username
                        ? language === "ar"
                          ? `مستخدم: ${consultation.userId.username}`
                          : `User: ${consultation.userId.username}`
                        : ""}
                    </small>
                  </div>
                  <Badge bg={paymentRequired ? "warning" : "light"} text={paymentRequired ? "dark" : "success"}>
                    {paymentRequired
                      ? language === "ar"
                        ? "⚡ في انتظار الدفع"
                        : "⚡ Pending Payment"
                      : consultation?.status === "open"
                      ? language === "ar"
                        ? "مفتوحة"
                        : "Open"
                      : consultation?.status === "paid"
                      ? language === "ar"
                        ? "مدفوعة"
                        : "Paid"
                      : consultation?.status === "closed"
                      ? language === "ar"
                        ? "مغلقة"
                        : "Closed"
                      : language === "ar"
                      ? "غير معروفة"
                      : "Unknown"}
                  </Badge>
                </Card.Header>

                <Card.Body className="p-0">
                  {error && (
                    <Alert variant="danger" className="m-3 mb-0">
                      {error}
                    </Alert>
                  )}

                  <div className="chat-messages p-3" style={{ height: "400px", overflowY: "auto" }}>
                    {messages.length > 0 ? (
                      messages.map((message) => (
                        <div
                          key={message._id}
                          className={`d-flex mb-3 ${
                            message.senderType === user?.role ? "justify-content-end" : "justify-content-start"
                          }`}
                        >
                          <div
                            className={`message-bubble ${
                              message.senderType === user?.role ? "message-user" : "message-specialist"
                            }`}
                            style={{ maxWidth: "70%" }}
                          >
                            <div className="d-flex justify-content-between align-items-start mb-1">
                              <small className="fw-bold">
                                {message.senderId?.username || (language === "ar" ? "غير معروف" : "Unknown")}
                              </small>
                              <small className="text-muted" style={{ opacity: 0.8, fontSize: "0.75rem" }}>
                                {formatTime(message.timestamp)}
                              </small>
                            </div>
                            <div className="message-text">{message.text}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-muted py-5">
                        <i className="bi bi-chat-left" style={{ fontSize: "3rem" }}></i>
                        <p className="mt-3">{language === "ar" ? "لا توجد رسائل بعد" : "No messages yet"}</p>
                        <p>
                          {language === "ar"
                            ? "ابدأ المحادثة بإرسال رسالة..."
                            : "Start the conversation by sending a message..."}
                        </p>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="border-top p-3">
                    <Form onSubmit={handleSendMessage}>
                      <Row className="g-2 align-items-center">
                        <Col>
                          <Form.Control
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder={language === "ar" ? "اكتب رسالتك هنا..." : "Type your message here..."}
                            style={{border: "#4a6048", background: "#faf7f2ff"}}
                            disabled={
                              sending ||
                              consultation?.status === "closed" ||
                              (user?.role === "specialist" && !consultation?.payment?.paid)
                            }
                            className="border-success"
                          />
                        </Col>
                        <Col xs="auto">
                          <ThemedButton
                            type="submit"
                            variant="success"
                            disabled={
                              sending ||
                              !newMessage.trim() ||
                              consultation?.status === "closed" ||
                              (user?.role === "specialist" && !consultation?.payment?.paid)
                            }
                            className="px-4"
                          >
                            {sending ? (
                              <>
                                <span className="spinner-border spinner-border-sm me-2"></span>
                                {language === "ar" ? "جاري الإرسال..." : "Sending..."}
                              </>
                            ) : (
                              <>
                                <i className="bi bi-send me-2"></i>
                                {t("btn.send", language)}
                              </>
                            )}
                          </ThemedButton>
                        </Col>
                      </Row>
                      {consultation?.status === "closed" && (
                        <small className="text-muted d-block mt-2 text-center">
                          <i className="bi bi-info-circle me-1"></i>
                          {language === "ar"
                            ? "هذه الاستشارة مغلقة ولا يمكن إرسال رسائل جديدة"
                            : "This consultation is closed and no new messages can be sent"}
                        </small>
                      )}
                      {user?.role === "specialist" && !consultation?.payment?.paid && (
                        <small className="text-warning d-block mt-2 text-center">
                          <i className="bi bi-exclamation-triangle me-1"></i>
                          {language === "ar"
                            ? "لا يمكن إرسال رسائل حتى يتم دفع الاستشارة من قبل المستخدم"
                            : "Cannot send messages until user pays for consultation"}
                        </small>
                      )}
                    </Form>
                  </div>
                </Card.Body>
              </Card>

              {user?.role === "user" && consultation && !consultation?.payment?.paid && (
                <div className="mt-3">
                  <Card className="border-warning">
                    <Card.Body className="p-3">
                      <Row className="align-items-center">
                        <Col>
                          <div className="d-flex align-items-center">
                            <i
                              className="bi bi-exclamation-circle-fill text-warning me-2"
                              style={{ fontSize: "1.5rem" }}
                            ></i>
                            <div>
                              <h6 className="mb-1">{language === "ar" ? "💳 الدفع مطلوب" : "💳 Payment Required"}</h6>
                              <p className="mb-0 small text-muted">
                                {language === "ar"
                                  ? "يمكنك إرسال رسائل الآن. الأخصائي سيرى رسائلك ويتمكن من الرد بمجرد اكتمال الدفع."
                                  : "You can send messages now. The specialist will see your messages and can reply once payment is complete."}
                              </p>
                            </div>
                          </div>
                        </Col>
                        <Col xs="auto">
                          <Button as={Link} to={`/payment/instructions/${consultationId}`} variant="warning" size="sm">
                            <i className="bi bi-credit-card me-1"></i>
                            {language === "ar" ? "دفع الاستشارة" : "Pay Consultation"}
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Chat;
