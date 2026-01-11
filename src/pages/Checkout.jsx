import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, MapPin, Package, CheckCircle2, User, Mail, Phone, DollarSign } from 'lucide-react';
import { useCart } from '@contexts/CartContext';
import { useOrders } from '@contexts/OrdersContext';
import { useAuth } from '@contexts/AuthContext';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Card from '@components/common/Card';
import { formatPrice } from '@utils/calculations';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getCartTotals, clearCart } = useCart();
  const { placeOrder, loading } = useOrders();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    // Shipping Information
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
  });

  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const totals = getCartTotals();

  // Redirect if cart is empty
  if (items.length === 0 && !orderPlaced) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-neutral-600 mb-6">
              Add some items to your cart before checkout.
            </p>
            <Button onClick={() => navigate('/products')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Shipping validation
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      const orderData = {
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        })),
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        payment: {
          method: 'cod',
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
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  if (orderPlaced) {
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
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
              </motion.div>
              <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-2">
                Order Placed Successfully!
              </h1>
              <p className="text-neutral-600 mb-4">
                Your order has been confirmed. Order ID: <strong>{orderId}</strong>
              </p>
              <p className="text-sm text-neutral-500 mb-6">
                Upon verification, your order details will be sent to your registered WhatsApp and mobile number via SMS.
              </p>
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
        <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 desktop:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="desktop:col-span-2 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <h2 className="font-heading text-xl font-semibold text-neutral-900">
                    Shipping Information
                  </h2>
                </div>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  <Input
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    error={errors.firstName}
                    required
                  />
                  <Input
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    error={errors.lastName}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={errors.phone}
                    required
                  />
                  <Input
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    error={errors.address}
                    className="tablet:col-span-2"
                    required
                  />
                  <Input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    error={errors.city}
                    required
                  />
                  <Input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    error={errors.state}
                    required
                  />
                  <Input
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    error={errors.zipCode}
                    required
                  />
                  <Input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="tablet:col-span-2"
                    required
                  />
                </div>
              </Card>

              {/* Payment Information */}
              <Card className="p-6 mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary-600" />
                  <h2 className="font-heading text-xl font-semibold text-neutral-900">
                    Payment Method
                  </h2>
                </div>
                
                {/* Payment Options */}
                <div className="space-y-3">
                  <div 
                    className="p-4 bg-green-50 border border-green-200 rounded-lg cursor-pointer hover:bg-green-100 transition-colors"
                    onClick={() => {
                      // COD is already selected, just continue
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                        <DollarSign className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-green-900">Cash on Delivery (COD)</p>
                        <p className="text-sm text-green-700">Pay when you receive your order</p>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="p-4 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer hover:bg-blue-100 transition-colors"
                    onClick={() => navigate('/upi-payment')}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">UPI</span>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-900">Pay with UPI</p>
                        <p className="text-sm text-blue-700">Scan QR code and pay instantly</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/cart')}
                >
                  Back to Cart
                </Button>
                <Button type="submit" loading={loading} className="flex-1">
                  Place Order
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="desktop:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Package className="h-5 w-5 text-primary-600" />
                <h2 className="font-heading text-xl font-semibold text-neutral-900">
                  Order Summary
                </h2>
              </div>

              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                      loading="lazy"
                      width="64"
                      height="64"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-neutral-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-neutral-200 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Subtotal</span>
                  <span className="text-neutral-900">{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Tax</span>
                  <span className="text-neutral-900">{formatPrice(totals.tax)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-600">Shipping</span>
                  <span className="text-neutral-900">
                    {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                  </span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-neutral-200">
                  <span className="text-neutral-900">Total</span>
                  <span className="text-primary-600">{formatPrice(totals.total)}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

