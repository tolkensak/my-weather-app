# ☀️ Weather App

A full-stack weather dashboard built with Next.js, TypeScript, and PostgreSQL. View current weather and 7-day forecasts for cities around the world with real-time data.

[![Live Demo](https://img.shields.io/badge/Live_Demo-View_App-4CAF50)](https://my-weather-app-liard-nine.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2.11-000000)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-7.9.1-2D3748)](https://www.prisma.io/)

## 🚀 Live Demo

- **URL:** [https://my-weather-app-liard-nine.vercel.app](https://my-weather-app-liard-nine.vercel.app)
- **Deployed on:** Vercel

## ✨ Features

- 🌦️ **Real-time Weather:** Live current conditions and 7-day forecasts
- 🌍 **City Selection:** Browse weather for multiple global cities
- 🔐 **Authentication:** Secure login with GitHub OAuth
- 👤 **User Preferences:** Save favorite cities and settings
- 🌙 **Dark Mode:** Toggle between light and dark themes
- 📱 **Responsive Design:** Works perfectly on all devices

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 16, React, TypeScript, Tailwind CSS |
| **State Management** | Zustand |
| **Data Fetching** | React Query |
| **Authentication** | NextAuth.js |
| **Database** | PostgreSQL, Prisma ORM |
| **Deployment** | Vercel |

## 🏗️ Architecture

- **App Router:** Modern Next.js routing with Server and Client Components
- **API Routes:** Backend endpoints for weather data and user authentication
- **Server Components:** Efficient server-side rendering for fast initial loads
- **Type Safety:** Full TypeScript coverage across the entire application

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:tolkensak/my-weather-app.git
   cd my-weather-app
   ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables (see .env.example):
    ```bash
    cp .env.example .env.local
    ```

4. Run database migrations:
    ```bash
    npx prisma migrate dev
    ```

5. Start the development server:
    ```bash
    npm run dev
    ```

## 🔗 Links

GitHub Repository: https://github.com/tolkensak/my-weather-app

LinkedIn: https://www.linkedin.com/in/tolkyn-akhmetollauly-0a3873a9/

Portfolio: https://tolkensak.github.io/tolkensak/

## 📄 License
This project is open source and available under the MIT License.

##

Built with ❤️ by Tolkyn Akhmetollauly