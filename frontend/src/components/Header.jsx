import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// new
import { useSimpleLanguage } from "../context/SimpleLanguageContext";
import { t } from "../utils/simpleTranslations";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { language, toggleLanguage } = useSimpleLanguage();
  const [expanded, setExpanded] = useState(false);

  // Update document direction when language changes
  useEffect(() => {
    document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setExpanded(false);
  };

  return (
    <Navbar bg="success" variant="dark" expand="lg" expanded={expanded}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold fs-3">
          <i className="bi bi-tree me-2"></i>
          {t("app.name", language)}
        </Navbar.Brand>

        <Navbar.Toggle onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
              {t("nav.home", language)}
            </Nav.Link>

            <Nav.Link as={Link} to="/articles" onClick={() => setExpanded(false)}>
              {t("nav.articles", language)}
            </Nav.Link>

            <Nav.Link as={Link} to="/specialists" onClick={() => setExpanded(false)}>
              {t("nav.specialists", language)}
            </Nav.Link>

            <Nav.Link as={Link} to="/services" onClick={() => setExpanded(false)}>
              {t("nav.services", language)}
            </Nav.Link>

            {user && (
              <Nav.Link
                as={Link}
                to={user.role === "user" ? "/my-consultations" : "/specialist-consultations"}
                onClick={() => setExpanded(false)}
              >
                {t("nav.consultations", language)}
              </Nav.Link>
            )}
          </Nav>

          <Nav>
            {/* Language Switcher */}
            <Button variant="outline-light" className={language === "ar" ? "ms-3" : "me-3"} onClick={toggleLanguage}>
              {language === "ar" ? "English" : "العربية"}
            </Button>

            {/* Auth */}
            {user ? (
              <>
                <span className="nav-link text-light me-3">{user.username}</span>
                <Button variant="light" onClick={handleLogout}>
                  {t("nav.logout", language)}
                </Button>
              </>
            ) : (
              <>
                <Button as={Link} to="/login" variant="outline-light" className="me-2">
                  {t("nav.login", language)}
                </Button>
                <Button as={Link} to="/register" variant="light">
                  {t("nav.register", language)}
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;






// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { useSimpleLanguage } from "../context/SimpleLanguageContext";
// import { t } from "../utils/simpleTranslations";
// import ThemedButton from "../components/ThemedButton";
// import "../components/Header.css";

// const Header = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();
//   const { language, toggleLanguage } = useSimpleLanguage();
//   const [expanded, setExpanded] = useState(false);

//   useEffect(() => {
//     document.body.setAttribute("dir", language === "ar" ? "rtl" : "ltr");
//     document.documentElement.setAttribute("lang", language);
//   }, [language]);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//     setExpanded(false);
//   };

//   return (

//     <header className="navbar">
//       <div className="container">
//         {/* يمين: كلمة استشارات زراعية + الروابط */}
//         <div className="navbar-right">
//           <span className="brand-text">AgriBloom</span>
//           <nav className={`navbar-collapse ${expanded ? "show" : ""}`}>
//             <ul className="navbar-nav">
//               <li>
//                 <Link to="/" onClick={() => setExpanded(false)}>
//                   {t("nav.home", language)}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/articles" onClick={() => setExpanded(false)}>
//                   {t("nav.articles", language)}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/specialists" onClick={() => setExpanded(false)}>
//                   {t("nav.specialists", language)}
//                 </Link>
//               </li>
//               <li>
//                 <Link to="/services" onClick={() => setExpanded(false)}>
//                   {t("nav.services", language)}
//                 </Link>
//               </li>
//               {user && (
//                 <li>
//                   <Link
//                     to={
//                       user.role === "user"
//                         ? "/my-consultations"
//                         : "/specialist-consultations"
//                     }
//                     onClick={() => setExpanded(false)}
//                   >
//                     {t("nav.consultations", language)}
//                   </Link>
//                 </li>
//               )}
//             </ul>
//           </nav>
//         </div>

//         {/* يسار: الأزرار */}
//         <div className="navbar-actions">
//           <button
//   className="btn-outline-light"
//   onClick={toggleLanguage}
// >
//   {language === "ar" ? "English" : "العربية"}
// </button>

//           {user ? (
//             <>
//               <span className="nav-username">{user.username}</span>
//               <ThemedButton variant="light" onClick={handleLogout}>
//                 {t("nav.logout", language)}
//               </ThemedButton>
//             </>
//           ) : (
//             <>
//               <ThemedButton
//                 as={Link}
//                 to="/login"
//                 variant="outline-light"
//               >
//                 {t("nav.login", language)}
//               </ThemedButton>
//               <ThemedButton as={Link} to="/register" variant="light">
//                 {t("nav.register", language)}
//               </ThemedButton>
//             </>
//           )}
//         </div>
//       </div>
//     </header>
    
//   );
// };

// export default Header;