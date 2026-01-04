export const APP_NAME = 'ByteCart';

// Tax and shipping configuration (India)
export const TAX_RATE = 0.18; // 18% GST rate (India)
export const FREE_SHIPPING_THRESHOLD = 2000; // Free shipping for orders over ₹2000
export const SHIPPING_COST = 99; // Flat shipping cost in INR
export const MAX_QUANTITY_PER_ITEM = 10; // Maximum quantity per cart item

// Currency
export const CURRENCY = 'INR';
export const CURRENCY_SYMBOL = '₹';

// Local storage keys
export const CART_STORAGE_KEY = 'bytecart_cart';
export const USER_STORAGE_KEY = 'bytecart_user';

// Product sorting options
export const SORT_OPTIONS = {
  FEATURED: 'featured',
  PRICE_LOW_HIGH: 'price_asc',
  PRICE_HIGH_LOW: 'price_desc',
  RATING_HIGH_LOW: 'rating_desc',
  NAME_A_Z: 'name_asc',
  NAME_Z_A: 'name_desc',
};

// Product categories
export const CATEGORIES = {
  ELECTRONICS: 'electronics',
  AUDIO: 'audio',
  GAMING: 'gaming',
  ACCESSORIES: 'accessories',
};
