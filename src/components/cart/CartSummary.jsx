import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useCart } from '@contexts/CartContext';
import { formatPrice } from '@utils/calculations';
import Button from '@components/common/Button';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST, TAX_RATE } from '@utils/constants';

/**
 * CartSummary
 * 
 * Displays cart totals, shipping, tax, and checkout button.
 */
export default function CartSummary({ onCheckout }) {
  const { getCartTotals, items } = useCart();
  const totals = getCartTotals();

  const needsForFreeShipping = FREE_SHIPPING_THRESHOLD - totals.subtotal;
  const progressToFreeShipping = Math.min(
    (totals.subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100
  );

  return (
    <div>
      {/* Free Shipping Progress */}
      {totals.subtotal < FREE_SHIPPING_THRESHOLD && totals.subtotal > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 bg-primary-50 rounded-lg"
        >
          <p className="text-sm text-primary-700 mb-2">
            Add {formatPrice(needsForFreeShipping)} more for <strong>FREE shipping</strong>!
          </p>
          <div className="w-full bg-primary-100 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressToFreeShipping}%` }}
              transition={{ duration: 0.5 }}
              className="bg-primary-600 h-2 rounded-full"
            />
          </div>
        </motion.div>
      )}

      {/* Summary Rows */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Subtotal</span>
          <span className="text-neutral-900 font-medium">
            {formatPrice(totals.subtotal)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Shipping</span>
          <span className="text-neutral-900 font-medium">
            {totals.shipping === 0 ? (
              <span className="text-green-600 font-semibold">FREE</span>
            ) : (
              formatPrice(totals.shipping)
            )}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-neutral-600">Tax</span>
          <span className="text-neutral-900 font-medium">
            {formatPrice(totals.tax)}
          </span>
        </div>

        <div className="border-t border-neutral-200 pt-3 mt-3">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-neutral-900">Total</span>
            <motion.span
              key={totals.total}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              className="text-2xl font-bold text-primary-600"
            >
              {formatPrice(totals.total)}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Checkout Button */}
      <Button
        className="w-full mt-6"
        size="lg"
        onClick={onCheckout}
        disabled={items.length === 0}
      >
        Proceed to Checkout
      </Button>

      {/* Discount Code (Scaffold) */}
      <div className="mt-4 pt-4 border-t border-neutral-200">
        <p className="text-xs text-neutral-500 text-center">
          Promo code feature coming soon
        </p>
      </div>
    </div>
  );
}

CartSummary.propTypes = {
  onCheckout: PropTypes.func.isRequired,
};

