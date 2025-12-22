// import React from "react";
// import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSimpleLanguage } from "../context/SimpleLanguageContext";
// import { t } from "../utils/simpleTranslations";
// import ThemedButton from "../components/ThemedButton";
// import colors from "../context/color";

// const Home = () => {
//   const { language } = useSimpleLanguage();

//   return (
//     <Container className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
//       {/* Hero Section */}
//       <Row className="align-items-center mb-5">
//         <Col lg={6} className="mb-4 mb-lg-0">
//           <h1 className="display-4 fw-bold text-success mb-3">
//             {language === "ar" ? "منصة الاستشارات الزراعية" : "Agricultural Consultation Platform"}
//           </h1>
//           <p className="lead text-muted mb-4">
//             {language === "ar"
//               ? "تواصل مع أفضل الخبراء والمتخصصين في المجال الزراعي للحصول على استشارات متخصصة وحلول عملية لمشاكلك الزراعية."
//               : "Connect with the best experts and specialists in the agricultural field to get specialized consultations and practical solutions for your agricultural problems."}
//           </p>
//           <div className="d-flex gap-3">
//             <Button as={Link} to="/specialists" variant="success" size="lg">
//               {language === "ar" ? (
//                 <>
//                   {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
//                   <i className="bi bi-person ms-2"></i>
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-person me-2"></i>
//                   {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
//                 </>
//               )}
//             </Button>
//             <Button as={Link} to="/articles" variant="outline-success" size="lg">
//               {language === "ar" ? (
//                 <>
//                   {language === "ar" ? "قراءة المقالات" : "Read Articles"}
//                   <i className="bi bi-journal-text ms-2"></i>
//                 </>
//               ) : (
//                 <>
//                   <i className="bi bi-journal-text me-2"></i>
//                   {language === "ar" ? "قراءة المقالات" : "Read Articles"}
//                 </>
//               )}
//             </Button>
//           </div>
//         </Col>
//         <Col lg={6}>
//           <div className="position-relative">
//             <img
//               src="/images/agriculture-hero.jpg"
//               alt={language === "ar" ? "زراعة" : "Agriculture"}
//               className="img-fluid rounded shadow"
//             />
//           </div>
//         </Col>
//       </Row>

//       {/* Features Section */}
//       <Row className="mb-5">
//         <Col>
//           <h2 className="text-center text-success mb-4">
//             {language === "ar" ? "لماذا تختار منصتنا؟" : "Why Choose Our Platform?"}
//           </h2>
//         </Col>
//       </Row>
//       <Row className="g-4 mb-5">
//         <Col md={4}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center p-4">
//               <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
//                 <i className="bi bi-person-check text-success" style={{ fontSize: "2rem" }}></i>
//               </div>
//               <Card.Title className="h5 mb-3">
//                 {language === "ar" ? "أخصائيون معتمدون" : "Certified Specialists"}
//               </Card.Title>
//               <Card.Text className="text-muted">
//                 {language === "ar"
//                   ? "تحدث مع أخصائيين زراعيين معتمدين ذوي خبرة واسعة في مختلف المجالات الزراعية."
//                   : "Talk with certified agricultural specialists with extensive experience in various agricultural fields."}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center p-4">
//               <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
//                 <i className="bi bi-chat-dots text-success" style={{ fontSize: "2rem" }}></i>
//               </div>
//               <Card.Title className="h5 mb-3">
//                 {language === "ar" ? "استشارات مباشرة" : "Direct Consultations"}
//               </Card.Title>
//               <Card.Text className="text-muted">
//                 {language === "ar"
//                   ? "تواصل مباشر مع الأخصائيين عبر نظام محادثة آمن وسهل الاستخدام."
//                   : "Direct communication with specialists through a secure and easy-to-use chat system."}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={4}>
//           <Card className="h-100 border-0 shadow-sm">
//             <Card.Body className="text-center p-4">
//               <div className="bg-success bg-opacity-10 rounded-circle d-inline-flex p-3 mb-3">
//                 <i className="bi bi-journal-text text-success" style={{ fontSize: "2rem" }}></i>
//               </div>
//               <Card.Title className="h5 mb-3">{language === "ar" ? "معرفة مجانية" : "Free Knowledge"}</Card.Title>
//               <Card.Text className="text-muted">
//                 {language === "ar"
//                   ? "تصفح مكتبتنا من المقالات والموارد الزراعية المجانية."
//                   : "Browse our library of free agricultural articles and resources."}
//               </Card.Text>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       {/* CTA Section */}
//       <Row className="bg-light rounded p-5 align-items-center">
//         <Col lg={8}>
//           <h3 className="text-success mb-3">
//             {language === "ar" ? "ابدأ رحلتك الزراعية معنا اليوم" : "Start Your Agricultural Journey With Us Today"}
//           </h3>
//           <p className="text-muted mb-0">
//             {language === "ar"
//               ? "انضم إلى مجتمعنا الزراعي واحصل على الدعم والاستشارات التي تحتاجها لنجاح مشروعك الزراعي."
//               : "Join our agricultural community and get the support and consultations you need for your agricultural project success."}
//           </p>
//         </Col>
//         <Col lg={4} className="text-center">
//           <Button as={Link} to="/register" variant="success" size="lg" className="px-4">
//             {language === "ar" ? (
//               <>
//                 {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
//                 <i className="bi bi-person-plus ms-2"></i>
//               </>
//             ) : (
//               <>
//                 <i className="bi bi-person-plus me-2"></i>
//                 {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
//               </>
//             )}
//           </Button>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Home;






// Home.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { useSimpleLanguage } from "../context/SimpleLanguageContext";
// import ThemedButton from "../components/ThemedButton";
// import ThemedText from "../components/ThemedText";
// import ThemedCard from "../components/ThemedCard";
// import ThemedHeading from "../components/ThemedHeading";
// import ThemedContainer from "../components/ThemedContainer";
// import colors from "../context/color";

// const Home = () => {
//   const { language } = useSimpleLanguage();

//   return (
//     <ThemedContainer>
//       {/* Hero Section */}
//       <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
//         <div style={{ flex: 1, paddingRight: "20px" }}>
//           <ThemedHeading level={1}>
//             {language === "ar" ? "منصة الاستشارات الزراعية" : "Agricultural Consultation Platform"}
//           </ThemedHeading>
//           <ThemedText size="18px">
//             {language === "ar"
//               ? "تواصل مع أفضل الخبراء والمتخصصين في المجال الزراعي للحصول على استشارات متخصصة وحلول عملية لمشاكلك الزراعية."
//               : "Connect with the best experts and specialists in the agricultural field to get specialized consultations and practical solutions for your agricultural problems."}
//           </ThemedText>
//           <div style={{ display: "flex", gap: "15px", marginTop: "20px" }}>
//             <Link to="/specialists">
//               <ThemedButton type="primary">
//                 {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
//               </ThemedButton>
//             </Link>
//             <Link to="/articles">
//               <ThemedButton type="secondary">
//                 {language === "ar" ? "قراءة المقالات" : "Read Articles"}
//               </ThemedButton>
//             </Link>
//           </div>
//         </div>
//         <div style={{ flex: 1 }}>
//           <img
//             src="/images/agriculture-hero.jpg"
//             alt={language === "ar" ? "زراعة" : "Agriculture"}
//             style={{ width: "100%", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
//           />
//         </div>
//       </div>

//       {/* Features Section */}
//       <ThemedHeading level={2}>
//         {language === "ar" ? "لماذا تختار منصتنا؟" : "Why Choose Our Platform?"}
//       </ThemedHeading>
//       <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
//         <ThemedCard title={language === "ar" ? "أخصائيون معتمدون" : "Certified Specialists"}>
//           <ThemedText>
//             {language === "ar"
//               ? "تحدث مع أخصائيين زراعيين معتمدين ذوي خبرة واسعة في مختلف المجالات الزراعية."
//               : "Talk with certified agricultural specialists with extensive experience in various agricultural fields."}
//           </ThemedText>
//         </ThemedCard>

//         <ThemedCard title={language === "ar" ? "استشارات مباشرة" : "Direct Consultations"}>
//           <ThemedText>
//             {language === "ar"
//               ? "تواصل مباشر مع الأخصائيين عبر نظام محادثة آمن وسهل الاستخدام."
//               : "Direct communication with specialists through a secure and easy-to-use chat system."}
//           </ThemedText>
//         </ThemedCard>

//         <ThemedCard title={language === "ar" ? "معرفة مجانية" : "Free Knowledge"}>
//           <ThemedText>
//             {language === "ar"
//               ? "تصفح مكتبتنا من المقالات والموارد الزراعية المجانية."
//               : "Browse our library of free agricultural articles and resources."}
//           </ThemedText>
//         </ThemedCard>
//       </div>

//       {/* CTA Section */}
//       <div style={{ backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "8px", marginTop: "40px" }}>
//         <ThemedHeading level={3}>
//           {language === "ar" ? "ابدأ رحلتك الزراعية معنا اليوم" : "Start Your Agricultural Journey With Us Today"}
//         </ThemedHeading>
//         <ThemedText>
//           {language === "ar"
//             ? "انضم إلى مجتمعنا الزراعي واحصل على الدعم والاستشارات التي تحتاجها لنجاح مشروعك الزراعي."
//             : "Join our agricultural community and get the support and consultations you need for your agricultural project success."}
//         </ThemedText>
//         <Link to="/register">
//           <ThemedButton type="primary">
//             {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
//           </ThemedButton>
//         </Link>
//       </div>
//     </ThemedContainer>
//   );
// };

// export default Home;






// Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "../context/SimpleLanguageContext";
import ThemedButton from "../components/ThemedButton";
import ThemedText from "../components/ThemedText";
import ThemedCard from "../components/ThemedCard";
import ThemedHeading from "../components/ThemedHeading";
import ThemedContainer from "../components/ThemedContainer";
import colors from "../context/color";
import Carousel from "react-bootstrap/Carousel";
import a1 from "../assets/img/a1.jpg";
import a2 from "../assets/img/a2.jpg";
import a3 from "../assets/img/a3.jpg";
import heroImg from "../assets/img/wheat.jpg";
import "../components/CarouselOverlay.css";
import Buttonnice from "../components/Buttonnice";

const Home = () => {
  const { language } = useSimpleLanguage();

  return (
    <ThemedContainer>
      {/* Carousel Section */}
      <div className="container-fluid p-0" style={{ marginBottom: "40px" }}>
        <Carousel>
          <Carousel.Item>
            <img src={a1} className="d-block w-100 caroimg" alt="slide1" />
            <div className="overlay-box top-left">“Sustainable fields, thriving yields”</div>
          </Carousel.Item>
          <Carousel.Item>
            <img src={a2} className="d-block w-100 caroimg" alt="slide2" />
            <div className="overlay-box bottom-right">“Guiding farmers, growing futures”</div>
          </Carousel.Item>
          <Carousel.Item>
            <img src={a3} className="d-block w-100 caroimg" alt="slide3" />
            <div className="overlay-box center">“Rooted in Nature, Growing Together”</div>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Hero Section */}
      <div style={{ display: "flex",justifyContent: "center", alignItems: "center", marginBottom: "40px", textAlign: "center" }}>
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <ThemedHeading level={1}>
            {language === "ar" ? "منصة الاستشارات الزراعية" : "Agricultural Consultation Platform"}
          </ThemedHeading>
          <ThemedText size="18px">
            {language === "ar"
              ? "تواصل مع أفضل الخبراء والمتخصصين في المجال الزراعي للحصول على استشارات متخصصة وحلول عملية لمشاكلك الزراعية."
              : "Connect with the best experts and specialists in the agricultural field to get specialized consultations and practical solutions for your agricultural problems."}
          </ThemedText>
          <div style={{ display: "flex", gap: "15px", marginTop: "20px", justifyContent: "center" }}>
            <Link to="/specialists">
              <ThemedButton type="primary">
                {language === "ar" ? "عرض الأخصائيين" : "View Specialists"}
              </ThemedButton>
            </Link>
            <Link to="/articles">
              <ThemedButton type="secondary">
                {language === "ar" ? "قراءة المقالات" : "Read Articles"}
              </ThemedButton>
            </Link>
          </div>
        </div>
        {/* <div style={{ flex: 1 }}>
          <img
            src="/images/agriculture-hero.jpg"
            alt={language === "ar" ? "زراعة" : "Agriculture"}
            style={{ width: "100%", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0,0,0,0.2)" }}
          />
        </div> */}
      </div>

      {/* Features Section */}
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", justifyContent: "center" }}>
        <ThemedHeading level={2} >
        {language === "ar" ? "لماذا تختار منصتنا؟" : "Why Choose Our Platform?"}
      </ThemedHeading>
      </div>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px", justifyContent: "center" }}>
        <ThemedCard title={language === "ar" ? "أخصائيون معتمدون" : "Certified Specialists"}>
          <ThemedText>
            {language === "ar"
              ? "تحدث مع أخصائيين زراعيين معتمدين ذوي خبرة واسعة في مختلف المجالات الزراعية."
              : "Talk with certified agricultural specialists with extensive experience in various agricultural fields."}
          </ThemedText>
        </ThemedCard>

        <ThemedCard title={language === "ar" ? "استشارات مباشرة" : "Direct Consultations"}>
          <ThemedText>
            {language === "ar"
              ? "تواصل مباشر مع الأخصائيين عبر نظام محادثة آمن وسهل الاستخدام."
              : "Direct communication with specialists through a secure and easy-to-use chat system."}
          </ThemedText>
        </ThemedCard>

        <ThemedCard title={language === "ar" ? "معرفة مجانية" : "Free Knowledge"}>
          <ThemedText>
            {language === "ar"
              ? "تصفح مكتبتنا من المقالات والموارد الزراعية المجانية."
              : "Browse our library of free agricultural articles and resources."}
          </ThemedText>
        </ThemedCard>
      </div>

      {/* CTA Section */}
      {/* <div style={{ backgroundColor: "#ffffff", padding: "30px", borderRadius: "8px", marginTop: "40px", textAlign: "center" }}>
        <ThemedHeading level={3}>
          {language === "ar" ? "ابدأ رحلتك الزراعية معنا اليوم" : "Start Your Agricultural Journey With Us Today"}
        </ThemedHeading>
        <ThemedText>
          {language === "ar"
            ? "انضم إلى مجتمعنا الزراعي واحصل على الدعم والاستشارات التي تحتاجها لنجاح مشروعك الزراعي."
            : "Join our agricultural community and get the support and consultations you need for your agricultural project success."}
        </ThemedText>
        <Link to="/register">
          <ThemedButton type="primary">
            {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
          </ThemedButton>
        </Link>
      </div> */}
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5), rgba(0,0,0,0.4)), url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "30px",
          border: "none",
          marginTop: "40px",
          textAlign: "center",
          color: "#fff"
        }}
      >
  <ThemedHeading level={3}>
    {language === "ar" ? "ابدأ رحلتك الزراعية معنا اليوم" : "Start Your Agricultural Journey With Us Today"}
  </ThemedHeading>
  <ThemedText>
    {language === "ar"
      ? "انضم إلى مجتمعنا الزراعي واحصل على الدعم والاستشارات التي تحتاجها لنجاح مشروعك الزراعي."
      : "Join our agricultural community and get the support and consultations you need for your agricultural project success."}
  </ThemedText>
  <Link to="/register">
    <Buttonnice type="primary">
      {language === "ar" ? "انضم إلينا الآن" : "Join Us Now"}
    </Buttonnice>
  </Link>
</div>




    </ThemedContainer>
  );
};

export default Home;
