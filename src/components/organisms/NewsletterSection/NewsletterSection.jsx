import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, CheckCircle2 } from 'lucide-react';
import Button from '@components/common/Button';
import Input from '@components/common/Input';

const SUBSCRIBERS_STORAGE_KEY = 'bytecart_subscribers';

/**
 * NewsletterSection
 * 
 * Email subscription form with validation and localStorage persistence.
 */
export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // Email validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate email
    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      // Save to localStorage
      const subscribers = JSON.parse(
        localStorage.getItem(SUBSCRIBERS_STORAGE_KEY) || '[]'
      );
      if (!subscribers.includes(email.toLowerCase())) {
        subscribers.push(email.toLowerCase());
        localStorage.setItem(SUBSCRIBERS_STORAGE_KEY, JSON.stringify(subscribers));
      }

      setIsSuccess(true);
      setEmail('');
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.3), transparent 50%)',
        }} />
      </div>

      <div className="container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.2, type: 'spring' }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white mb-6"
          >
            <Mail className="h-8 w-8" />
          </motion.div>

          {/* Headline */}
          <h2 className="font-heading text-3xl tablet:text-4xl font-bold text-white mb-4">
            Subscribe for Exclusive Updates
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Get the latest deals, new arrivals, and more delivered to your inbox
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col tablet:flex-row gap-4 max-w-md mx-auto"
          >
            <div className="flex-1">
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                  setIsSuccess(false);
                }}
                error={error}
                className="bg-white"
                autoComplete="email"
                aria-label="Email address"
              />
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                loading={isSubmitting}
                disabled={isSubmitting || isSuccess}
                className="w-full tablet:w-auto whitespace-nowrap"
              >
                {isSuccess ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </motion.div>
          </form>

          {/* Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 flex items-center justify-center gap-2 text-white"
            >
              <CheckCircle2 className="h-5 w-5" />
              <p className="text-sm font-medium">Thank you for subscribing!</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
