// import React, { useState } from "react";
// import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import styled from "styled-components";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { register } = useAuth();
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

//     if (formData.password !== formData.confirmPassword) {
//       setError(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await register(formData);
//       if (result.success) {
//         navigate("/");
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError(language === "ar" ? "حدث خطأ أثناء إنشاء الحساب" : "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className={`my-5 ${language === "ar" ? "text-end" : "text-start"}`}>
//       <Row className="justify-content-center">
//         <Col md={8} lg={6}>
//           <Card className="shadow border-0">
//             <Card.Body className={`p-4 ${language === "ar" ? "text-end" : "text-start"}`}>
//               <div className="text-center mb-4">
//                 <h2 className="text-success">{t("auth.register", language)}</h2>
//                 <p className="text-muted">{language === "ar" ? "أنشئ حسابك الجديد" : "Create your new account"}</p>
//               </div>

//               {error && <Alert variant="danger">{error}</Alert>}

//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3">
//                   <Form.Label>{t("auth.name", language)}</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     required
//                     className="border-success"
//                     placeholder={language === "ar" ? "أدخل اسم المستخدم" : "Enter username"}
//                   />
//                 </Form.Group>

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

//                 <Form.Group className="mb-3">
//                   <Form.Label>{t("auth.password", language)}</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                     className="border-success"
//                     placeholder={language === "ar" ? "أدخل كلمة المرور" : "Enter password"}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>{t("auth.confirmPassword", language)}</Form.Label>
//                   <Form.Control
//                     type="password"
//                     name="confirmPassword"
//                     value={formData.confirmPassword}
//                     onChange={handleChange}
//                     required
//                     className="border-success"
//                     placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm password"}
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4">
//                   <Form.Label>{language === "ar" ? "نوع الحساب" : "Account Type"}</Form.Label>
//                   <Form.Select name="role" value={formData.role} onChange={handleChange} className="border-success">
//                     <option value="user">{language === "ar" ? "مستخدم" : "User"}</option>
//                     <option value="specialist">{language === "ar" ? "أخصائي" : "Specialist"}</option>
//                   </Form.Select>
//                   <Form.Text className="text-muted">
//                     {language === "ar"
//                       ? 'اختر "أخصائي" إذا كنت متخصصاً في المجال الزراعي'
//                       : 'Select "Specialist" if you are an agricultural expert'}
//                   </Form.Text>
//                 </Form.Group>

//                 <Button type="submit" variant="success" disabled={loading} className="w-100 py-2">
//                   {loading ? (
//                     <>
//                       {language === "ar" ? (
//                         <>
//                           {language === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."}
//                           <span className="spinner-border spinner-border-sm ms-2"></span>
//                         </>
//                       ) : (
//                         <>
//                           <span className="spinner-border spinner-border-sm me-2"></span>
//                           {language === "ar" ? "جاري إنشاء الحساب..." : "Creating account..."}
//                         </>
//                       )}
//                     </>
//                   ) : (
//                     t("auth.register", language)
//                   )}
//                 </Button>
//               </Form>

//               <div className="text-center mt-4">
//                 <p className="text-muted">
//                   {language === "ar" ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
//                   <Link to="/login" className="text-success text-decoration-none">
//                     {t("nav.login", language)}
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

// export default Register;

// import React, { useState } from "react";
// import styled from "styled-components";
// import { useAuth } from "../../context/AuthContext";
// import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
// import { t } from "../../utils/simpleTranslations";
// import { useNavigate, Link } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "user",
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const { register } = useAuth();
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

//     if (formData.password !== formData.confirmPassword) {
//       setError(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match");
//       setLoading(false);
//       return;
//     }

//     try {
//       const result = await register(formData);
//       if (result.success) {
//         navigate("/");
//       } else {
//         setError(result.message);
//       }
//     } catch (err) {
//       setError(language === "ar" ? "حدث خطأ أثناء إنشاء الحساب" : "Registration failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <StyledWrapper>
//       <div className="container">
//         <div className="heading">{t("auth.register", language)}</div>
//         <p style={{ textAlign: "center", color: "#777", marginBottom: "10px" }}>
//           {language === "ar" ? "أنشئ حسابك الجديد" : "Create your new account"}
//         </p>

//         {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

//         <form onSubmit={handleSubmit} className="form">
//           <input
//             required
//             className="input"
//             type="text"
//             name="username"
//             value={formData.username}
//             onChange={handleChange}
//             placeholder={language === "ar" ? "أدخل اسم المستخدم" : "Username"}
//           />
//           <input
//             required
//             className="input"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder={language === "ar" ? "أدخل بريدك الإلكتروني" : "E-mail"}
//           />
//           <input
//             required
//             className="input"
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder={language === "ar" ? "أدخل كلمة المرور" : "Password"}
//           />
//           <input
//             required
//             className="input"
//             type="password"
//             name="confirmPassword"
//             value={formData.confirmPassword}
//             onChange={handleChange}
//             placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm Password"}
//           />

//           <select
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             className="input"
//           >
//             <option value="user">{language === "ar" ? "مستخدم" : "User"}</option>
//             <option value="specialist">{language === "ar" ? "أخصائي" : "Specialist"}</option>
//           </select>

//           <button type="submit" className="login-button" disabled={loading}>
//             {loading
//               ? language === "ar"
//                 ? "جاري إنشاء الحساب..."
//                 : "Creating account..."
//               : t("auth.register", language)}
//           </button>
//         </form>

//         <span className="agreement">
//           <Link to="/login">
//             {language === "ar" ? "لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Login"}
//           </Link>
//         </span>
//       </div>
//     </StyledWrapper>
//   );
// };

// const StyledWrapper = styled.div`
//   .container {
//     max-width: 350px;
//     background: #fff7e9;
//     background: linear-gradient(0deg, rgb(255, 255, 255) 0%, rgb(244, 247, 251) 100%);
//     border-radius: 40px;
//     padding: 25px 35px;
//     border: 2px solid rgb(255, 255, 255);
//     box-shadow: #4a6048 0px 30px 30px -20px;
//     margin: 20px auto;
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
//     box-shadow: #4a6048 0px 8px 8px -5px;
//     border-inline: 2px solid transparent;
//   }
//   .form .input:focus {
//     outline: none;
//     border-inline: 2px solid #4a6048;
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
//     border: none;
//     transition: all 0.2s ease-in-out;
//   }
//   .form .login-button:hover {
//     transform: scale(1.03);
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
//   }
// `;

// export default Register;

import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import { useSimpleLanguage } from "../../context/SimpleLanguageContext";
import { t } from "../../utils/simpleTranslations";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register } = useAuth();
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

    if (formData.password !== formData.confirmPassword) {
      setError(language === "ar" ? "كلمات المرور غير متطابقة" : "Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const result = await register(formData); // مهم: نرسل الـ object كامل
      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError(language === "ar" ? "حدث خطأ أثناء إنشاء الحساب" : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="heading">{t("auth.register", language)}</div>
        <p style={{ textAlign: "center", color: "#777", marginBottom: "10px" }}>
          {language === "ar" ? "أنشئ حسابك الجديد" : "Create your new account"}
        </p>

        {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}

        <form onSubmit={handleSubmit} className="form">
          <input
            required
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={language === "ar" ? "أدخل اسم المستخدم" : "Username"}
          />
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
          <input
            required
            className="input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={language === "ar" ? "أعد إدخال كلمة المرور" : "Confirm Password"}
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="input"
          >
            <option value="user">{language === "ar" ? "مستخدم" : "User"}</option>
            <option value="specialist">{language === "ar" ? "أخصائي" : "Specialist"}</option>
          </select>

          <button type="submit" className="login-button" disabled={loading}>
            {loading
              ? language === "ar"
                ? "جاري إنشاء الحساب..."
                : "Creating account..."
              : t("auth.register", language)}
          </button>
        </form>

        <span className="agreement">
          <Link to="/login">
            {language === "ar" ? "لديك حساب بالفعل؟ تسجيل الدخول" : "Already have an account? Login"}
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

export default Register;
