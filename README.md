# Dashboard Pro

A complete, modern, and responsive web application built with **React.js**, **TypeScript**, **Tailwind CSS**, and **shadcn/ui** components.

## Features

- **Login Page** — Email/username & password login with form validation, show/hide password, and a "Forgot Password" link.
- **Registration Page** — Full registration flow with name, email, username, password & confirm-password fields, real-time password strength indicator, and validation.
- **Forgot Password Page** — Email-based password-reset flow (simulated).
- **Dashboard** — Protected, full-featured dashboard with:
  - Collapsible sidebar navigation with badges
  - Responsive top navigation bar with search and notifications
  - User profile dropdown with logout
  - KPI stat cards (Revenue, Users, Orders, Conversion Rate)
  - Top Products table with mini bar charts
  - User profile card with quick stats
  - Recent Activity feed
  - Quick Actions panel with performance meters
- **Authentication & Routing** — React Context-based auth state, `localStorage` persistence, protected routes, and automatic login/logout redirects.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Routing | React Router DOM v7 |
| Styling | Tailwind CSS v3 |
| UI Components | shadcn/ui (Radix UI primitives) |
| Icons | Lucide React |
| Build Tool | Vite |

## Getting Started

### Prerequisites

- Node.js **v18+**
- npm **v9+**

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Grow24/pbmp_new_code.git
cd pbmp_new_code

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:5173**.

### Demo Credentials

| Field | Value |
|-------|-------|
| Email | `alex@example.com` |
| Password | `Password123!` |

Alternatively, create a new account via the **Register** page — accounts are stored in `localStorage`.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite development server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run the linter |

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx   # Root layout with sidebar + top nav
│   │   ├── Sidebar.tsx           # Collapsible sidebar with nav items
│   │   └── TopNav.tsx            # Top navigation bar
│   ├── ui/                       # Reusable shadcn/ui components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── badge.tsx
│   │   └── separator.tsx
│   └── ProtectedRoute.tsx        # Auth-guarded route wrapper
├── contexts/
│   └── AuthContext.tsx           # Auth state, login, register, logout
├── lib/
│   └── utils.ts                  # Tailwind class merge utility (cn)
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── ForgotPasswordPage.tsx
│   ├── DashboardPage.tsx
│   └── NotFoundPage.tsx
├── App.tsx                       # Route definitions
├── main.tsx                      # React entry point
└── index.css                     # Tailwind directives + CSS variables
```

## Deployment

### Zeabur

This project is pre-configured for deployment on [Zeabur](https://zeabur.com).

1. Push your code to GitHub.
2. Go to [zeabur.com](https://zeabur.com) → **New Project** → **Deploy from GitHub**.
3. Select the `pbmp_new_code` repository.
4. Zeabur will auto-detect the Vite/Node.js build configuration.
5. The app will be live at your assigned Zeabur domain.

The `zbpack.json` file at the root configures the build command and output directory for Zeabur.

## Security Notes

- No secrets, API keys, or passwords are committed to this repository.
- User data (demo accounts) is stored in browser `localStorage` for demonstration purposes only.
- In production, replace `localStorage` auth with a proper backend authentication service (e.g., JWT, OAuth).

## License

MIT
