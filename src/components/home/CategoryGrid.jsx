import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '@contexts/ProductsContext';
import Button from '@components/common/Button';

/**
 * CategoryGrid
 * 
 * Displays categories in a 2x2 grid with images, overlays, and hover effects.
 */
export default function CategoryGrid() {
  const navigate = useNavigate();
  const { categories, getProductsByCategory } = useProducts();

  // Filter to show only 4 main categories
  const mainCategories = categories.slice(0, 4);

  if (mainCategories.length === 0) {
    return null;
  }

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  return (
    <section className="py-12">
      <div className="container">
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
          {mainCategories.map((category, index) => {
            const products = getProductsByCategory(category.slug);
            const productCount = products.length;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className="relative group cursor-pointer h-64 tablet:h-80"
                onClick={() => handleCategoryClick(category.slug)}
              >
                {/* Background Image */}
                <motion.div
                  className="absolute inset-0 rounded-xl overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width="600"
                    height="400"
                  />
                </motion.div>

                {/* Dark Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 rounded-xl"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 0.9 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="font-heading text-3xl tablet:text-4xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-4">
                    {productCount} {productCount === 1 ? 'product' : 'products'}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.slug);
                      }}
                      className="border-white/30 bg-white/10 text-white hover:bg-white/20 w-fit"
                    >
                      Shop Now
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

