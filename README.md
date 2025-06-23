# Learnio

A student-centered e-learning platform that connects learners with educators through a structured course enrollment and payment system. Learnio provides tools for students to enroll in paid courses, teachers to manage their course applications, and admins to control platform roles and permissions.

---

## 🌟 **Project Purpose**
The goal of this project is to create a learning management platform where users can discover, apply, and pay for online courses, while teachers and admins can manage roles and enrollment statuses efficiently. It also serves as a full-stack practice app utilizing Redux Toolkit and RTK Query for state and API management.

---

## 💡 **Key Features**
- **Authentication System:** Login and registration with email/password and Google, protected routes, and account recovery.
- **Course Enrollment:** Students can apply for paid courses and complete payments via Stripe.
- **Role Management:** Students can request to become teachers; admins can approve or reject them.
- **Application Review:** Teachers can review student enrollments and accept or reject them.
- **Secure Payment Integration:** Stripe is used for real-time, secure payments.
- **Dynamic Role-Based UI:** UI changes based on user roles (admin, teacher, student).
- **Error Handling:** User-friendly error notifications and loading states.
- **State Management:** Redux Toolkit + RTK Query for efficient data fetching and mutation.

---

## 🖌️ **Application Pages**

### Public Pages
- **Home (/):** Landing page showing featured courses and platform benefits.
- **Login/Register (/login, /register):** User authentication forms.

### Protected Pages

#### Student Role
- **Browse Courses (/courses):** View all available courses with filtering options.
- **Course Details (/courses/:id):** See course content, teacher, and enrollment option.
- **My Enrollments (/my-courses):** View courses the student has applied to or paid for.
- **Apply to Become Teacher (/apply-teacher):** Submit request to become a teacher.

#### Teacher Role
- **My Courses (/teacher/courses):** View and manage owned courses.
- **Review Enrollments (/teacher/courses/:id/students):** Accept or reject student applications.

#### Admin Role
- **Manage Users (/admin/users):** Promote users to teacher or reject teacher requests.
- **All Enrollments (/admin/enrollments):** Platform-wide view of course transactions.

---

## 📂 **Architecture**
- **Role-Based Layout:** UI dynamically adjusts according to the authenticated user's role.
- **Routing:** React Router DOM used with role-specific route protection.
- **Global State:** Redux Toolkit for role, user info, and UI states.
- **API Management:** RTK Query used for backend data interaction.

---

## 🛠️ **Technologies Used**
- **Frontend:** React.js, Tailwind CSS, DaisyUI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** Firebase Auth, Google Sign-In
- **State Management:** Redux Toolkit, RTK Query
- **Payments:** Stripe Integration
- **Deployment:** [Vercel / Netlify / Render / Railway]
- **Version Control:** GitHub

---

## 🚀 **Features Checklist**

### ✅ **Authentication System**
- Email/password login & Google sign-in.
- Password reset and email verification.
- Auth-protected routes based on user role.

### ✅ **Student Functionality**
- Browse and apply to courses.
- Pay for courses via Stripe.
- Track enrollment status.

### ✅ **Teacher Functionality**
- View list of student applicants.
- Accept/reject applications.
- Manage course-related operations.

### ✅ **Admin Functionality**
- Promote students to teachers.
- Review and manage teacher requests.
- View all enrollments and user roles.

### ✅ **Payment System**
- Stripe Checkout integration.
- Secure and real-time payment confirmation.
- Payment status tracking for enrollments.

---

## 📜 **Best Practices Followed**

### 🧹 **Code Quality**
- Modular, DRY, and reusable components.
- Clean naming conventions and folder structure.
- Comments for clarity and logic breakdown.

### 🚦 **Error Handling**
- Friendly UI error states for all async actions.
- Global error boundary for unknown issues.

### 🔒 **Security**
- JWT-based role-secured APIs.
- Input validation and sanitation.
- Protected routes and server checks.

### 🖌️ **Responsive Design**
- Mobile-first design with Tailwind CSS.
- Accessible components (ARIA, keyboard nav).
- Responsive modals, forms, and lists.


### ⚡ **Performance Optimization**
- Lazy loading of components.
- RTK Query caching and invalidation.
- Minimal re-renders via memoization.


---
