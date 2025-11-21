Gulakandoz Center  online shop Admin Panel is a web-based dashboard built for store owners and administrators to manage products efficiently. The panel allows you to:

Add, edit, and delete products

Upload multiple product images

Manage categories

Track product availability

Interact directly with customers via WhatsApp orders

The admin panel is designed to be responsive, user-friendly, and fast, using React (Vite) and Firebase for real-time data management.


✨ Features

🔐 Secure Admin Access – Only authorized users can manage products.

➕ Product Management – Add, edit, and delete products with detailed information.

🖼 Image Upload – Upload multiple product images with live previews.

🏷 Category Management – Create, edit, and delete product categories.

💬 Customer Interaction – Place orders via WhatsApp with product details.

📱 Responsive UI – Works perfectly on mobile and desktop screens.

⚡ Fast & Lightweight – Built with Vite for optimized performance.

🧰 Tech Stack
Technology	Purpose
React + Vite	Frontend framework & build tool
React Router DOM	Navigation between pages
Firebase Firestore	Real-time database for products & categories
Firebase Storage	Hosting product images
Tailwind CSS	Styling & responsive design
Redux / Context API	State management (optional)
Lucide Icons	Clean SVG icons for UI /src
 ├── components/      
 ├── pages/             
 │    ├── Login.jsx
 │    ├── ProductList.jsx
 │    ├── ProductAdd.jsx
 │    └── ProductEditPage.jsx
 ├── features/        
 ├── firebase/          
 ├── context/           
 └── App.jsx           
