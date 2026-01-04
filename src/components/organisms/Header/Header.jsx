import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User, 
  ShoppingBag 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProducts } from '@contexts/ProductsContext';
import useDebounce from '@hooks/useDebounce';
import Button from '@components/common/Button';
import CartIconButton from '@components/common/CartIconButton';

/**
 * Professional Header Component
 * Features: Mobile menu, search, cart badge, sticky behavior, animations
 */
export default function Header() {
  const navigate = useNavigate();
  const { updateFilters } = useProducts();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    return localStorage.getItem('banner_dismissed') === 'true';
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Handle scroll for sticky header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update products filter when debounced search changes
  useEffect(() => {
    if (debouncedSearch) {
      updateFilters({ searchQuery: debouncedSearch });
      // Navigate to products page if not already there
      if (window.location.pathname !== '/products') {
        navigate('/products');
      }
    } else {
      updateFilters({ searchQuery: '' });
    }
  }, [debouncedSearch, updateFilters, navigate]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    
    if (mobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const dismissBanner = () => {
    setBannerDismissed(true);
    localStorage.setItem('banner_dismissed', 'true');
  };

  const navLinkClassName = ({ isActive }) =>
    `relative text-sm font-medium transition-colors duration-200 ${
      isActive 
        ? 'text-primary-600' 
        : 'text-neutral-700 hover:text-neutral-900'
    } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-primary-600 after:transition-all after:duration-300 hover:after:w-full ${
      isActive ? 'after:w-full' : ''
    }`;

  return (
    <>
      {/* Promotional Banner */}
      <AnimatePresence>
        {!bannerDismissed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-primary-600 to-primary-700 text-white overflow-hidden"
          >
            <div className="container relative flex items-center justify-center py-2 text-center text-sm">
              <span className="flex items-center gap-2">
                🎉 Free Shipping on Orders Over $100 | Shop Now
              </span>
              <button
                onClick={dismissBanner}
                className="absolute right-4 p-1 hover:bg-white/20 rounded transition-colors"
                aria-label="Close banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Header */}
      <motion.header
        className={`sticky top-0 z-50 bg-white border-b border-neutral-200 transition-all duration-200 ${
          isScrolled ? 'shadow-md backdrop-blur-sm' : ''
        }`}
      >
        <div className="container">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 tablet:hidden"
                aria-label="Open menu"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Logo */}
              <NavLink to="/" className="flex items-center gap-2 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  <ShoppingBag className="h-7 w-7 text-primary-600" />
                  <span className="font-heading text-xl font-bold text-neutral-900 hidden mobile:inline">
                    ByteCart
                  </span>
                </motion.div>
              </NavLink>
            </div>

            {/* Center Section - Desktop Navigation */}
            <nav className="hidden tablet:flex items-center gap-8">
              <NavLink to="/" className={navLinkClassName} end>
                Home
              </NavLink>
              <NavLink to="/products" className={navLinkClassName}>
                Products
              </NavLink>
              <NavLink to="/orders" className={navLinkClassName}>
                My Orders
              </NavLink>
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {/* Search Bar - Desktop */}
              <div className="hidden tablet:block">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <motion.input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    animate={{ width: searchFocused ? 300 : 200 }}
                    transition={{ duration: 0.2 }}
                    className="h-10 rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                    aria-label="Search products"
                  />
                </div>
              </div>

              {/* Cart Button */}
              <CartIconButton />

              {/* Sign In Button - Desktop */}
              <Button
                variant="secondary"
                size="sm"
                className="hidden tablet:inline-flex"
                onClick={() => navigate('/signin')}
              >
                <User className="h-4 w-4" />
                <span className="hidden desktop:inline">Sign In</span>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl"
            >
              <div className="flex flex-col h-full">
                {/* Drawer Header */}
                <div className="flex items-center justify-between border-b border-neutral-200 p-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary-600" />
                    <span className="font-heading text-lg font-bold text-neutral-900">
                      ByteCart
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Drawer Content */}
                <div className="flex-1 overflow-y-auto p-4">
                  {/* Search - Mobile */}
                  <div className="mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                      <input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="h-10 w-full rounded-lg border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
                        aria-label="Search products"
                      />
                    </div>
                  </div>

                  {/* Navigation Links - Mobile */}
                  <nav className="space-y-2">
                    <NavLink
                      to="/"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`
                      }
                      end
                    >
                      Home
                    </NavLink>
                    <NavLink
                      to="/products"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`
                      }
                    >
                      Products
                    </NavLink>
                    <NavLink
                      to="/orders"
                      onClick={() => setMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `block rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-50 text-primary-600'
                            : 'text-neutral-700 hover:bg-neutral-50'
                        }`
                      }
                    >
                      My Orders
                    </NavLink>
                  </nav>
                </div>

                {/* Drawer Footer */}
                <div className="border-t border-neutral-200 p-4">
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      navigate('/signin');
                    }}
                  >
                    <User className="h-4 w-4" />
                    Sign In
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
