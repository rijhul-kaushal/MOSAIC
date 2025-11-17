

# 💄 Mosaic - Clean, Skin-Centric Beauty™

Mosaic is a modern React-based e-commerce platform for a clean beauty brand. This project is a dynamic single-page application (SPA) built with Vite, featuring a global shopping cart, dynamic routing, and a unique hybrid architecture designed to migrate a legacy HTML website into a full React application, page by page.

## ✨ Key Features

  * **Modern React SPA:** Built from the ground up using **React 18** and **Vite** for a blazing-fast development experience and optimized builds.
  * **Global State Management:** Uses React Context API (`CartContext`) to manage the shopping cart state across all components, from the "Add to Bag" buttons on product pages to the cart icon in the header.
  * **Dynamic Routing:** Uses `react-router-dom` to handle all client-side navigation, ensuring instant page loads without a full browser refresh.
  * **Legacy Migration Architecture:** Demonstrates a professional "Strangler Fig Pattern" to migrate a multi-page static site.
      * **Legacy Content Wrappers:** React components (e.g., `About.jsx`, `Bookings.jsx`) import raw legacy HTML content and render it within the main React layout.
      * **Scoped Legacy CSS:** A custom `useScopedCss` hook dynamically loads and unloads the old CSS files for each legacy page, preventing any global stylesheet conflicts.
  * **Native React Pages:** Key commercial pages like the **Homepage** and **Shopping Cart** are written in pure, "native" React for full interactivity.
  * **Interactive Hooks:** The legacy HTML is brought to life with React `useEffect` hooks that attach new event listeners, as seen in the `Bookings` form and `Rewards` page logic.

## 💻 Tech Stack

  * **Framework:** React 18
  * **Bundler:** Vite
  * **Routing:** `react-router-dom`
  * **State Management:** React Context API
  * **Styling:** CSS3 (with a hybrid approach for new components and legacy page styles)
  * **Core:** JavaScript (ES6+)

## 🚀 Getting Started

### Prerequisites

  * [Node.js](https://nodejs.org/) (v18.0 or newer)
  * `npm` package manager (comes with Node.js)

### Installation & Running

1.  **Clone the repository:**
    ```sh
    git clone <your-github-repo-url>
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd mosiac
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```
4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Your project will now be running live at `http://localhost:5173` (or the next available port).

## 📂 Project Structure

```
/
├── public/         # Static assets (images, logos, videos)
├── legacy/         # Original HTML/CSS pages for migration
├── src/
│   ├── assets/     # Scoped CSS for legacy pages
│   ├── components/ # Shared React components (Header, Footer, Layout)
│   ├── context/    # Global state (CartContext.jsx)
│   ├── hooks/      # Custom hooks (useScopedCss, useLegacyLinkNavigation)
│   ├── pages/      # All page components (React-native and wrappers)
│   ├── utils/      # Utility functions (legacyHtml.js)
│   ├── App.jsx     # Main app router
│   └── main.jsx    # React entry point
├── .gitignore      # Files ignored by Git (node_modules, .env, etc.)
├── package.json    # Project dependencies and scripts
└── vite.config.js  # Vite configuration
```

## 📜 Available Scripts

  * `npm run dev`: Starts the development server with live reloading.
  * `npm run build`: Bundles the app for production into the `/dist` folder.
  * `npm run preview`: Serves the production build locally to test it.