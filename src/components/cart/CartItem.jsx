import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useCart } from '@contexts/CartContext';
import { useToast } from '@components/common/Toast';
import { formatPrice } from '@utils/calculations';
import Badge from '@components/common/Badge';

/**
 * CartItem
 * 
 * Individual cart item with quantity controls and remove functionality.
 */
export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(item.quantity);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Sync quantity with item changes
  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity]);

  // Debounced quantity update
  useEffect(() => {
    if (quantity !== item.quantity && !isUpdating) {
      setIsUpdating(true);
      const timer = setTimeout(() => {
        if (quantity >= 1 && quantity <= 10) {
          updateQuantity(item.id, quantity);
        } else if (quantity < 1) {
          handleRemove();
        } else {
          setQuantity(10);
          showToast('Maximum quantity is 10', 'warning');
        }
        setIsUpdating(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [quantity, item.id, item.quantity, updateQuantity, isUpdating, showToast]);

  // Handle quantity change
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      handleRemove();
      return;
    }
    if (newQuantity > 10) {
      showToast('Maximum quantity is 10', 'warning');
      return;
    }
    setQuantity(newQuantity);
  };

  // Handle increment
  const handleIncrement = () => {
    if (quantity >= 10) {
      showToast('Maximum quantity is 10', 'warning');
      return;
    }
    handleQuantityChange(quantity + 1);
  };

  // Handle decrement
  const handleDecrement = () => {
    if (quantity <= 1) {
      handleRemove();
      return;
    }
    handleQuantityChange(quantity - 1);
  };

  // Handle remove
  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      removeFromCart(item.id);
      showToast(`${item.name} removed from cart`, 'info');
    }, 200);
  };

  // Check if out of stock
  const isOutOfStock = !item.inStock;

  if (isRemoving) {
    return (
      <motion.div
        initial={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{ duration: 0.2 }}
      />
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
      className="flex gap-4"
    >
      {/* Product Thumbnail */}
      <div className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover"
          loading="lazy"
          width="80"
          height="80"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-neutral-900 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-sm text-neutral-600 mt-1">
          {formatPrice(item.price)} each
        </p>

        {/* Out of Stock Badge */}
        {isOutOfStock && (
          <Badge variant="error" size="sm" className="mt-2">
            Out of Stock
          </Badge>
        )}

        {/* Quantity Controls */}
        <div className="flex items-center gap-3 mt-3">
          <div className="flex items-center gap-2 border border-neutral-200 rounded-lg">
            <button
              type="button"
              onClick={handleDecrement}
              disabled={quantity <= 1 || isUpdating}
              className="p-2 hover:bg-neutral-100 transition-colors rounded-l-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <input
              type="number"
              min="1"
              max="10"
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                if (!isNaN(value)) {
                  handleQuantityChange(value);
                }
              }}
              disabled={isUpdating || isOutOfStock}
              className="w-12 text-center text-sm font-medium border-0 focus:outline-none disabled:opacity-50"
            />
            <button
              type="button"
              onClick={handleIncrement}
              disabled={quantity >= 10 || isUpdating || isOutOfStock}
              className="p-2 hover:bg-neutral-100 transition-colors rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          {/* Line Total */}
          <div className="ml-auto">
            <p className="font-semibold text-neutral-900">
              {formatPrice(item.price * quantity)}
            </p>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <div className="flex-shrink-0">
        <button
          type="button"
          onClick={handleRemove}
          className="p-2 text-neutral-600 hover:text-red-600 transition-colors"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    inStock: PropTypes.bool.isRequired,
  }).isRequired,
};

