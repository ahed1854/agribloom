// import React from "react";
// import { Container, Row, Col } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { useSimpleLanguage } from "../context/SimpleLanguageContext";
// import { t } from "../utils/simpleTranslations";

// const Footer = () => {
//   const { language } = useSimpleLanguage();

//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="footer mt-5 py-4" dir={language === "ar" ? "rtl" : "ltr"}>
//       <Container className={`${language === "ar" ? "text-end" : "text-start"}`}>
//         <Row>
//           <Col md={6}>
//             <h5>منصة الاستشارات الزراعية</h5>
//             <p>{t("footer-desc", language)}</p>
//             <p>{t("footer.rights", language)}</p>
//           </Col>
//           <Col md={3}>
//             <h6>{t("footer-links", language)}</h6>
//             <ul className={`list-unstyled ${language === "ar" ? "text-end" : "text-start"}`}>
//               <li>
//                 <a href="/articles" className="text-white">
//                   {t("footer-link1", language)}
//                 </a>
//               </li>
//               <li>
//                 <a href="/specialists" className="text-white">
//                   {t("footer-link2", language)}
//                 </a>
//               </li>
//               <li>
//                 <a href="/services" className="text-white">
//                   {t("footer-link3", language)}
//                 </a>
//               </li>
//             </ul>
//           </Col>
//           <Col md={3}>
//             {/* <h6>اتصل بنا</h6> */}
//             <h6>{t("footer-contact", language)}</h6>
//             <p className="text-white">
//               <i className="bi bi-envelope me-2"></i>
//               info@agricultural.com
//             </p>
//           </Col>
//         </Row>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSimpleLanguage } from "../context/SimpleLanguageContext";
import { t } from "../utils/simpleTranslations";
import "../components/Footer.css";

import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const { language } = useSimpleLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer mt-5 py-4" dir={language === "ar" ? "rtl" : "ltr"}>
      <Container className={`${language === "ar" ? "text-end" : "text-start"}`}>
        <Row>
          <Col md={6}>
            <h5 style={{ fontSize: "24px", color: "#703030"}}>AgriBloom</h5>
            <p>{t("footer-desc", language)}</p>
            <p>{t("footer.rights", language)}</p>
          </Col>

          <Col md={3}>
            <h6 style={{ fontSize: "20px", color: "#703030"}}>{t("footer-links", language)}</h6>
            <ul style={{ listStyleType: "none"}}
              className={`list-unstyled ${
                language === "ar" ? "text-end" : "text-start"
              }`}
            >
              <li style={{ padding: "4px 0" }}>
                <a href="/articles" className="text-white" style={{textDecoration: "none"}}>
                  {t("footer-link1", language)}
                </a>
              </li>
              <li style={{ padding: "4px 0" }}>
                <a href="/specialists" className="text-white" style={{textDecoration: "none"}}>
                  {t("footer-link2", language)}
                </a>
              </li>
              <li style={{ padding: "4px 0" }}>
                <a href="/services" className="text-white" style={{textDecoration: "none"}}>
                  {t("footer-link3", language)}
                </a>
              </li>
            </ul>
          </Col>

          <Col md={3}>
            <h6 style={{ fontSize: "20px", color: "#703030"}}>{t("footer-contact", language)}</h6>
            <p className="text-white">
              <i className="bi bi-envelope me-2"></i>
              info@agricultural.com
            </p>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="social-icons d-flex gap-3 mt-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24}/>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24}/>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24}/>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={24}/>
              </a>
              <a href="https://wa.me/123456789" target="_blank" rel="noopener noreferrer">
                <FaWhatsapp size={24}/>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <FaYoutube size={24}/>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
