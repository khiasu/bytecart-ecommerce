import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '@components/common/Button';
import bannersData from '../../data/banners.json';

/**
 * HeroCarousel
 * 
 * Promotional carousel with auto-play, manual navigation, swipe gestures, and accessibility.
 * 
 * Features:
 * - Auto-play (5s interval, pauses on hover)
 * - Manual navigation (arrows, dots)
 * - Swipe gestures (mobile)
 * - Keyboard navigation
 * - Smooth animations with Framer Motion
 * - Fully responsive
 */
export default function HeroCarousel() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const autoPlayTimerRef = useRef(null);
  const resumeTimerRef = useRef(null);

  const slides = bannersData;

  // Minimum swipe distance (in pixels)
  const minSwipeDistance = 50;

  // Detect mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  /**
   * Pause auto-play temporarily
   */
  const pauseAutoPlay = useCallback(() => {
    setIsPaused(true);
    // Clear any existing resume timer
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
    // Resume after 2 seconds of inactivity
    resumeTimerRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 2000);
  }, []);

  /**
   * Navigate to next slide
   */
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    pauseAutoPlay();
  }, [slides.length, pauseAutoPlay]);

  /**
   * Navigate to previous slide
   */
  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    pauseAutoPlay();
  }, [slides.length, pauseAutoPlay]);

  /**
   * Navigate to specific slide
   */
  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
    pauseAutoPlay();
  }, [pauseAutoPlay]);

  /**
   * Start auto-play
   */
  useEffect(() => {
    // Don't auto-play if paused or hovered (desktop only)
    if (isPaused || (isHovered && !isMobile)) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPaused, isHovered, isMobile, slides.length]);

  /**
   * Keyboard navigation
   */
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          prevSlide();
          break;
        case 'ArrowRight':
          e.preventDefault();
          nextSlide();
          break;
        case 'Escape':
          e.preventDefault();
          setIsPaused(true);
          if (resumeTimerRef.current) {
            clearTimeout(resumeTimerRef.current);
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  /**
   * Touch handlers for swipe gestures
   */
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  /**
   * Handle CTA button click
   */
  const handleCTAClick = (link, slide) => {
    if (link.startsWith('/')) {
      // If it's the "View Offers" button, navigate to /offers
      if (link.includes('products') && slide.ctaText?.toLowerCase().includes('offer')) {
        navigate('/offers');
      } else {
        navigate(link);
      }
    } else {
      window.location.href = link;
    }
  };

  /**
   * Preload next slide image
   */
  useEffect(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    const nextSlide = slides[nextIndex];
    if (nextSlide?.image) {
      const img = new Image();
      img.src = nextSlide.image;
    }
  }, [currentSlide, slides]);

  /**
   * Get background style for slide
   */
  const getBackgroundStyle = (slide) => {
    // Convert hex color to RGB for gradient
    const hex = slide.bgColor || '#3b82f6';
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return {
      background: slide.image 
        ? `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.92) 0%, rgba(${r}, ${g}, ${b}, 0.85) 50%, rgba(${r}, ${g}, ${b}, 0.75) 100%), url(${slide.image})`
        : `linear-gradient(135deg, rgba(${r}, ${g}, ${b}, 0.95) 0%, rgba(${r}, ${g}, ${b}, 0.85) 100%)`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
      }
      if (resumeTimerRef.current) {
        clearTimeout(resumeTimerRef.current);
      }
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Promotional carousel"
    >
      <div className="relative h-[350px] tablet:h-[400px] desktop:h-[500px]">
        <AnimatePresence mode="wait" initial={false}>
          {slides.map((slide, index) => {
            if (index !== currentSlide) return null;

            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute inset-0"
                style={getBackgroundStyle(slide)}
                aria-label={`Slide ${index + 1} of ${slides.length}: ${slide.title}`}
                role="group"
                aria-roledescription="slide"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, info) => {
                  const threshold = 50;
                  if (info.offset.x > threshold) {
                    prevSlide();
                  } else if (info.offset.x < -threshold) {
                    nextSlide();
                  }
                }}
              >
                {/* Content Container */}
                <div className="container relative h-full flex items-center">
                  <div className="max-w-2xl">
                    {/* Headline */}
                    <motion.h1
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="font-heading text-4xl font-bold leading-tight text-white tablet:text-5xl desktop:text-6xl"
                    >
                      {slide.title}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.4 }}
                      className="mt-4 text-lg text-white/90 tablet:text-xl desktop:text-2xl"
                    >
                      {slide.subtitle}
                    </motion.p>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-6"
                    >
                      <Button
                        variant="secondary"
                        size="lg"
                        onClick={() => handleCTAClick(slide.ctaLink, slide)}
                        className="shadow-lg"
                        ariaLabel={slide.ctaText}
                      >
                        {slide.ctaText}
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 flex items-center">
          <motion.button
            type="button"
            onClick={prevSlide}
            className={`
              absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-200
              hover:bg-white/30 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
              tablet:left-6
              ${isHovered || isMobile ? 'opacity-100' : 'opacity-0'}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center">
          <motion.button
            type="button"
            onClick={nextSlide}
            className={`
              absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition-all duration-200
              hover:bg-white/30 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
              tablet:right-6
              ${isHovered || isMobile ? 'opacity-100' : 'opacity-0'}
            `}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </motion.button>
        </div>

        {/* Dot Indicators */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((slide, index) => (
            <motion.button
              key={slide.id}
              type="button"
              onClick={() => goToSlide(index)}
              className={`
                h-2.5 rounded-full transition-all duration-300
                focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
                ${index === currentSlide ? 'w-10 bg-white' : 'w-2.5 bg-white/40 hover:bg-white/60'}
              `}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
              aria-pressed={index === currentSlide}
              role="tab"
            />
          ))}
        </div>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentSlide + 1} of ${slides.length}: ${slides[currentSlide]?.title}`}
      </div>
    </section>
  );
}

