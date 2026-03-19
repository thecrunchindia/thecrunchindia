# Project Folder Structure Guide

Welcome to **THE CRUNCH** project! 


## 📁 Root Directory
```text
THE_CRUNCH/
├── public/                 # Static assets copied directly to the build folder (Not processed by Vite)
│   ├── OrderNotify.mp3
│   ├── firebase-messaging-sw.js
│   └── ...                 # Favicon, icons, redirects
│
├── src/                    # Main source code for the React application
├── notes/                  # Project documentation and internal notes (like this file!)
├── .env                    # Environment variables (API base URLs, keys) - Never commit this!
├── .gitignore              # Files and folders to be ignored by Git (e.g., node_modules, dist)
├── eslint.config.js        # Configuration for our code linter (ESLint)
├── index.html              # The foundational HTML file where Vite mounts the React App
├── package.json            # Lists all npm dependencies and project scripts
├── README.md               # General overview and setup instructions for the project
└── vite.config.js          # Configuration file for Vite (our build tool and dev server)
```

---

## ⚛️ `src/` - Application Source Code
This is where the magic happens! Most of your time as a developer will be spent in this directory.

```text
src/
├── api/                         # API communication layer
│   └── axios.js                 # Axios instances and interceptors
│
├── assets/                      # Local static files like images, SVGs, fonts
│
├── components/                  # Global reusable UI components and shared sections
│   ├── common/                  # Application-wide UI parts (Header, Footer, Modals)
│   │   ├── AdminHeader.jsx
│   │   ├── AdminSidebar.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductModal.jsx
│   │   ├── ReserveTable.jsx
│   │   ├── SearchBar.jsx
│   │   └── ... (others)
│   │
│   └── ui/                      # Base generic UI feedback components and loaders
│       ├── LogoLoop.jsx
│       ├── ServerErrorPage.jsx
│       ├── SiteLaunchLoader.jsx
│       └── sonner.jsx
│
├── features/                    # Feature-based modular folders containing logic loops
│   ├── admin/                   # Admin-specific logical features
│   │   ├── admin-auth/
│   │   ├── bookings/
│   │   ├── customer/
│   │   ├── dashboard/
│   │   ├── inbox/
│   │   ├── menu/
│   │   ├── order/
│   │   ├── revenue/
│   │   ├── reviews/
│   │   └── settings/
│   │
│   └── user/                    # User-facing logical features
│       ├── About/
│       ├── cart/
│       ├── contact/
│       ├── home/
│       ├── menu/
│       ├── profile/
│       └── user-auth/
│
├── hooks/                       # Shared/global custom hooks
│   ├── locationActions.js
│   ├── useAdminLogout.js
│   ├── useFCM.js                # Firebase Cloud Messaging hooks
│   ├── useLocationPicker.js
│   ├── useNotifications.js
│   ├── useReserveTable.js
│   ├── useSiteInfo.js
│   └── useUserLogout.js
│
├── Layouts/                     # Structural layout wrappers
│   ├── AdminLayout.jsx          # Shell layout containing Admin Sidebar/Header
│   └── PublicLayout.jsx         # Shell layout containing User Header/Footer
│
├── Pages/                       # Route-level pages, organized by role and access type
│   ├── admin/                   # Admin-specific pages
│   │   ├── Dashboard.jsx
│   │   ├── Orders.jsx
│   │   ├── Customers.jsx
│   │   ├── Settings.jsx
│   │   └── ... (Inbox, Reviews, Revenue, Bookings, Menu)
│   │
│   ├── auth/                    # Unified authentication pages
│   │   ├── AdminLogin.jsx
│   │   ├── UserLogin.jsx
│   │   └── UserSignup.jsx
│   │
│   └── user/                    # Main logic-driven user view pages
│       ├── Home.jsx
│       ├── Cart.jsx
│       ├── Menu.jsx
│       ├── Profile.jsx
│       ├── About.jsx
│       └── Contact.jsx
│
├── redux/                       # Global state management
│   ├── store.js                 # Redux store config
│   ├── cartSlice.js             # Cart state slice
│   └── locationSlice.js         # Location tracking slice
│
├── routes/                      # Route definitions and layouts
│   ├── index.jsx                # Central AppRouter configuration
│   └── AdminRoute.jsx           # Protected Role-based route guard component
│
├── utils/                       # Utility functions, helpers, data formatters
│   ├── addressHelper.js
│   ├── extractErrorMessages.js
│   └── firebase.js              # Firebase base config
│
├── App.jsx                      # Root framework component containing global providers
├── index.css                    # Global stylesheets, base CSS resets
└── main.jsx                     # The React entry point wrapping the App in Router & Store
```

