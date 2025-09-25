# MMJAuto

## Short Description

MMJAuto is a web-based platform built using the **MERN stack** (MongoDB, Express, React, Node.js) that allows customers to search, browse, and manage car parts, while administrators efficiently maintain the catalog. The system provides a **responsive user interface**, personalized notifications, and user-friendly search tools.

**Deployment:**

* Frontend → Vercel
* Backend → Render
* Database → MongoDB Atlas

---

## Main Entities / Objects

* **User** (Customer, Administrator)
* **Car Model**
* **Car Part / Accessory**
* **Wishlist / Shopping Cart**
* **Notification**

---

## Preliminary List of Features

### User Roles & Authentication

* Customer: register, login, browse parts, save favorites
* Administrator: login, manage catalog (add/edit/delete parts)

### Search & Filtering

* Search by part name, category, or car model
* Sorting and filtering (availability, compatibility)

### Detailed Part View

* Display specifications, images, and compatibility details

### Wishlist Management

* Add/remove items, update quantity, save favorite parts

### Profile Management

* Edit profile details and manage account preferences

### Notification System

* Notify customers about new arrivals or stock updates

### Dashboard (Administrator)

* Overview of parts, inventory, and user activity

---

## Technical Stack & Architecture

* **Frontend:** React + TailwindCSS (responsive design)
* **Backend:** Node.js + Express (MVC architecture)
* **Database:** MongoDB Atlas (cloud database)
* **Hosting / Deployment:**

  * Frontend → Vercel
  * Backend → Render
  * Database → MongoDB Atlas

---

## Data Persistence

* **users** collection (auth data, profile, role: customer/admin)
* **carModels** collection (brand, year, name)
* **carParts** collection (linked to carModel, price, stock, details)
* **wishlists** collection (userID, array of part IDs, quantity)
* **notifications** collection (type, message, timestamp)

---

## Testing & Documentation

### Testing

* **Backend:** Jest (unit tests), Postman (API testing)
* **Frontend:** Cypress (UI flows like login, wishlist)

### Documentation

* Developer README (setup, stack, deployment)
* API documentation (Swagger or Markdown)
* User guide with screenshots (login, browse, wishlist)

---

## Quick Start

### Backend

1. Navigate to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file (example):

```
MONGO_URI=<your MongoDB connection string>
JWT_SECRET=mysecret123
PORT=5001
NODE_ENV=development
```

4. Seed dummy data:

```bash
node seeder.js
```

5. Start backend server:

```bash
npm run dev
```

* Server runs on `http://localhost:5001`.

### Frontend

1. Navigate to the frontend folder:

```bash
cd ../mmjauto-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend server:

```bash
npm start
```

* App runs on `http://localhost:3000`.
* Pages: `/` (Home), `/carmodels`, `/carparts`, `/login`.

---

## Scope & Timeline

* Authentication, catalog browsing, wishlist
* Responsive UI
* Admin catalog management

---

## Authors / Contributors

* **Majd Morad**
* Jamal Mohsen**
* **Mohamad Nour Morad**
