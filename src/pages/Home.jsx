import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import CategoryHighlights from '@components/organisms/CategoryHighlights/CategoryHighlights'
import FeaturedProducts from '@components/organisms/FeaturedProducts/FeaturedProducts'
import { HeroCarousel, CategoryGrid } from '@components/home'
import NewsletterSection from '@components/organisms/NewsletterSection/NewsletterSection'
import ValueProps from '@components/organisms/ValueProps/ValueProps'

/**
 * SectionWrapper
 * Adds scroll animations to sections
 */
function SectionWrapper({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div>
      <HeroCarousel />
      <SectionWrapper delay={0.1}>
        <CategoryGrid />
      </SectionWrapper>
      <SectionWrapper delay={0.2}>
        <FeaturedProducts />
      </SectionWrapper>
      <SectionWrapper delay={0.3}>
        <ValueProps />
      </SectionWrapper>
      <SectionWrapper delay={0.4}>
        <NewsletterSection />
      </SectionWrapper>
    </div>
  )
}
