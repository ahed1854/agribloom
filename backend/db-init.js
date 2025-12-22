// Agricultural Consultation Platform - Database Initialization Script
// Run with: mongosh agricultural_platform db-init.js

print('🌱 Starting Agricultural Platform Database Initialization...');

// Switch to the agricultural_platform database
db = db.getSiblingDB('agricultural_platform');

// Clear existing collections
print('🗑️  Clearing existing data...');
db.users.drop();
db.articles.drop();
db.services.drop();
db.consultations.drop();
db.messages.drop();

print('📝 Creating indexes...');

// Create indexes for better performance
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.articles.createIndex({ category: 1 });
db.articles.createIndex({ createdAt: -1 });
db.consultations.createIndex({ userId: 1 });
db.consultations.createIndex({ specialistId: 1 });
db.consultations.createIndex({ status: 1 });
db.messages.createIndex({ consultationId: 1 });
db.messages.createIndex({ timestamp: 1 });

print('👥 Creating users...');

// Create specialists
const specialist1 = db.users.insertOne({
  username: "دكتور_أحمد",
  email: "ahmed@agricultural.com",
  password: "$2a$10$ExampleHashedPassword1", // In real app, this would be bcrypt hashed
  role: "specialist",
  specialistProfile: {
    bio: "أخصائي زراعي مع أكثر من 15 عاماً من الخبرة في مجال الزراعة المستدامة وإدارة المزارع. حاصل على الدكتوراه في العلوم الزراعية من جامعة القاهرة.",
    expertise: ["الزراعة المستدامة", "إدارة المزارع", "الري الحديث"],
    experienceYears: 15,
    price: 100,
    image: "/images/specialist1.jpg"
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

const specialist2 = db.users.insertOne({
  username: "مهدية_الزراعية",
  email: "mahdia@agricultural.com",
  password: "$2a$10$ExampleHashedPassword2",
  role: "specialist",
  specialistProfile: {
    bio: "مهندسة زراعية متخصصة في الزراعة العضوية ومكافحة الآفات. خبرة 10 سنوات في تقديم الاستشارات للمزارعين.",
    expertise: ["الزراعة العضوية", "مكافحة الآفات", "تسميد التربة"],
    experienceYears: 10,
    price: 80,
    image: "/images/specialist2.jpg"
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

const specialist3 = db.users.insertOne({
  username: "خبير_النخيل",
  email: "nakhil@agricultural.com",
  password: "$2a$10$ExampleHashedPassword3",
  role: "specialist",
  specialistProfile: {
    bio: "متخصص في زراعة النخيل وأشجار الفاكهة. خبرة 12 سنة في مجال البستنة والزراعة التجميلية.",
    expertise: ["زراعة النخيل", "أشجار الفاكهة", "البستنة"],
    experienceYears: 12,
    price: 120,
    image: "/images/specialist3.jpg"
  },
  createdAt: new Date(),
  updatedAt: new Date()
});

// Create regular users
const user1 = db.users.insertOne({
  username: "مزارع_سعود",
  email: "saud@example.com",
  password: "$2a$10$ExampleHashedPassword4",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
});

const user2 = db.users.insertOne({
  username: "فلاح_محمد",
  email: "mohamed@example.com",
  password: "$2a$10$ExampleHashedPassword5",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date()
});

print('📚 Creating articles...');

// Create articles
db.articles.insertMany([
  {
    title: "أساسيات الزراعة المستدامة في المناطق الجافة",
    content: `الزراعة المستدامة هي ممارسة زراعية تهدف إلى الحفاظ على الموارد الطبيعية وتحسين جودة التربة مع تحقيق إنتاجية عالية. في المناطق الجافة، يمكن تطبيق عدة استراتيجيات:

1. **ترشيد استخدام المياه**: استخدام أنظمة الري بالتنقيط والري الذكي
2. **تحسين خصوبة التربة**: استخدام الأسمدة العضوية وتدوير المحاصيل
3. **اختيار المحاصيل المناسبة**: زراعة محاصيل تتحمل الجفاف والملوحة

تشمل الممارسات الجيدة أيضًا الزراعة الكنتورية وحصاد مياه الأمطار للمساعدة في الحفاظ على الرطوبة في التربة.`,
    category: "الزراعة المستدامة",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-15")
  },
  {
    title: "أفضل طرق مكافحة الآفات الزراعية بشكل طبيعي",
    content: `مكافحة الآفات الزراعية بشكل طبيعي تساعد في الحفاظ على البيئة وتقليل استخدام المبيدات الكيميائية. إليك بعض الطرق الفعالة:

**المكافحة الحيوية**:
- استخدام الحشرات النافعة مثل الدعسوقة وأبو العيد
- تربية الطفيليات الطبيعية للآفات

**المستخلصات النباتية**:
- استخدام مستخلص النيم لمكافحة العديد من الآفات
- خلط الثوم والفلفل الحار لطرد الحشرات

**الممارسات الزراعية**:
- تدوير المحاصيل بانتظام
- تنظيف الحقل من الأعشاب الضارة
- استخدام مصائد الفيرمون

هذه الطرق تساعد في الحفاظ على التوازن البيئي وتقليل التكاليف.`,
    category: "مكافحة الآفات",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  },
  {
    title: "تقنيات الري الحديثة وتوفير المياه",
    content: `مع ندرة المياه في العديد من المناطق، أصبحت تقنيات الري الحديثة ضرورة ملحة. أهم هذه التقنيات:

**الري بالتنقيط**:
- توفير يصل إلى 60% من استهلاك المياه
- توصيل المياه مباشرة إلى جذور النباتات
- تقليل نمو الأعشاب الضارة

**الري الذكي**:
- استخدام أجهزة استشعار الرطوبة في التربة
- أنظمة الري الآلي التي تتكيف مع الظروف الجوية
- التحكم عن بعد عبر التطبيقات الذكية

**الري بالرش المحوري**:
- مناسب للمساحات الكبيرة
- توزيع متجانس للمياه
- إمكانية إضافة الأسمدة الذائبة

اختيار النظام المناسب يعتمد على نوع المحصول وطبيعة التربة والمناخ.`,
    category: "تقنيات الري",
    createdAt: new Date("2024-01-25"),
    updatedAt: new Date("2024-01-25")
  },
  {
    title: "زراعة النخيل وإدارة البساتين",
    content: `زراعة النخيل تحتاج إلى عناية خاصة لضمان إنتاجية عالية وجودة ممتازة. النقاط الرئيسية:

**اختيار الشتلات**:
- اختيار شتلات سليمة وخالية من الأمراض
- الأصناف المناسبة للمنطقة والتربة

**الزراعة والتباعد**:
- مسافات الزراعة المناسبة بين الأشجار
- تحضير التربة وإضافة السماد العضوي

**الري والتسميد**:
- برامج الري حسب مراحل النمو
- التسميد المتوازن حسب تحليل التربة

**المكافحة المتكاملة**:
- مراقبة الآفات والأمراض بانتظام
- المكافحة في الوقت المناسب

إدارة بساتين النخيل بشكل صحيح تضمن إنتاجاً مستداماً لسنوات عديدة.`,
    category: "زراعة النخيل",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01")
  }
]);

print('🛠️ Creating services...');

// Create services
db.services.insertMany([
  {
    title: "تحليل التربة والمياه",
    description: "خدمة متكاملة لتحليل عينات التربة والمياه لتحديد الخصائص الكيميائية والفيزيائية والتوصيات المناسبة لتحسين الإنتاجية.",
    price: 200,
    videoUrl: "https://example.com/videos/soil-analysis",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "تخطيط المزارع",
    description: "تصميم وتخطيط متكامل للمزارع يشمل تخطيط المساحات وأنظمة الري وتوزيع المحاصيل لتحقيق أقصى استفادة من المساحة المتاحة.",
    price: 500,
    videoUrl: "https://example.com/videos/farm-planning",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "دراسة جدوى المشاريع الزراعية",
    description: "إعداد دراسات جدوى شاملة للمشاريع الزراعية تشمل التحليل المالي والتسويقي والفني لتقييم جدوى الاستثمار.",
    price: 800,
    videoUrl: null,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "المراقبة الدورية للمحاصيل",
    description: "خدمة مراقبة دورية للمحاصيل مع تقديم تقارير شهرية عن حالة المحصول والتوصيات الفنية اللازمة.",
    price: 300,
    videoUrl: "https://example.com/videos/crop-monitoring",
    createdAt: new Date(),
    updatedAt: new Date()
  }
]);

print('💬 Creating sample consultations and messages...');

// Create sample consultations
const consultation1 = db.consultations.insertOne({
  userId: user1.insertedId,
  specialistId: specialist1.insertedId,
  status: "open",
  payment: {
    paid: false
  },
  createdAt: new Date("2024-02-10"),
  updatedAt: new Date("2024-02-10")
});

const consultation2 = db.consultations.insertOne({
  userId: user2.insertedId,
  specialistId: specialist2.insertedId,
  status: "paid",
  payment: {
    paid: true
  },
  createdAt: new Date("2024-02-08"),
  updatedAt: new Date("2024-02-09")
});

// Create sample messages for consultation1
db.messages.insertMany([
  {
    consultationId: consultation1.insertedId,
    senderId: user1.insertedId,
    senderType: "user",
    text: "السلام عليكم، لدي مشكلة في زراعة الطماطم في الصوب الزراعية. تظهر على الأوراق بقع صفراء ثم تتحول إلى بنية.",
    timestamp: new Date("2024-02-10T10:00:00")
  },
  {
    consultationId: consultation1.insertedId,
    senderId: specialist1.insertedId,
    senderType: "specialist",
    text: "وعليكم السلام ورحمة الله. هذه الأعراض تشير إلى الإصابة بمرض فطري. هل يمكنك إرسال صورة للأوراق المصابة؟ وما هي ظروف الري والحرارة في الصوبة؟",
    timestamp: new Date("2024-02-10T10:15:00")
  },
  {
    consultationId: consultation1.insertedId,
    senderId: user1.insertedId,
    senderType: "user",
    text: "سأرسل الصور قريباً. درجة الحرارة في الصوبة تتراوح بين 25-30 مئوية، وأروي كل يومين. هل هذا مناسب؟",
    timestamp: new Date("2024-02-10T10:30:00")
  }
]);

// Create sample messages for consultation2
db.messages.insertMany([
  {
    consultationId: consultation2.insertedId,
    senderId: user2.insertedId,
    senderType: "user",
    text: "أريد استشارة حول الزراعة العضوية للخضروات في مساحة صغيرة في المنزل.",
    timestamp: new Date("2024-02-08T09:00:00")
  },
  {
    consultationId: consultation2.insertedId,
    senderId: specialist2.insertedId,
    senderType: "specialist",
    text: "أهلاً بك! هذه فكرة رائعة. ما هي المساحة المتاحة لديك؟ وهل لديك خبرة سابقة في الزراعة؟",
    timestamp: new Date("2024-02-08T09:20:00")
  },
  {
    consultationId: consultation2.insertedId,
    senderId: user2.insertedId,
    senderType: "user",
    text: "المساحة حوالي 10 أمتار مربعة في الشرفة. لدي بعض الخبرة البسيطة في زراعة النعناع والريحان.",
    timestamp: new Date("2024-02-08T09:45:00")
  },
  {
    consultationId: consultation2.insertedId,
    senderId: specialist2.insertedId,
    senderType: "specialist",
    text: "ممتاز! أنصحك بزراعة الطماطم والخيار والفلفل. سأرسل لك خطة مفصلة للتربة والأسمدة العضوية المناسبة.",
    timestamp: new Date("2024-02-08T10:00:00")
  }
]);

print('📊 Database Statistics:');
printjson({
  users: db.users.countDocuments(),
  specialists: db.users.countDocuments({ role: "specialist" }),
  regular_users: db.users.countDocuments({ role: "user" }),
  articles: db.articles.countDocuments(),
  services: db.services.countDocuments(),
  consultations: db.consultations.countDocuments(),
  messages: db.messages.countDocuments()
});

print('✅ Database initialization completed successfully!');
print('🌱 Agricultural Platform is ready to use!');