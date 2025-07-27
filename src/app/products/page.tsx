'use client';

import { useState } from 'react';

// --- Icons ---
const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 4.5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4" />
  </svg>
);

const CartIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.5 4.5M7 13v8a2 2 0 002 2h6a2 2 0 002-2v-8" />
  </svg>
);

const Heart = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

const Star = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
);

const Filter = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
  </svg>
);

// --- Product Types ---
type ProductProps = {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  image: string;
  sizes: string[];
  category: string;
  rating: number;
  isNew?: boolean;
  isSale?: boolean;
  colors?: string[];
};

type CartItem = ProductProps & { selectedSize: string; selectedColor?: string; quantity: number };

// --- Expanded Products ---
const products: ProductProps[] = [
  {
    id: 1,
    name: 'Floral Summer Dress',
    price: '$49.99',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Dresses',
    rating: 4.5,
    colors: ['Floral', 'Navy', 'White']
  },
  {
    id: 2,
    name: 'Red Cocktail Dress',
    price: '$59.99',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['M', 'L', 'XL'],
    category: 'Dresses',
    rating: 4.8,
    isSale: true,
    originalPrice: '$79.99'
  },
  {
    id: 3,
    name: 'Casual White Blouse',
    price: '$34.99',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L'],
    category: 'Tops',
    rating: 4.2,
    isNew: true,
    colors: ['White', 'Cream', 'Light Blue']
  },
  {
    id: 4,
    name: 'High-Waist Jeans',
    price: '$68.99',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Bottoms',
    rating: 4.6,
    colors: ['Dark Blue', 'Light Blue', 'Black']
  },
  {
    id: 5,
    name: 'Striped T-Shirt',
    price: '$24.99',
    image: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.amazon.com%2FZengjo-Mens-Striped-Shirt%2Fdp%2FB07SQQ7ZMH&psig=AOvVaw0NibPclZZmI7vvtqE50uWJ&ust=1753706387678000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCMiP3cWH3Y4DFQAAAAAdAAAAABAE',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
    rating: 4.0,
    colors: ['Navy/White', 'Black/White', 'Red/White']
  },
  {
    id: 6,
    name: 'Leather Jacket',
    price: '$129.99',
    originalPrice: '$159.99',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L'],
    category: 'Outerwear',
    rating: 4.9,
    isSale: true,
    colors: ['Black', 'Brown', 'Tan']
  },
  {
    id: 7,
    name: 'Midi Skirt',
    price: '$42.99',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Bottoms',
    rating: 4.3,
    isNew: true,
    colors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: 8,
    name: 'Knit Sweater',
    price: '$54.99',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Tops',
    rating: 4.4,
    colors: ['Cream', 'Gray', 'Dusty Pink']
  },
  {
    id: 9,
    name: 'Evening Gown',
    price: '$199.99',
    image: 'https://images.unsplash.com/photo-1566174532012-2c2c89e7b2db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L'],
    category: 'Dresses',
    rating: 4.7,
    colors: ['Black', 'Navy', 'Emerald']
  },
  {
    id: 10,
    name: 'Denim Jacket',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    category: 'Outerwear',
    rating: 4.4,
    colors: ['Light Blue', 'Dark Blue', 'Black']
  },
  {
    id: 11,
    name: 'Bodycon Dress',
    price: '$45.99',
    image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Dresses',
    rating: 4.1,
    colors: ['Black', 'Navy', 'Burgundy']
  },
  {
    id: 12,
    name: 'Cropped Blazer',
    price: '$89.99',
    image: 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L'],
    category: 'Outerwear',
    rating: 4.6,
    isNew: true,
    colors: ['Black', 'Beige', 'Navy']
  },
  {
    id: 13,
    name: 'Yoga Leggings',
    price: '$39.99',
    image: 'https://images.unsplash.com/photo-1506629905587-4577d3c8a881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    category: 'Bottoms',
    rating: 4.7,
    colors: ['Black', 'Navy', 'Gray']
  },
  {
    id: 14,
    name: 'Silk Camisole',
    price: '$55.99',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    category: 'Tops',
    rating: 4.5,
    isSale: true,
    originalPrice: '$69.99',
    colors: ['Ivory', 'Blush', 'Black']
  },
  {
    id: 15,
    name: 'Pleated Skirt',
    price: '$48.99',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a13d44?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    sizes: ['S', 'M', 'L'],
    category: 'Bottoms',
    rating: 4.2,
    colors: ['Black', 'Navy', 'Plaid']
  }
];

// --- Product Card ---
function ProductCard({ product, onAddToCart, onToggleWishlist, isWishlisted }: { 
  product: ProductProps; 
  onAddToCart: (item: CartItem) => void; 
  onToggleWishlist: (id: number) => void;
  isWishlisted: boolean;
}) {
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(product.colors ? product.colors[0] : '');

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className="w-4 h-4 text-yellow-400" filled={i < Math.floor(rating)} />
    ));
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.isNew && (
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold">NEW</span>
        )}
        {product.isSale && (
          <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">SALE</span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product.id)}
        className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all"
      >
        <Heart className="w-5 h-5 text-pink-500" filled={isWishlisted} />
      </button>

      {/* Product Image */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center gap-1">
            {renderStars(product.rating)}
            <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-pink-600">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
        </div>

        <p className="text-sm text-gray-500 capitalize">{product.category}</p>

        {/* Color Selection */}
        {product.colors && (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-700">Color:</p>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    selectedColor === color 
                      ? 'bg-purple-100 border-purple-500 text-purple-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-purple-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size Selection */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Size:</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 rounded-lg border font-medium text-sm transition-all ${
                  selectedSize === size 
                    ? 'bg-purple-500 border-purple-500 text-white' 
                    : 'bg-white border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-500'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => {
            if (selectedSize) {
              onAddToCart({ 
                ...product, 
                selectedSize, 
                selectedColor: product.colors ? selectedColor : undefined,
                quantity: 1 
              });
              setSelectedSize('');
            } else {
              alert('Please select a size!');
            }
          }}
          className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// --- Enhanced Cart Sidebar ---
function CartSidebar({ cart, onClose, onRemove, onUpdateQuantity }: { 
  cart: CartItem[]; 
  onClose: () => void; 
  onRemove: (id: number, size: string, color?: string) => void;
  onUpdateQuantity: (id: number, size: string, color: string | undefined, newQuantity: number) => void;
}) {
  const total = cart.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 right-0 w-96 h-full bg-white shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400 mt-2">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>Size: {item.selectedSize}</p>
                        {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                        <p className="font-semibold text-pink-600">{item.price}</p>
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1))}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 border-x">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                            className="px-3 py-1 hover:bg-gray-100 transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id, item.selectedSize, item.selectedColor)} 
                          className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Total and Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total:</span>
              <span className="text-2xl font-bold text-pink-600">${total.toFixed(2)}</span>
            </div>
            <button className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// --- Filter Sidebar ---
function FilterSidebar({ categories, selectedCategory, onCategoryChange, onClose }: {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={onClose} />
      
      {/* Sidebar */}
      <div className="fixed top-0 left-0 w-80 h-full bg-white shadow-2xl z-50 p-6 md:relative md:w-64 md:shadow-none">
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h3 className="text-xl font-bold">Filters</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <span className="text-2xl text-gray-500">×</span>
          </button>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 hidden md:block">Categories</h3>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// --- Main Page ---
export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const addToCart = (newItem: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((i) => 
        i.id === newItem.id && 
        i.selectedSize === newItem.selectedSize && 
        i.selectedColor === newItem.selectedColor
      );
      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id && 
          i.selectedSize === newItem.selectedSize && 
          i.selectedColor === newItem.selectedColor
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: number, size: string, color?: string) => {
    setCart((prev) => prev.filter((i) => 
      !(i.id === id && i.selectedSize === size && i.selectedColor === color)
    ));
  };

  const updateQuantity = (id: number, size: string, color: string | undefined, newQuantity: number) => {
    setCart((prev) => prev.map((i) =>
      i.id === id && i.selectedSize === size && i.selectedColor === color
        ? { ...i, quantity: newQuantity }
        : i
    ));
  };

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Fashion Store ✨
            </h1>
            
            <div className="flex items-center gap-4">
              {/* Filter Button (Mobile) */}
              <button
                onClick={() => setIsFilterOpen(true)}
                className="md:hidden p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Filter className="w-5 h-5 text-gray-600" />
              </button>

              {/* Wishlist Button */}
              <button className="relative p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all">
                <Heart className="w-5 h-5 text-pink-500" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <CartIcon className="w-5 h-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filter Sidebar (Desktop) */}
          <div className="hidden md:block">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedCategory === 'All' ? 'All Products' : selectedCategory}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} item{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Sidebar (Mobile) */}
      {isFilterOpen && (
        <FilterSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={(category) => {
            setSelectedCategory(category);
            setIsFilterOpen(false);
          }}
          onClose={() => setIsFilterOpen(false)}
        />
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar 
          cart={cart} 
          onClose={() => setIsCartOpen(false)} 
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
      )}
    </div>
  );
}