// import React, { useState } from "react";
// import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();
//   const { language } = useSimpleLanguage();

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const result = await login(formData.email, formData.password);
//       if (result.success) {
//         navigate("/");
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError(language === "ar" ? "حدث خطأ أثناء تسجيل الدخول" : "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="my-5">
//       <Row className="justify-content-center">
//         <Col md={6} lg={5}>
//           <Card className="shadow border-0">
//             <Card.Body className="p-4">
//               <div className="text-center mb-4">
//                 <h2 className="text-success">{t("auth.login", language)}</h2>
//                 <p className="text-muted">
//                   {language === "ar" ? "سجل دخولك للوصول إلى حسابك" : "Sign in to access your account"}
//                 </p>
//               </div>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>{t("auth.email", language)}</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     required
//                     className="border-success"
//                     placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "Enter your email"}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>{t("auth.password", language)}</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="border-success"
//                     placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter your password"}
//                   />
//                 </Form.Group>

//                 <Button type="submit" variant="success" disabled={loading} className="w-100 py-2">
//                   {loading ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2"></span>
//                       {language === "ar" ? "جاري تسجيل الدخول..." : "Signing in..."}
//                     </>
//                   ) : (
//                     t("auth.login", language)
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-4">
//                 <p className="text-muted">
//                   {language === "ar" ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
//                   <Link to="/register" className="text-success text-decoration-none">
//                     {t("nav.register", language)}
//                   </Link>
//                 </p>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default Login;

// import React from 'react';
// import styled from 'styled-components';

// const Login = () => {
//   return (
//     <StyledWrapper>
//       <div className="container">
//         <div className="heading">Login</div>
//         <form action className="form">
//           <input required className="input" type="email" name="email" id="email" placeholder="E-mail" />
//           <input required className="input" type="password" name="password" id="password" placeholder="Password" />
//           <span className="forgot-password"><a href="#">Forgot Password ?</a></span>
//           <input className="login-button" type="submit" defaultValue="Sign In" />
//         </form>
//         <div className="social-account-container">
//           <span className="title">Or Sign in with</span>
//           <div className="social-accounts">
//             <button className="social-button google">
//               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
//                 <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
//               </svg></button>
//             <button className="social-button apple">
//               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
//                 <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
//               </svg>
//             </button>
//             <button className="social-button twitter">
//               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
//                 <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
//               </svg>
//             </button>
//           </div>
//         </div>
//         <span className="agreement"><a href="#">Learn user licence agreement</a></span>
//       </div>
//     </StyledWrapper>
//   );
// }

// const StyledWrapper = styled.div`
//   .container {
//     max-width: 350px;
//     background: #fff7e9;
//     background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
//     border-radius: 40px;
//     padding: 25px 35px;
//     border: 2px solid rgb(255, 255, 255);
//     box-shadow: #703030 0px 30px 30px -20px;
//     margin: 20px;
//   }

//   .heading {
//     text-align: center;
//     font-weight: 900;
//     font-size: 30px;
//     color: #4a6048;
//   }

//   .form {
//     margin-top: 20px;
//   }

//   .form .input {
//     width: 100%;
//     background: white;
//     border: none;
//     padding: 15px 20px;
//     border-radius: 20px;
//     margin-top: 15px;
//     box-shadow: #4a6048 0px 10px 10px -5px;
//     border-inline: 2px solid transparent;
//   }

//   .form .input::-moz-placeholder {
//     color: rgb(170, 170, 170);
//   }

//   .form .input::placeholder {
//     color: rgb(170, 170, 170);
//   }

//   .form .input:focus {
//     outline: none;
//     border-inline: 2px solid #4a6048;
//   }

//   .form .forgot-password {
//     display: block;
//     margin-top: 10px;
//     margin-left: 10px;
//   }

//   .form .forgot-password a {
//     font-size: 11px;
//     color: #4a6048;
//     text-decoration: none;
//   }

//   .form .login-button {
//     display: block;
//     width: 100%;
//     font-weight: bold;
//     background: linear-gradient(45deg, #703030 0%, #703030 100%);
//     color: white;
//     padding-block: 15px;
//     margin: 20px auto;
//     border-radius: 20px;
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 20px 10px -15px;
//     border: none;
//     transition: all 0.2s ease-in-out;
//   }

//   .form .login-button:hover {
//     transform: scale(1.03);
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 23px 10px -20px;
//   }

//   .form .login-button:active {
//     transform: scale(0.95);
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 15px 10px -10px;
//   }

//   .social-account-container {
//     margin-top: 25px;
//   }

//   .social-account-container .title {
//     display: block;
//     text-align: center;
//     font-size: 10px;
//     color: rgb(170, 170, 170);
//   }

//   .social-account-container .social-accounts {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     gap: 15px;
//     margin-top: 5px;
//   }

//   .social-account-container .social-accounts .social-button {
//     background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
//     border: 5px solid white;
//     padding: 5px;
//     border-radius: 50%;
//     width: 40px;
//     aspect-ratio: 1;
//     display: grid;
//     place-content: center;
//     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
//     transition: all 0.2s ease-in-out;
//   }

//   .social-account-container .social-accounts .social-button .svg {
//     fill: white;
//     margin: auto;
//   }

//   .social-account-container .social-accounts .social-button:hover {
//     transform: scale(1.2);
//   }

//   .social-account-container .social-accounts .social-button:active {
//     transform: scale(0.9);
//   }

//   .agreement {
//     display: block;
//     text-align: center;
//     margin-top: 15px;
//   }

//   .agreement a {
//     text-decoration: none;
//     color: #4a6048;
//     font-size: 9px;
//   }`;

// export default Login;

import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { language } = useSimpleLanguage();

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

    try {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ أثناء تسجيل الدخول" : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">{t("auth.login", language)}</div>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "E-mail"}
          />
          <input
            required
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={language === "ar" ? "أدخل كلمة المرور" : "Password"}
          />

          <span className="forgot-password">
            <a href="#">{language === "ar" ? "نسيت كلمة المرور؟" : "Forgot Password?"}</a>
          </span>

          <button type="submit" className="login-button" disabled={loading}>
            {loading
              ? language === "ar"
                ? "جاري تسجيل الدخول..."
                : "Signing in..."
              : t("auth.login", language)}
          </button>
        </form>

        <div className="social-account-container">
          <span className="title">{language === "ar" ? "أو سجل دخولك عبر" : "Or Sign in with"}</span>
            <div className="social-accounts">
             <button className="social-button google">
               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512">
                 <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
               </svg></button>
           <button className="social-button apple">
               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                 <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
               </svg>
             </button>
            <button className="social-button twitter">
               <svg className="svg" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                 <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
               </svg>
             </button>
          </div>
        </div>

        <span className="agreement">
          <Link to="/register">
            {language === "ar" ? "إنشاء حساب جديد" : "Create new account"}
          </Link>
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    max-width: 350px;
    background: #fff7e9;
    background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
    border-radius: 40px;
    padding: 25px 35px;
    border: 2px solid rgb(255, 255, 255);
    box-shadow: #4a6048 0px 30px 30px -20px;
    margin: 20px auto;
  }
  .heading {
    text-align: center;
    font-weight: 900;
    font-size: 30px;
    color: #4a6048;
  }
  .form {
    margin-top: 20px;
  }
  .form .input {
    width: 100%;
    background: white;
    border: none;
    padding: 15px 20px;
    border-radius: 20px;
    margin-top: 15px;
    box-shadow: #4a6048 0px 8px 8px -5px;
    border-inline: 2px solid transparent;
  }
  .form .input:focus {
    outline: none;
    border-inline: 2px solid #4a6048;
  }
  .form .forgot-password {
    display: block;
    margin-top: 10px;
    margin-left: 10px;
  }
  .form .forgot-password a {
    font-size: 11px;
    color: #4a6048;
    text-decoration: none;
  }
  .form .login-button {
    display: block;
    width: 100%;
    font-weight: bold;
    background: linear-gradient(45deg, #703030 0%, #703030 100%);
    color: white;
    padding-block: 15px;
    margin: 20px auto;
    border-radius: 20px;
    border: none;
    transition: all 0.2s ease-in-out;
  }
  .form .login-button:hover {
    transform: scale(1.03);
  }
  .social-account-container {
    margin-top: 25px;
  }
  .social-account-container .title {
    display: block;
    text-align: center;
    font-size: 10px;
    color: rgb(170, 170, 170);
  }
  .social-account-container {
     margin-top: 25px;
   }

   .social-account-container .title {
     display: block;
     text-align: center;
     font-size: 10px;
     color: rgb(170, 170, 170);
   }

   .social-account-container .social-accounts {
     width: 100%;
     display: flex;
     justify-content: center;
     gap: 15px;
     margin-top: 5px;
   }

   .social-account-container .social-accounts .social-button {
     background: linear-gradient(45deg, rgb(0, 0, 0) 0%, rgb(112, 112, 112) 100%);
     border: 5px solid white;
     padding: 5px;
     border-radius: 50%;
     width: 40px;
     aspect-ratio: 1;
     display: grid;
     place-content: center;
     box-shadow: rgba(133, 189, 215, 0.8784313725) 0px 12px 10px -8px;
     transition: all 0.2s ease-in-out;
   }

   .social-account-container .social-accounts .social-button .svg {
     fill: white;
     margin: auto;
   }

   .social-account-container .social-accounts .social-button:hover {
     transform: scale(1.2);
   }

   .social-account-container .social-accounts .social-button:active {
     transform: scale(0.9);
   }

   .agreement {
     display: block;
     text-align: center;
     margin-top: 15px;
   }

   .agreement a {
     text-decoration: none;
     color: #4a6048;
     font-size: 9px;
  }
`;

export default Login;