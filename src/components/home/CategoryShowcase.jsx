import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts } from '@contexts/ProductsContext';
import Button from '@components/common/Button';

/**
 * CategoryShowcase
 * 
 * Displays categories as cards with images, names, product counts, and shop buttons.
 */
export default function CategoryShowcase() {
  const navigate = useNavigate();
  const { categories, getProductsByCategory } = useProducts();

  const handleCategoryClick = (slug) => {
    navigate(`/products?category=${slug}`);
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold text-neutral-900">
            Shop by Category
          </h2>
          <p className="mt-2 text-neutral-600">
            Explore our curated collections
          </p>
        </div>

        <div className="grid grid-cols-1 mobile:grid-cols-2 desktop:grid-cols-4 gap-4 tablet:gap-6">
          {categories.map((category, index) => {
            const products = getProductsByCategory(category.slug);
            const productCount = products.length;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group cursor-pointer"
                onClick={() => handleCategoryClick(category.slug)}
              >
                <div className="relative h-64 rounded-xl overflow-hidden">
                  {/* Background Image */}
                  <motion.div
                    className="absolute inset-0"
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

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 0.9 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <h3 className="font-heading text-2xl font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-sm text-white/80 mb-4">
                      {productCount} {productCount === 1 ? 'product' : 'products'}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCategoryClick(category.slug);
                      }}
                      className="w-fit"
                    >
                      Shop Now
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

