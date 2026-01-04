import { motion } from 'framer-motion';
import { Truck, Headphones, ShieldCheck, Lock } from 'lucide-react';
import Card from '@components/common/Card';

/**
 * ValueProps
 *
 * Highlights 4 key value propositions with icons and descriptions.
 */
export default function ValueProps() {
  const items = [
    {
      title: 'Free Shipping',
      description: 'On orders over ₹2000',
      icon: Truck,
    },
    {
      title: '24/7 Customer Support',
      description: "We're here to help anytime",
      icon: Headphones,
    },
    {
      title: 'Money Back Guarantee',
      description: '30-day return policy',
      icon: ShieldCheck,
    },
    {
      title: 'Secure Payment',
      description: '100% secure transactions',
      icon: Lock,
    },
  ];

  return (
    <section className="py-12 bg-neutral-50">
      <div className="container">
        <div className="grid gap-6 tablet:grid-cols-2 desktop:grid-cols-4">
          {items.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  hoverable
                  className="p-6 text-center border border-neutral-200 bg-white"
                >
                  <div className="flex flex-col items-center">
                    <div className="grid h-16 w-16 place-items-center rounded-full bg-primary-100 text-primary-600 mb-4">
                      <Icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
