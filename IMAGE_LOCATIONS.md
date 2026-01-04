# Image Locations Guide

This document lists all locations where images are used in the codebase so you can manually update them.

## 1. Banner Images (Hero Carousel)
**File:** `src/data/banners.json`
- Lines 8, 17, 26
- Format: `"image": "https://picsum.photos/seed/banner1/1920/600.jpg"`
- Used in: `src/components/home/HeroCarousel.jsx`

## 2. Category Images
**File:** `src/data/categories.json`
- Lines 6, 13, 20, 27
- Format: `"image": "https://picsum.photos/seed/laptops/400/300.jpg"`
- Used in: Category grid components

## 3. Product Images
**File:** `src/data/products.json`
- Lines 10, 23, 35, 48, 61, 74, 86, 99, 111, 123, 136, 149, 162, 174, 187, 200, 212, 224
- Format: `"image": "https://picsum.photos/seed/laptop1/400/400.jpg"`
- Used in: Product cards, product details, cart, orders

## 4. Component-Level Images
### ProductCard Component
**File:** `src/components/product/ProductCard.jsx`
- Uses product images from products.json
- Line 112-119: Renders product image with lazy loading

### Orders Page
**File:** `src/pages/Orders.jsx`
- Line 112-119: Renders order item images
- Uses same image URLs from products.json

## 5. Static/Icon Images
The site uses Lucide React icons throughout, no static image files needed.

## 6. Image Specifications
- **Banner images:** 1920x600px (recommended)
- **Category images:** 400x300px (recommended)
- **Product images:** 400x400px (recommended, square format works best)

## 7. How to Update
1. Replace the URLs in the JSON files listed above
2. Maintain the same structure and keys
3. Use HTTPS URLs for better security
4. Test images load properly across different screen sizes

## 8. Current Placeholder Service
Currently using `picsum.photos` with seed values for consistent placeholders:
- Format: `https://picsum.photos/seed/[SEED]/[WIDTH]/[HEIGHT].jpg`
- Seeds: banner1, banner2, banner3, laptops, phones, tablets, etc.

Replace these with your actual product/category images.
