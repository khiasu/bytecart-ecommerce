# TechieHelp E-Commerce

A modern, responsive e-commerce platform built with React and Vite for selling tech accessories and gadgets.

## What's Inside

- **React 18** with modern hooks and patterns
- **Vite** for lightning-fast development
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for smooth animations
- **React Router** for navigation
- **Local state management** with React Context

## Quick Start

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # General purpose components
│   ├── home/           # Homepage specific components
│   ├── product/        # Product-related components
│   └── organisms/      # Complex component assemblies
├── context/            # React Context providers
├── data/              # Static data (products, categories, banners)
├── pages/             # Route components
└── utils/             # Helper functions
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features

- **Product Catalog** with filtering and search
- **Shopping Cart** with local storage persistence
- **Responsive Design** that works on all devices
- **Smooth Animations** for better user experience
- **Category Navigation** for easy browsing
- **Hero Carousel** with promotional banners

## Customization

### Products & Categories
Edit the JSON files in `src/data/`:
- `products.json` - Product inventory
- `categories.json` - Shop categories
- `banners.json` - Homepage banners

### Images
Place product images in `public/images/` and update the paths in the data files.

## Deployment

The app builds to static files and can be deployed to any platform:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static hosting service

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite

---

Built with ❤️ for modern web development
