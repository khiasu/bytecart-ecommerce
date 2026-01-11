import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Check } from 'lucide-react';
import Card from '@components/common/Card';
import Image from '@components/common/Image';
import Rating from '@components/common/Rating';
import Button from '@components/common/Button';
import Badge from '@components/common/Badge';
import { useCart } from '@contexts/CartContext';
import { useToast } from '@components/common/Toast';
import { calculateDiscount, formatPrice } from '@utils/calculations';

const WISHLIST_STORAGE_KEY = 'bytecart_wishlist';

/**
 * ProductCard
 * 
 * Displays a single product with image, details, rating, price, and actions.
 * Features: wishlist, add to cart, hover effects, out of stock overlay.
 */
export default function ProductCard({ product }) {
  const { addToCart, isInCart } = useCart();
  const { showToast } = useToast();
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load wishlist status from localStorage
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
      setIsWishlisted(wishlist.includes(product.id));
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  }, [product.id]);

  // Toggle wishlist
  const toggleWishlist = (e) => {
    e.stopPropagation();
    try {
      const wishlist = JSON.parse(localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
      let updatedWishlist;
      
      if (isWishlisted) {
        updatedWishlist = wishlist.filter(id => id !== product.id);
        showToast('Removed from wishlist', 'info');
      } else {
        updatedWishlist = [...wishlist, product.id];
        showToast('Added to wishlist', 'success');
      }
      
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(updatedWishlist));
      setIsWishlisted(!isWishlisted);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      showToast('Failed to update wishlist', 'error');
    }
  };

  // Handle add to cart
  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!product.inStock || isAdding) return;

    setIsAdding(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart(product, 1);
    setIsAdding(false);
    setShowSuccess(true);
    showToast('Added to cart!', 'success');
    
    // Hide success animation after 2 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 2000);
  };

  const discount = product.originalPrice 
    ? calculateDiscount(product.originalPrice, product.price) 
    : 0;
  
  const inCart = isInCart(product.id);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.15 }}
    >
      <Card
        hoverable
        className="overflow-hidden relative shadow-md hover:shadow-lg transition-shadow duration-150 bg-white dark:bg-neutral-800"
      >
        {/* Image Section */}
        <div className="relative overflow-hidden bg-neutral-100 dark:bg-neutral-700">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
            className="relative"
          >
            <Image
              src={product.image}
              alt={product.name}
              aspectRatio="1/1"
              className="rounded-none"
            />
          </motion.div>

          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute left-3 top-3 z-10">
              <Badge variant="error" size="sm">
                -{discount}%
              </Badge>
            </div>
          )}

          {/* Wishlist Button */}
          <motion.button
            type="button"
            onClick={toggleWishlist}
            className={`
              absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full
              transition-all duration-200
              ${isWishlisted 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-neutral-900 hover:bg-white'
              }
              shadow-soft
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={false}
            animate={isWishlisted ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3 }}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={`h-4 w-4 ${isWishlisted ? 'fill-current' : ''}`}
              aria-hidden="true"
            />
          </motion.button>

          {/* Out of Stock Overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="p-3 tablet:p-5">
          {/* Product Name */}
          <h3 className="font-heading text-sm tablet:text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
            {product.name}
          </h3>

          {/* Description - Hidden on mobile for space */}
          <p className="hidden tablet:block mt-2 text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {product.description}
          </p>

          {/* Rating */}
          <div className="mt-2 tablet:mt-3">
            <Rating rating={product.rating} reviews={product.reviews} size="sm" />
          </div>

          {/* Price Section */}
          <div className="mt-2 tablet:mt-4 flex items-center gap-2">
            <span className="text-base tablet:text-xl font-bold text-primary-600 dark:text-primary-400">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <>
                <span className="hidden tablet:inline text-sm text-neutral-500 dark:text-neutral-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                {discount > 0 && (
                  <Badge variant="default" size="sm" className="bg-green-100 text-green-800">
                    {discount}% OFF
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Add to Cart Button */}
          <div className="mt-3 tablet:mt-4 relative">
            <Button
              variant={inCart ? "secondary" : "primary"}
              className="w-full"
              onClick={handleAddToCart}
              disabled={!product.inStock || isAdding}
              loading={isAdding}
            >
              {!product.inStock 
                ? 'Out of Stock' 
                : showSuccess 
                  ? 'Added!' 
                  : inCart 
                    ? 'In Cart' 
                    : 'Add to Cart'
              }
            </Button>

            {/* Success Animation */}
            <AnimatePresence>
              {showSuccess && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  >
                    <Check className="h-6 w-6 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

