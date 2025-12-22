// Simple translation dictionary - add translations as you go
const translations = {
  ar: {
    // Common
    "app.name": "الاستشارات الزراعية",
    "app.description": "خدمات استشارات زراعية متخصصة",

    // Navigation
    "nav.home": "الرئيسية",
    "nav.articles": "المقالات",
    "nav.specialists": "الأخصائيون",
    "nav.services": "الخدمات",
    "nav.consultations": "استشاراتي",
    "nav.login": "تسجيل الدخول",
    "nav.register": "تسجيل حساب",
    "nav.logout": "تسجيل الخروج",
    "nav.profile": "الملف الشخصي",

    // Buttons
    "btn.back": "رجوع",
    "btn.submit": "إرسال",
    "btn.cancel": "إلغاء",
    "btn.save": "حفظ",
    "btn.edit": "تعديل",
    "btn.delete": "حذف",
    "btn.send": "إرسال",
    "btn.reply": "رد",
    "btn.pay": "دفع",

    // Status
    "status.open": "مفتوحة",
    "status.closed": "مغلقة",
    "status.paid": "مدفوعة",
    "status.unpaid": "غير مدفوعة",

    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.register": "تسجيل حساب جديد",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.name": "الاسم",

    // Articles
    "articles.title": "المقالات الزراعية",
    "articles.subTitle": "اطلع على أحدث المقالات والأبحاث في مجال الزراعة",
    "articles.create": "كتابة مقال جديد",
    "articles.readMore": "اقرأ المزيد",
    "articles.noArticles": "لا توجد مقالات",

    // Specialists
    "specialists.title": "الأخصائيون الزراعيون",
    "specialists.select": "اختر أخصائي",

    // Services
    "services.title": "الخدمات",

    // Consultations
    "consultations.title": "استشاراتي",
    "consultations.new": "طلب استشارة جديدة",

    // Messages
    "messages.typeHere": "اكتب رسالتك هنا...",

    // Home page
    "home.welcome": "مرحباً في منصة الاستشارات الزراعية",
    "home.getStarted": "ابدأ الآن",

    // Footer
    "footer-desc": "منصة متكاملة لتقديم الاستشارات والخدمات الزراعية من قبل أخصائيين معتمدين",
    "footer-links": "روابط سريعة",
    "footer-link1": "المقالات",
    "footer-link2": "الأخصائيون",
    "footer-link3": "الخدمات",
    "footer-contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة",
    "home.features.experts": "أخصائيون معتمدون",
    "home.features.consultations": "استشارات مباشرة",
    "home.features.articles": "معرفة مجانية",
    "home.cta.title": "ابدأ رحلتك الزراعية معنا اليوم",
    "home.cta.button": "انضم إلينا الآن",

    "footer.quickLinks": "روابط سريعة",
    "footer.contact": "اتصل بنا",
    "footer.newsletter": "النشرة البريدية",
    "footer.subscribe": "اشترك في نشرتنا البريدية",
    "footer.emailPlaceholder": "أدخل بريدك الإلكتروني",
    "footer.subscribeBtn": "اشترك",
    "footer.rights": "جميع الحقوق محفوظة",

    "services.title": "الخدمات الزراعية",
    "services.viewDetails": "عرض التفاصيل",
    "services.noServices": "لا توجد خدمات",

    "payment.instructions": "تعليمات الدفع",
    "payment.method": "طريقة الدفع",
    "payment.details": "تفاصيل الدفع",
    "payment.completed": "تم الدفع",
    "payment.success": "تم الدفع بنجاح",
    "payment.pending": "قيد الانتظار",

    "specialists.viewProfile": "عرض الملف الشخصي",
    "specialists.requestConsultation": "طلب استشارة",
    "specialists.availableForUsers": "متاح للمستخدمين فقط",
    "specialists.loginRequired": "يجب تسجيل الدخول لطلب استشارة",

    "consultations.close": "إغلاق الاستشارة",
    "consultations.reload": "إعادة التحميل",

    "auth.mustBeUser": "يجب أن تكون مستخدم لطلب استشارة",
    "auth.accountType": "نوع الحساب",
    "auth.selectSpecialist": 'اختر "أخصائي" إذا كنت متخصصاً',
  },

  en: {
    // Common
    "app.name": "Agricultural Consultations",
    "app.description": "Specialized agricultural consultation services",

    // Navigation
    "nav.home": "Home",
    "nav.articles": "Articles",
    "nav.specialists": "Specialists",
    "nav.services": "Services",
    "nav.consultations": "My Consultations",
    "nav.login": "Login",
    "nav.register": "Register",
    "nav.logout": "Logout",
    "nav.profile": "Profile",

    // Buttons
    "btn.back": "Back",
    "btn.submit": "Submit",
    "btn.cancel": "Cancel",
    "btn.save": "Save",
    "btn.edit": "Edit",
    "btn.delete": "Delete",
    "btn.send": "Send",
    "btn.reply": "Reply",
    "btn.pay": "Pay",

    // Status
    "status.open": "Open",
    "status.closed": "Closed",
    "status.paid": "Paid",
    "status.unpaid": "Unpaid",

    // Auth
    "auth.login": "Login",
    "auth.register": "Register New Account",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.name": "Name",

    // Articles
    "articles.title": "Agricultural Articles",
    "articles.subTitle": "Discover the latest articles and researches in the agriculture space",
    "articles.create": "Write New Article",
    "articles.readMore": "Read More",
    "articles.noArticles": "No Articles",

    // Specialists
    "specialists.title": "Agricultural Specialists",
    "specialists.select": "Select Specialist",

    // Services
    "services.title": "Services",

    // Consultations
    "consultations.title": "My Consultations",
    "consultations.new": "New Consultation Request",

    // Messages
    "messages.typeHere": "Type your message here...",

    // Home page
    "home.welcome": "Welcome to Agricultural Consultation Platform",
    "home.getStarted": "Get Started",

    // Footer
    "footer-desc": "integrated platform for providing agricultural consultations and services by certified specialists",
    "footer-links": "Quick Links",
    "footer-link1": "Articles",
    "footer-link2": "Specialists",
    "footer-link3": "Services",
    "footer-contact": "Contact Us",
    "footer.rights": "All rights reserved",
  },
  "home.features.experts": "Certified Specialists",
  "home.features.consultations": "Direct Consultations",
  "home.features.articles": "Free Knowledge",
  "home.cta.title": "Start Your Agricultural Journey With Us Today",
  "home.cta.button": "Join Us Now",

  "footer.quickLinks": "Quick Links",
  "footer.contact": "Contact Us",
  "footer.newsletter": "Newsletter",
  "footer.subscribe": "Subscribe to our newsletter",
  "footer.emailPlaceholder": "Enter your email",
  "footer.subscribeBtn": "Subscribe",
  "footer.rights": "All rights reserved",

  "services.title": "Agricultural Services",
  "services.viewDetails": "View Details",
  "services.noServices": "No Services",

  "payment.instructions": "Payment Instructions",
  "payment.method": "Payment Method",
  "payment.details": "Payment Details",
  "payment.completed": "Payment Completed",
  "payment.success": "Payment Successful",
  "payment.pending": "Pending",

  "specialists.viewProfile": "View Profile",
  "specialists.requestConsultation": "Request Consultation",
  "specialists.availableForUsers": "Available for users only",
  "specialists.loginRequired": "You must be logged in to request a consultation",

  "consultations.close": "Close Consultation",
  "consultations.reload": "Reload",

  "auth.mustBeUser": "Must be a user to request consultation",
  "auth.accountType": "Account Type",
  "auth.selectSpecialist": 'Select "Specialist" if you are an expert',
};

// Simple translation function
export const t = (key, lang = "ar") => {
  return translations[lang]?.[key] || key;
};

// Format date based on language
export const formatDate = (date, lang = "ar") => {
  const dateObj = new Date(date);
  const locale = lang === "ar" ? "ar-SY" : "en-US";
  return dateObj.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
