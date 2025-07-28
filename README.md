# 🌦️ Weather Dashboard

A modern, high-performance weather app built with cutting-edge technologies to deliver a sleek, responsive, and interactive user experience.

---

## 🚀 Tech Stack Overview

### 🧩 Frontend Framework & Core
- **React 18.3.1** – Modern UI with hooks and StrictMode
- **TypeScript 5.5.3** – Full type safety for better maintainability
- **Vite 5.4.2** – Lightning-fast dev server and optimized builds

### 🎨 Styling & Design System
- **Tailwind CSS 3.4.1** – Utility-first styling framework
- **PostCSS 8.4.35** – CSS processor with autoprefixing
- **Google Fonts (Inter)** – Clean, modern typography
- **Custom Color Palette** – 6-tone system for primary, secondary, accent, success, warning, error, and neutrals
- **Responsive Design** – Mobile-first with custom breakpoints
- **Dark/Light Mode** – Full theme toggle with localStorage persistence

### 📊 Data Visualization
- **Chart.js 4.5.0** + **react-chartjs-2 5.3.0**
- Animated Line Chart (7-day min/max temperatures)
- Dual-Axis Bar Chart (precipitation & wind)
- Fully responsive with synchronized dark/light themes

### 🌐 APIs & Data Layer
- **WeatherAPI.com** – 7-day forecast and current weather data
- **Axios 1.10.0** – Robust HTTP client
- **Custom Weather Service** – Centralized API logic
- **Error Handling** – Friendly messages for HTTP status (400, 403, 429)

### 🎭 Animations & UX
- **Framer Motion 12.23.6**
  - Smooth page transitions
  - Micro-interactions & hover effects
  - Animated loaders and skeletons
  - Staggered list animations

### 🧭 Routing & Navigation
- **React Router DOM 7.7.0** – Client-side routing (prepared for future routes)

### 🗂️ State Management & Custom Hooks
- **React Context API** – Global state for weather and theme
- **Custom Hooks**:
  - `useWeather`, `useTheme`, `useLocalStorage`, `useGeolocation`

### 🛠️ Dev Tools & Code Quality
- **ESLint 9.9.1** + **TypeScript ESLint 8.3.0**
- **React Hooks ESLint** – Hook validation
- **Prettier** – Auto-formatting

### 📱 Browser APIs
- **Geolocation API** – Get user location on demand
- **LocalStorage API** – Persist theme and search history
- **Responsive Design API**, **Web Fonts API**

---

## 📦 Build & Optimization
- **Tree Shaking**
- **Code Splitting** (lazy loading ready)
- **Asset Optimization**
- **Minified Production Builds**

---

## 🎯 Key Features

1. 🔍 Smart Search – by city or geolocation with persistent history
2. 📊 Full Dashboard – current conditions + 7-day forecast
3. 📈 Interactive Charts – temperature trends, precipitation, wind
4. 🌓 Dark/Light Mode – theme switch with persistence
5. 🌡️ Unit Toggle – Celsius ↔ Fahrenheit
6. ⚠️ Elegant Error States – with loading and retry handling
7. ⚡ Optimized Performance – lazy loading + animations

---

## 🛠️ Config Files

| File               | Purpose                               |
|--------------------|----------------------------------------|
| `vite.config.ts`   | Vite build setup                       |
| `tailwind.config.js` | Custom theme and design system       |
| `tsconfig.json`    | TypeScript configuration               |
| `eslint.config.js` | Linting rules                          |
| `postcss.config.js`| PostCSS pipeline                       |

---

## 📂 Project Structure

```project
├── public/
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── vite.config.ts
└── README.md
