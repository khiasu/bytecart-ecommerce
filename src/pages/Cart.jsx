import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@contexts/CartContext';
import Button from '@components/common/Button';
import Card from '@components/common/Card';
import { formatPrice } from '@utils/calculations';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, getCartTotals, clearCart } = useCart();
  const totals = getCartTotals();
  
  // Debug: Log cart items
  console.log('Cart items:', items);
  console.log('Cart totals:', totals);

  if (items.length === 0) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-2">
              Your cart is empty
            </h1>
            <p className="text-neutral-600 mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Button onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleIncrement = (productId, currentQuantity) => {
    updateQuantity(productId, currentQuantity + 1);
  };

  const handleDecrement = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      updateQuantity(productId, currentQuantity - 1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900">
            Shopping Cart
          </h1>
          <Button variant="outline" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>

        <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="desktop:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex gap-4">
                  {/* Product Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-lg object-cover"
                    loading="lazy"
                    width="96"
                    height="96"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {formatPrice(item.price)} each
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-neutral-200 rounded-lg">
                        <button
                          type="button"
                          onClick={() => handleDecrement(item.id, item.quantity)}
                          className="p-2 hover:bg-neutral-100 transition-colors rounded-l-lg"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={item.quantity}
                          onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (!isNaN(value)) {
                              handleQuantityChange(item.id, value);
                            }
                          }}
                          className="w-12 text-center text-sm font-medium border-0 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleIncrement(item.id, item.quantity)}
                          disabled={item.quantity >= 10}
                          className="p-2 hover:bg-neutral-100 transition-colors rounded-r-lg disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-neutral-600 hover:text-red-600 transition-colors"
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-right">
                    <p className="font-semibold text-neutral-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Clear Cart Button */}
            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={clearCart}
                className="text-red-600 hover:text-red-700"
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="desktop:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-heading text-xl font-semibold text-neutral-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Items ({totals.itemCount})</span>
                  <span className="text-neutral-900">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="text-neutral-900">{formatPrice(totals.tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">
                    {totals.shipping === 0 ? (
                      <span className="text-green-600">Free</span>
                    ) : (
                      formatPrice(totals.shipping)
                    )}
                  </span>
                </div>
              </div>

              <div className="border-t border-neutral-200 pt-4 mb-6">
                <div className="flex justify-between font-semibold text-lg">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-primary-600">{formatPrice(totals.total)}</span>
                </div>
              </div>

              {totals.subtotal < 2000 && (
                <div className="mb-6 p-3 bg-primary-50 rounded-lg text-sm text-primary-700">
                  <p>
                    Add {formatPrice(2000 - totals.subtotal)} more for free shipping!
                  </p>
                </div>
              )}

              <div className="space-y-3 border-t border-neutral-200 pt-6">
                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/upi-payment')}
                >
                  📱 Pay with UPI
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={() => navigate('/checkout')}
                >
                  💵 Cash on Delivery (COD)
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
