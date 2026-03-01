# BurnBuddy 🔥

BurnBuddy is a holistic calorie and fitness tracking web application built to help users understand their metabolic profiles, log their daily meals and workouts, and stay on top of their health goals.

> **Note:** This project was built primarily for **learning purposes**. It is actively under development, and several features are still ongoing or subject to change.

## 🚀 Tech Stack

This project is structured as a unified monorepo containing both the frontend and backend applications.

### Backend (API)
- **Framework:** Laravel 12 (PHP 8.2+)
- **Authentication:** Laravel Sanctum (Cookie-based SPA authentication)
- **Database:** MySQL
- **Architecture:** Pure JSON API with Form Request validation separation

### Frontend (Client)
- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Icons & Charts:** Lucide React, Recharts

## ✨ Core Features (Current State)

*   **Metabolic Profiling:** Calculates BMR (Mifflin-St Jeor) and TDEE based on user height, weight, age, gender, and activity level. Calculates a target daily calorie deficit.
*   **Daily Logging:** Tracks daily water intake, weight, and automatically calculates consumed vs. burned calories based on attached meals and workouts.
*   **Meals & Workouts:** Dedicated CRUD tracking for nutritional meals and various workout routines.
*   **Progress & History:** Dashboard overview of today's goals and a historical view of completed days.
*   **Admin Panel:** Secure portal for platform administrators to manage the global database of meals, workouts, and users.
*   **Day Completion:** Users can finalize their daily logs, preventing historical modifications and automatically preparing the next active day.

## 🛠️ Getting Started

### Prerequisites
- PHP 8.2+
- Composer
- Node.js & npm

### Backend Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `composer install`
3. Set up your environment file: `cp .env.example .env`
4. Generate the application key: `php artisan key:generate`
5. Run database migrations and seeders: `php artisan migrate --seed`
6. Start the development server: `php artisan serve` (Runs on `http://127.0.0.1:8000`)

### Frontend Setup
1. Navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Set up your environment file: `cp .env.example .env`
4. Start the Vite development server: `npm run dev` (Runs on `http://127.0.0.1:5173` or `5174`)

## 🚧 Ongoing Features & Roadmap

Since this is a learning project, the following features are planned or currently being explored:
- Expanding the frontend charting capabilities for long-term weight trend analysis.
- Implementing an API-based recipe or food database integration.
- Enhancing the admin dashboard with advanced analytics.
- Dockerizing the full stack for easier setup and deployment out-of-the-box.
- Implementing robust unit and feature testing suites for both ends of the stack.

