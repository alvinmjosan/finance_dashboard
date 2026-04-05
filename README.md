# Finance Dashboard 📊

![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)

A frontend dashboard prototype simulating a finance tracking workflow, focused on performance and a polished user experience. 

Built on a blazing fast **Next.js App Router** architecture with **TypeScript** for robust type-safety, and **Redux Toolkit** for predictable and persistent state management.

## ✨ Features

- **Next.js App Router**: Utilizing the latest React 19 and Next.js features for superior performance, SEO, and server-side rendering capabilities.
- **Role-Based Access Control (RBAC)**: Secure access to different portions of the application depending on user privileges.
- **Robust State Management**: Powered by **Redux Toolkit** and **Redux Persist** to ensure your financial data remains intact across page reloads.
- **Bespoke Theme System**: Pure CSS custom variable architecture providing fluid, synced transitions between specialized themes (e.g., *Soothing Aqua Breeze* Light Mode and *Deep Twilight Lavender* Dark Mode).
- **Interactive Visualizations**: High-performance, responsive charts powered by **Recharts**.
- **Micro-Animations**: Fluid UI feedback and transitions handled by **Framer Motion**.
- **Type Safety**: Fully typed with **TypeScript** for developer confidence and robust scaling.

## 💻 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Library**: [React](https://react.dev/) 19
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [Redux Persist](https://github.com/rt2zz/redux-persist)
- **Styling**: Pure CSS Modules & Modern CSS Variables
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)

## 🚀 Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/finance-dashboard.git
   cd finance-dashboard
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **View the application:**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🎨 Theming & Customization

The dashboard avoids heavy utility frameworks like Tailwind in favor of an ultra-customizable, highly specific semantic CSS variable structure. 

All main theme colors reside in `src/app/globals.css`. The system supports robust Data Attributes (`[data-theme='dark']`) ensuring that the text colors, background elements, active hover states, and structural borders are all kept entirely in sync depending on the active theme.

## 📁 Project Structure

```text
finance-dashboard/
├── src/
│   ├── app/           # Next.js App Router pages and global layouts
│   ├── components/    # Reusable UI elements (Dashboard, Transactions, Layout)
│   ├── store/         # Redux Toolkit slices and configuration
│   └── ...
├── public/            # Static assets
├── package.json
└── README.md
```
