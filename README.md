1. Name of the Project
MMJAuto

2. Short Description
MMJAuto is a web-based platform built using the MERN stack (MongoDB, Express, React, Node.js) that allows customers to search, browse, and manage car parts, while administrators maintain the catalog efficiently. The system provides a responsive user interface, personalized notifications, and user-friendly search tools. Deployment will be done via Vercel (frontend), Render (backend), and MongoDB Atlas (database).

3. Main Entities / Objects
User (Customer, Administrator)
Car Model
Car Part / Accessory
Wishlist / Shopping Cart
Notification

4. Preliminary List of Features
. User Roles & Authentication
Customer: register, login, browse parts, save favorites
Administrator: login, manage catalog (add/edit/delete parts)
. Search & Filtering
Search by part name, category, or car model
Sorting and filtering (availability, compatibility)
. Detailed Part View
Display specifications, images, compatibility details
. Wishlist Management
Add/remove items, update quantity, save favorite parts
. Profile Management
Edit profile details, manage account preferences
. Notification System
Notify customers about new arrivals or stock updates
. Dashboard (Administrator)
Overview of parts, inventory, and user activity

5. Technical Stack & Architecture
Frontend: React + TailwindCSS (responsive design)
Backend: Node.js + Express (MVC architecture)
Database: MongoDB Atlas (cloud database)
Hosting / Deployment:
Frontend → Vercel
Backend → Render
Database → MongoDB Atlas

6. Data Persistence
users collection (auth data, profile, role: customer/admin)
carModels collection (brand, year, name)
carParts collection (linked to carModel, price, stock, details)
wishlists collection (userID, array of part IDs, quantity)
notifications collection (type, message, timestamp)

7. Testing & Documentation
Testing:
Backend → Jest (unit tests), Postman (API testing)
Frontend → Cypress (UI flows like login, wishlist)

Documentation:
Developer README (setup, stack, deployment)
API documentation (Swagger or Markdown)
User guide with screenshots (login, browse, wishlist)

8. Scope & Timeline:
Authentication, catalog browsing, wishlist, responsive UI, admin catalog management
