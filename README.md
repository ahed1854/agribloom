# Agricultural Consultation Platform

## Project Title + Brief

**Agricultural Consultation Platform** is a comprehensive, full-stack web application designed to **bridge the gap between agricultural experts and farmers**, providing specialized consultations, expert articles, and agricultural services. It serves as a digital marketplace where users can connect with certified agricultural specialists, access expert knowledge, and obtain tailored solutions for their farming challenges.

The core goal of this project is to modernize agricultural consulting through technology, making expert advice accessible to farmers regardless of their location, while creating opportunities for agricultural specialists to share their knowledge and generate income.

| Key Feature | Description |
| :--- | :--- |
| **User Roles** | Separate interfaces for Users (Farmers) and Agricultural Specialists. |
| **Consultation System** | Real-time chat-based consultations with payment integration. |
| **Expert Directory** | Browse specialists by expertise, experience, and pricing. |
| **Knowledge Base** | Agricultural articles published by certified specialists. |
| **Service Marketplace** | List of specialized agricultural services available. |
| **Multilingual Support** | Full bilingual interface (Arabic/English) with RTL/LTR layout switching. |

***

## Usage

The application provides different experiences based on user roles:

### **For Farmers/Users:**
1. **Browse Specialists:** Search and filter agricultural experts by specialty, experience, and price
2. **Request Consultations:** Book paid consultations with chosen specialists
3. **Access Knowledge:** Read agricultural articles and guides
4. **Service Discovery:** Explore available agricultural services
5. **Chat Communication:** Real-time messaging with specialists after payment

### **For Agricultural Specialists:**
1. **Profile Management:** Create and update professional profiles with expertise, pricing, and bio
2. **Consultation Management:** Handle incoming consultation requests and chat with clients
3. **Content Creation:** Publish educational agricultural articles
4. **Service Listing:** Offer specialized agricultural services
5. **Payment Tracking:** Monitor consultation payments and earnings

### **For Guests:**
1. **Browse Content:** View articles, specialists, and services
2. **Registration:** Sign up as either a user or specialist
3. **Learn About Platform:** Access information about how the platform works

***

## Coding Style

We follow established conventions to ensure high code quality, readability, and maintainability across the entire codebase.

* **JavaScript/React:** We adhere to modern React patterns with functional components and hooks, following best practices for component structure and state management.
* **Backend Architecture:** RESTful API design with MVC pattern, proper error handling, and validation middleware.
* **Database:** MongoDB with Mongoose ODM, using proper schema design and relationships.
* **Version Control:** Feature-based branching with clear commit messages following conventional commits.
* **Code Quality:** ESLint and Prettier are configured to maintain consistent code style and catch potential errors early in development.

***

## Technical Architecture

### **Frontend:**
- **React.js** with functional components and hooks
- **React Router** for navigation
- **React Context API** for state management (Auth, Language)
- **React Bootstrap** for UI components
- **Axios** for HTTP requests
- **CSS Modules** for component styling

### **Backend:**
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with role-based access control
- **RESTful API** architecture
- **Middleware** for authentication, authorization, and validation

### **Key Features Implemented:**
1. **User Authentication & Authorization** (JWT, role-based access)
2. **Real-time Chat System** for consultations
3. **Payment Integration** workflow (bank transfer simulation)
4. **Multilingual Support** with full RTL/LTR layout switching
5. **File Upload System** for user profiles
6. **Search & Filtering** capabilities
7. **Responsive Design** for mobile and desktop

### **Database Models:**
- **Users** (Farmers, Specialists, Admin)
- **Articles** (Educational content)
- **Services** (Agricultural services)
- **Consultations** (Booking and chat sessions)
- **Messages** (Chat communications)
- **Payments** (Transaction records)

***

## The Figma Design Process

We designed the user interfaces using Figma to ensure a user-friendly experience and consistent visual design. The design process helped us:

1. **Visualize User Flows** for different user roles
2. **Create Consistent UI Components** with proper spacing and typography
3. **Test Responsive Design** across different screen sizes
4. **Implement Accessibility** considerations from the start
5. **Gather Feedback** early in the development process

You can view the complete design system and prototypes here: [Figma Design Link](https://www.figma.com/file/example-design-link)

***

## Setup & Installation

### **Prerequisites:**
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### **Backend Setup:**
```bash
cd backend
npm install
cp .env.example .env  # Configure environment variables
npm run dev
