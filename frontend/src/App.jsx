import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import { SimpleLanguageProvider } from "./context/SimpleLanguageContext";

// Articles
import ArticlesList from "./pages/articles/ArticlesList.jsx";
import ArticleDetail from "./pages/articles/ArticleDetail.jsx";
import CreateArticle from "./pages/articles/CreateArticle.jsx";

// Specialists
import SpecialistsList from "./pages/specialists/SpecialistsList.jsx";
import SpecialistDetail from "./pages/specialists/SpecialistDetail.jsx";

// Services
import ServicesList from "./pages/services/ServicesList.jsx";
import ServiceDetail from "./pages/services/ServiceDetail.jsx";

// Consultations
import ConsultationsList from "./pages/consultations/ConsultationsList.jsx";
import CreateConsultation from "./pages/consultations/CreateConsultation.jsx";

// Messages
import Chat from "./pages/messages/Chat.jsx";

// Payment
import PaymentInstructions from "./pages/payment/PaymentInstructions.jsx";
import PaymentConfirmation from "./pages/payment/PaymentConfirmation.jsx";

import "./App.css";

function App() {
  return (
    <SimpleLanguageProvider>
      <AuthProvider>
        <Router>
          <div className="d-flex flex-column min-vh-100 rtl">
            <Header />
            <main className="flex-grow-1">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Articles Routes */}
                <Route path="/articles" element={<ArticlesList />} />
                <Route path="/articles/:id" element={<ArticleDetail />} />

                {/* Specialists Routes */}
                <Route path="/specialists" element={<SpecialistsList />} />
                <Route path="/specialists/:id" element={<SpecialistDetail />} />

                {/* Services Routes */}
                <Route path="/services" element={<ServicesList />} />
                <Route path="/services/:id" element={<ServiceDetail />} />

                {/* Protected Routes - User */}
                <Route
                  path="/my-consultations"
                  element={
                    <ProtectedRoute role="user">
                      <ConsultationsList />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/consultations/create/:specialistId"
                  element={
                    <ProtectedRoute role="user">
                      <CreateConsultation />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/instructions/:consultationId"
                  element={
                    <ProtectedRoute role="user">
                      <PaymentInstructions />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/payment/confirmation/:consultationId"
                  element={
                    <ProtectedRoute role="user">
                      <PaymentConfirmation />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes - Specialist */}
                <Route
                  path="/specialist-consultations"
                  element={
                    <ProtectedRoute role="specialist">
                      <ConsultationsList specialistView={true} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/articles/create"
                  element={
                    <ProtectedRoute role="specialist">
                      <CreateArticle />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Routes - Both User and Specialist */}
                <Route
                  path="/chat/:consultationId"
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  }
                />

                {/* Catch all route - 404 */}
                <Route
                  path="*"
                  element={
                    <div className="container my-5">
                      <div className="text-center py-5">
                        <i className="bi bi-exclamation-triangle text-warning" style={{ fontSize: "4rem" }}></i>
                        <h2 className="mt-3 text-muted">الصفحة غير موجودة</h2>
                        <p className="text-muted">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
                        <a href="/" className="btn btn-success">
                          العودة إلى الصفحة الرئيسية
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </SimpleLanguageProvider>
  );
}

export default App;
