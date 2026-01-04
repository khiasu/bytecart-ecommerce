import { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@contexts/CartContext';
import Badge from './Badge';
import CartDrawer from '../cart/CartDrawer';

/**
 * CartIconButton
 * 
 * Shopping cart icon button with badge count and drawer toggle.
 */
export default function CartIconButton() {
  const { getCartCount } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cartCount = getCartCount();

  return (
    <>
      <button
        type="button"
        onClick={() => setIsDrawerOpen(true)}
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100 transition-colors"
        aria-label={`Shopping cart with ${cartCount} items`}
      >
        <ShoppingCart className="h-5 w-5" />
        <AnimatePresence>
          {cartCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
              className="absolute -top-1 -right-1"
            >
              <Badge
                variant="error"
                size="sm"
                className="min-w-[20px] h-5 flex items-center justify-center px-1"
              >
                {cartCount > 9 ? '9+' : cartCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <CartDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}

