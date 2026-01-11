import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@contexts/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';
import Button from '@components/common/Button';

/**
 * CartDrawer
 * 
 * Slide-out shopping cart drawer with items, summary, and checkout.
 */
export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { items, getCartCount } = useCart();
  const cartCount = getCartCount();

  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle checkout
  const handleCheckout = () => {
    if (items.length === 0) return;
    onClose();
    navigate('/checkout');
  };

  // Handle continue shopping
  const handleContinueShopping = () => {
    onClose();
    navigate('/products');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed right-0 top-0 h-full w-full tablet:max-w-[400px] bg-white shadow-2xl z-50 flex flex-col max-h-screen"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-neutral-200">
              <div>
                <h2 className="font-heading text-2xl font-bold text-neutral-900">
                  Shopping Cart
                </h2>
                <p className="text-sm text-neutral-600 mt-1">
                  {cartCount} {cartCount === 1 ? 'item' : 'items'}
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <ShoppingCart className="h-24 w-24 text-neutral-300 mx-auto mb-4" />
                </motion.div>
                <h3 className="font-heading text-xl font-semibold text-neutral-900 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-neutral-600 mb-6">
                  Add some products to get started!
                </p>
                <Button onClick={handleContinueShopping}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items List */}
                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <CartItem item={item} />
                        {index < items.length - 1 && (
                          <div className="border-t border-neutral-200 mt-4" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cart Summary (Sticky Bottom) */}
                <div className="border-t border-neutral-200 bg-white p-6">
                  <CartSummary onCheckout={handleCheckout} />
                  <div className="mt-4 pt-4 border-t border-neutral-200">
                    <button
                      type="button"
                      onClick={handleContinueShopping}
                      className="w-full text-center text-sm text-primary-600 hover:text-primary-700 transition-colors"
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

CartDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

