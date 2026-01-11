import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, QrCode, CheckCircle, AlertCircle, Package } from 'lucide-react';
import { useCart } from '@contexts/CartContext';
import { useAuth } from '@contexts/AuthContext';
import { useOrders } from '@contexts/OrdersContext';
import { formatPrice } from '@utils/calculations';
import Button from '@components/common/Button';
import Card from '@components/common/Card';

export default function UPIPayment() {
  const navigate = useNavigate();
  const { items, getCartCount, getCartTotals, clearCart } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending, success, error
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);

  const totals = getCartTotals();
  const totalAmount = totals.total;
  const totalItems = getCartCount();

  // Generate UPI payment string
  const upiId = 'khiasu2vis@oksbi'; // Your actual UPI ID
  const merchantName = 'ByteCart';
  const transactionNote = `Payment for ${totalItems} items`;

  const upiPaymentString = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(merchantName)}&am=${totalAmount}&cu=INR&tn=${encodeURIComponent(transactionNote)}`;

  // Handle payment completion and place order
  const handlePaymentComplete = async () => {
    setLoading(true);
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shipping: {
          firstName: user?.firstName || 'Guest',
          lastName: user?.lastName || 'User',
          email: user?.email || 'guest@example.com',
          phone: user?.phone || '0000000000',
          address: user?.address || 'Will be collected',
          city: user?.city || 'Will be collected',
          state: user?.state || 'Will be collected',
          zipCode: user?.zipCode || '000000',
          country: user?.country || 'India',
        },
        payment: {
          method: 'upi',
          upiId: upiId,
          transactionId: `TXN${Date.now()}`,
        },
        totals: {
          subtotal: totals.subtotal,
          tax: totals.tax,
          shipping: totals.shipping,
          total: totals.total,
        },
      };

      const newOrder = await placeOrder(orderData);
      setOrderId(newOrder.id);
      setPaymentStatus('success');
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      setPaymentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyUPI = () => {
    navigator.clipboard.writeText(upiId);
    // You could show a toast notification here
  };

  if (items.length === 0) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <div className="rounded-xl bg-yellow-50 border border-yellow-200 p-8 dark:bg-yellow-900/20 dark:border-yellow-800">
              <AlertCircle className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Your cart is empty
              </h2>
              <p className="text-yellow-700 dark:text-yellow-300 mb-6">
                Add some items to your cart before proceeding to payment.
              </p>
              <Link to="/products">
                <Button variant="primary">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (paymentStatus === 'success') {
    return (
      <section className="py-10">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
              </motion.div>
              <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-2">
                🎉 Payment Successful!
              </h1>
              <p className="text-neutral-600 mb-4">
                Your order has been placed successfully. Order ID: <strong className="text-primary-600">{orderId}</strong>
              </p>
              
              {/* Important Notice Box */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">📱</span>
                  <h3 className="font-semibold text-blue-900">Important Notice</h3>
                </div>
                <p className="text-blue-800 text-sm">
                  Upon verification, your order details will be sent to your registered WhatsApp and mobile number via SMS.
                </p>
                <p className="text-blue-700 text-xs mt-2">
                  Please keep your phone handy for order confirmation.
                </p>
              </div>
              
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={() => navigate('/products')}>
                  Continue Shopping
                </Button>
                <Button onClick={() => navigate('/orders')}>
                  View Orders
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <nav className="mb-6 text-sm text-neutral-600">
          <ol className="flex items-center gap-2">
            <li>
              <Link to="/cart" className="hover:text-primary-600 transition-colors">
                Cart
              </Link>
            </li>
            <li>/</li>
            <li className="text-neutral-900">UPI Payment</li>
          </ol>
        </nav>

        <div className="max-w-2xl mx-auto">
          {/* Order Summary */}
          <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950 mb-6">
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Items ({totalItems})</span>
                <span className="text-neutral-900 dark:text-neutral-100">{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-600 dark:text-neutral-400">Delivery</span>
                <span className="text-neutral-900 dark:text-neutral-100">FREE</span>
              </div>
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-3">
                <div className="flex justify-between font-semibold">
                  <span className="text-neutral-900 dark:text-neutral-100">Total</span>
                  <span className="text-primary-600 dark:text-primary-400 text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          {paymentStatus === 'error' && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-6 dark:bg-red-900/20 dark:border-red-800 mb-6">
              <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-2 text-center">
                Payment Failed
              </h2>
              <p className="text-red-700 dark:text-red-300 text-center mb-4">
                Something went wrong with your payment. Please try again.
              </p>
              <div className="text-center">
                <Button onClick={() => setPaymentStatus('pending')} variant="primary">
                  Try Again
                </Button>
              </div>
            </div>
          )}

          {/* UPI Payment Section */}
          {paymentStatus === 'pending' && (
            <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-soft dark:border-neutral-800 dark:bg-neutral-950">
              <div className="text-center mb-6">
                <QrCode className="h-16 w-16 text-primary-600 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                  Scan & Pay with UPI
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Scan the QR code below or copy the UPI ID to make payment
                </p>
              </div>

              <div className="flex flex-col items-center space-y-6">
                {/* QR Code */}
                <div className="relative">
                  <div className="w-64 h-64 bg-white border-2 border-neutral-300 rounded-lg flex items-center justify-center dark:bg-neutral-800 dark:border-neutral-600 p-4">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiPaymentString)}`}
                      alt="UPI QR Code"
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to placeholder if QR generation fails
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial' font-size='14' fill='%23666' text-anchor='middle' dy='.3em'%3EQR Code%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </div>

                {/* UPI Details */}
                <div className="w-full max-w-sm">
                  <div className="bg-neutral-50 dark:bg-neutral-800 rounded-lg p-4 border border-neutral-200 dark:border-neutral-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-neutral-600 dark:text-neutral-400">UPI ID:</span>
                      <button
                        onClick={handleCopyUPI}
                        className="text-xs text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        Copy
                      </button>
                    </div>
                    <p className="font-mono text-sm text-neutral-900 dark:text-neutral-100 select-all">
                      {upiId}
                    </p>
                    <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-700">
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-1">
                        Amount to Pay:
                      </p>
                      <p className="font-bold text-lg text-primary-600 dark:text-primary-400">
                        {formatPrice(totalAmount)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 w-full max-w-sm">
                  <Button
                    variant="primary"
                    onClick={handlePaymentComplete}
                    loading={loading}
                    className="flex-1"
                  >
                    {loading ? 'Processing...' : 'I\'ve Paid'}
                  </Button>
                </div>
              </div>

              {/* Instructions */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">How to Pay:</h3>
                <ol className="text-sm text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                  <li>Open your UPI app (Google Pay, PhonePe, Paytm, etc.)</li>
                  <li>Scan the QR code or enter the UPI ID</li>
                  <li>Verify the amount ({formatPrice(totalAmount)}) and pay</li>
                  <li>Click "I've Paid" after successful payment</li>
                </ol>
              </div>
            </div>
          )}

          {/* Back Button */}
          <div className="mt-6 text-center">
            <Link to="/cart">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
