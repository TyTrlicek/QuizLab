# 🏆 Tournament Hub

A modern web application for creating and competing in head-to-head elimination tournaments using images or YouTube videos.

![Next.js](https://img.shields.io/badge/Next.js-15.3-black) ![React](https://img.shields.io/badge/React-19.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-4.1-cyan)

## ✨ Features

- **Tournament Creation** - Build elimination brackets with images or YouTube videos
- **YouTube Integration** - Automatic video title fetching via YouTube oEmbed API
- **Real-time Voting** - Smooth head-to-head battles with animated progressions
- **Mobile-First Design** - Responsive glassmorphism UI with Framer Motion animations
- **Content Management** - Browse, select, and organize tournament entries with live previews

## 🛠 Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Node.js, Express, PostgreSQL, Prisma ORM
- **Services:** Supabase, YouTube oEmbed API
- **UI:** Radix UI, Lucide Icons, Custom glassmorphism design system

## 🚀 Quick Start

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
npm run server
```

Visit `http://localhost:3000` to see the application.

## 📁 Project Structure

```
├── app/                    # Next.js app router pages
├── components/             # Reusable React components
├── backend/               # Express API server
├── lib/                   # Utility functions and configs
└── public/                # Static assets
```

## 🎯 Coming Soon

- Trivia quiz creation
- Tier list rankings
- User profiles and statistics
- Social sharing features

## 🏗 Architecture

- **Frontend:** Server-side rendered with client-side interactivity
- **Database:** PostgreSQL with Prisma for type-safe queries
- **API:** RESTful endpoints for tournament CRUD operations
- **Real-time:** Tournament progression with optimistic updates

---

Built with modern web technologies for a seamless tournament experience.