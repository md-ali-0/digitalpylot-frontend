# DigitalPylot Frontend

A modern, high-performance dashboard UI for the DigitalPylot Affiliate Tracking ecosystem. Built with Next.js 15, Ant Design, and Tailwind CSS.

## 🎨 Design Philosophy

- **Premium Aesthetics**: Vibrant gradients, glassmorphism, and modern typography.
- **Dynamic Content**: Redesigned to remove static placeholders and focus on real-time data.
- **User Experience**: Smooth transitions, responsive layouts, and intuitive navigation.

- **Modern Dashboard**: Real-time stats, dynamic greetings, and module status tracking.
- **CRM Interfaces**: Functional Leads and Tasks management with interactive tables and filters.
- **Analytics Dashboard**: Visual reports for lead performance and team productivity.
- **Profile Management**: Functional profile updates in Settings with instant UI synchronization.
- **Advanced RBAC UI**: Granular user management and permission assignment interfaces.
- **Activity Monitoring**: Color-coded Audit Logs for system transparency.
- **Smart Auth**: "Quick Login As" buttons for efficient role-based testing.
- **Responsive Layout**: Sidebar and Topbar optimized for all screen sizes.

## 🛠 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Components**: [Ant Design (Antd)](https://ant.design/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/) & [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- Backend server running (see backend README)

### Installation

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Setup Environment Variables:
   ```bash
   cp .env.example .env
   # Update NEXT_PUBLIC_API_URL
   ```

### Running the App

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Production**: `npm start`

## 📂 Project Structure

- `/src/app`: Next.js pages and layouts (Dashboard, Auth, etc.).
- `/src/components`: Reusable UI components (Sidebar, Topbar, Forms).
- `/src/redux`: Global state management and API slice definitions.
- `/src/utils`: Helper functions and styling utilities.

## 📜 License

MIT
