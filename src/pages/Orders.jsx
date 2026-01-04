import { useOrders } from '@contexts/OrdersContext';
import Card from '@components/common/Card';
import Button from '@components/common/Button';
import Badge from '@components/common/Badge';
import { Package, Calendar, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@utils/calculations';
import { useNavigate } from 'react-router-dom';

function OrderStatusBadge({ status }) {
  const variants = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-purple-100 text-purple-800',
    delivered: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  return (
    <Badge variant="default" className={variants[status] || 'bg-neutral-100 text-neutral-800'}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function Orders() {
  const { orders, loading } = useOrders();
  const navigate = useNavigate();

  if (loading) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="text-center">
            <p className="text-neutral-600">Loading orders...</p>
          </div>
        </div>
      </section>
    );
  }

  if (orders.length === 0) {
    return (
      <section className="py-10">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
            <h1 className="font-heading text-3xl font-semibold text-neutral-900 mb-2">
              No Orders Yet
            </h1>
            <p className="text-neutral-600 mb-6">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </div>
        </div>
      </section>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="py-10">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-heading text-3xl font-semibold text-neutral-900">
            My Orders
          </h1>
          <Button variant="outline" onClick={() => navigate('/products')}>
            Continue Shopping
          </Button>
        </div>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id} className="p-6">
              {/* Order Header */}
              <div className="flex flex-col tablet:flex-row tablet:items-center tablet:justify-between gap-4 mb-6 pb-6 border-b border-neutral-200">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-neutral-600">Order ID</p>
                      <p className="font-semibold text-neutral-900">{order.id}</p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col tablet:flex-row tablet:items-center gap-4">
                  <OrderStatusBadge status={order.status} />
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(order.createdAt)}</span>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                      loading="lazy"
                      width="80"
                      height="80"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-neutral-900 truncate">{item.name}</p>
                      <p className="text-sm text-neutral-600">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-neutral-900 mt-1">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Shipping Information */}
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 mb-6 p-4 bg-neutral-50 rounded-lg">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-neutral-600" />
                    <p className="text-sm font-semibold text-neutral-900">Shipping Address</p>
                  </div>
                  <p className="text-sm text-neutral-600">
                    {order.shipping.firstName} {order.shipping.lastName}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {order.shipping.address}
                  </p>
                  <p className="text-sm text-neutral-600">
                    {order.shipping.city}, {order.shipping.state} {order.shipping.zipCode}
                  </p>
                  <p className="text-sm text-neutral-600">{order.shipping.country}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-neutral-600" />
                    <p className="text-sm font-semibold text-neutral-900">Payment Method</p>
                  </div>
                  <p className="text-sm text-neutral-600 capitalize">
                    {order.payment.method}
                  </p>
                  {order.payment.cardLast4 && (
                    <p className="text-sm text-neutral-600">
                      •••• {order.payment.cardLast4}
                    </p>
                  )}
                </div>
              </div>

              {/* Order Totals */}
              <div className="flex justify-end">
                <div className="w-full tablet:w-auto tablet:min-w-[300px] space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="text-neutral-900">{formatPrice(order.totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Tax</span>
                    <span className="text-neutral-900">{formatPrice(order.totals.tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-600">Shipping</span>
                    <span className="text-neutral-900">
                      {order.totals.shipping === 0 ? 'Free' : formatPrice(order.totals.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t border-neutral-200">
                    <span className="text-neutral-900">Total</span>
                    <span className="text-primary-600">{formatPrice(order.totals.total)}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
