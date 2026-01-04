# ByteCart | E-Commerce Platform

A fully functional, modern e-commerce website built with React, featuring a dynamic shopping cart, product filtering, order management, and responsive design. Built for the Indian market with INR pricing and local shipping.

**Company**: TechieHelp (Internship Project)  
**Domain**: [bytecart.online](https://bytecart.online)

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-7.2.5-646CFF?logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.15-38B2AC?logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

## 🚀 Features

### Core Functionality
- 🛒 **Full Shopping Cart** - Add, remove, and adjust quantities with real-time updates
- 🔍 **Product Search & Filtering** - Search by name, filter by category, price, and rating
- 📦 **Order Management** - Complete checkout flow with order history
- 💾 **Cart Persistence** - Cart saved to localStorage, syncs across browser tabs
- ❤️ **Wishlist** - Save favorite products for later
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop

### User Experience
- ✨ **Smooth Animations** - Framer Motion powered transitions
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS
- 🔔 **Toast Notifications** - Real-time feedback for user actions
- 🎯 **Accessibility** - ARIA labels, keyboard navigation, focus indicators
- ⚡ **Performance** - Lazy loading, optimized images, code splitting

### Pages & Sections
- 🏠 **Home Page** - Hero carousel, category showcase, featured products
- 📋 **Products Page** - Advanced filtering, sorting, and grid layout
- 🛍️ **Shopping Cart** - Slide-out drawer with quantity controls
- 💳 **Checkout** - Complete order placement with form validation
- 📦 **Orders** - Order history with detailed information
- 📄 **Legal Pages** - Privacy Policy, Terms of Service, Cookie Policy

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router v6** - Client-side routing
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Styling
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **Autoprefixer** - Vendor prefixing

### State Management
- **React Context API** - Global state management
- **useReducer** - Complex state logic
- **localStorage** - Client-side persistence

### Development Tools
- **ESLint** - Code linting
- **PropTypes** - Runtime type checking

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/khiasu/bytecart-ecommerce.git
   cd bytecart-ecommerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 🌐 Live Demo

🔗 **Live Site**: [https://bytecart.online](https://bytecart.online)  
🔗 **GitHub Repository**: [https://github.com/khiasu/bytecart-ecommerce](https://github.com/khiasu/bytecart-ecommerce)

## 📁 Project Structure

```
techiehelp-ecommerce/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── atoms/         # Basic UI elements
│   │   ├── common/        # Reusable components
│   │   ├── home/          # Home page components
│   │   ├── product/       # Product-related components
│   │   ├── cart/          # Cart components
│   │   ├── molecules/    # Composite components
│   │   ├── organisms/    # Complex components
│   │   └── templates/    # Page layouts
│   ├── context/           # React Context providers
│   ├── data/              # JSON data files
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Route pages
│   ├── services/          # API/data services
│   ├── styles/            # Global styles
│   └── utils/             # Utility functions
├── .gitignore
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## 🎯 Key Features Explained

### Shopping Cart
- Add products to cart from product cards
- Adjust quantities with +/- buttons
- Remove items with trash icon
- Real-time total calculations (subtotal, GST, shipping, total)
- Free shipping threshold (₹2000)
- Cart persists across page refreshes

### Product Filtering
- Filter by category (Electronics, Audio, Gaming, Accessories)
- Sort by: Featured, Price (Low/High), Rating, Name (A-Z/Z-A)
- Filter by price range
- Filter by minimum rating
- In-stock only toggle
- Active filter indicators

### Order Management
- Complete checkout form with validation
- Shipping information collection
- Payment information (simulated)
- Order confirmation with order ID
- Order history page
- Order details with items, shipping, and totals

### Responsive Design
- Mobile-first approach
- Breakpoints: 320px, 768px, 1024px, 1280px
- Touch-friendly buttons (min 44px)
- Optimized layouts for all screen sizes
- Mobile cart drawer (full-width)
- Responsive navigation menu

## 🎨 Design System

### Colors
- **Primary**: Blue (#3b82f6)
- **Secondary**: Green (#22c55e)
- **Neutral**: Gray scale
- **Semantic**: Error (red), Warning (amber), Success (green), Info (blue)

### Typography
- **Headings**: Poppins (font-heading)
- **Body**: Inter (default sans)

### Spacing
- Consistent spacing scale (4px base unit)
- Container max-width: 1280px
- Section padding: py-12 (desktop), py-8 (mobile)

## 🚀 Performance Optimizations

- ✅ Lazy loading images
- ✅ Code splitting with React.lazy
- ✅ Optimized bundle size
- ✅ Debounced search inputs
- ✅ Memoized context values
- ✅ Efficient re-renders

## ♿ Accessibility

- ✅ Semantic HTML
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Focus indicators
- ✅ Screen reader support
- ✅ Color contrast compliance

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 License

MIT License - feel free to use this project for learning purposes.

## 👨‍💻 Development

### Adding New Products
Edit `src/data/products.json` to add or modify products.

### Adding Categories
Edit `src/data/categories.json` to add or modify categories.

### Customizing Styles
Modify `tailwind.config.js` for theme customization.

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Backend API integration
- [ ] Real payment processing
- [ ] Product reviews and ratings
- [ ] Advanced search with filters
- [ ] Product comparison feature
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Multi-language support
- [ ] Dark mode toggle

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Home+Page)

### Products Page
![Products Page](https://via.placeholder.com/800x400?text=Products+Page)

### Shopping Cart
![Shopping Cart](https://via.placeholder.com/800x400?text=Shopping+Cart)

### Checkout
![Checkout](https://via.placeholder.com/800x400?text=Checkout)

## 🤝 Contributing

This is an internship evaluation project. Contributions are welcome for learning purposes!

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

## 📍 Location

**Address**: Chumoukedima, PIN: 797115, Nagaland, India  
**Email**: khiasu2vis@gmail.com  
**Phone**: +91 98637 65861

---

**Built with ❤️ for TechieHelp Internship Evaluation | ByteCart E-Commerce Platform**
