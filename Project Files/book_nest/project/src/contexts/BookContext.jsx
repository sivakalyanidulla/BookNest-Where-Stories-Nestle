import React, { createContext, useContext, useState } from 'react';

const BookContext = createContext();

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
};

// Sample data
const sampleBooks = [
  {
    id: 1,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    genre: "Business",
    price: 199,
    image: "https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Personal finance classic teaching financial literacy and investment strategies.",
    bestseller: true,
    sellerId: 1,
    sellerName: "BookShop Inc."
  },
  {
    id: 2,
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    genre: "Business",
    price: 149,
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=300",
    description: "Timeless principles for achieving success and wealth.",
    bestseller: true,
    sellerId: 1,
    sellerName: "BookShop Inc."
  }
];

const sampleOrders = [
  {
    id: 1,
    productName: "Think and Grow Rich",
    orderId: "6580449015",
    address: "123 Main St, New York, NY",
    seller: "BookStore Inc",
    bookingDate: "18/12/2023",
    deliveryBy: "25/12/2023",
    price: 199,
    status: "delivered",
    image: "https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=100",
    userId: 1,
    bookId: 2
  }
];

const sampleUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    joinDate: '2024-01-15',
    status: 'Active',
    orders: 5,
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

const sampleSellers = [
  {
    id: 1,
    name: 'BookShop Inc.',
    email: 'contact@bookshop.com',
    joinDate: '2024-01-10',
    status: 'Active',
    products: 2,
    revenue: 12450,
    avatar: 'https://images.pexels.com/photos/1181216/pexels-photo-1181216.jpeg?auto=compress&cs=tinysrgb&w=100'
  }
];

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState(sampleBooks);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState(sampleOrders);
  const [users, setUsers] = useState(sampleUsers);
  const [sellers, setSellers] = useState(sampleSellers);

  // Wishlist methods
  const addToWishlist = (bookId) => {
    if (!wishlist.includes(bookId)) {
      setWishlist([...wishlist, bookId]);
    }
  };

  const removeFromWishlist = (bookId) => {
    setWishlist(wishlist.filter(id => id !== bookId));
  };

  const isInWishlist = (bookId) => wishlist.includes(bookId);

  // Cart methods
  const addToCart = (bookId) => {
    if (!cart.includes(bookId)) {
      setCart([...cart, bookId]);
    }
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(id => id !== bookId));
  };

  // Book methods
  const addBook = (book, sellerId = 1) => {
    const newBook = {
      ...book,
      id: Date.now(),
      sellerId,
      sellerName: sellers.find(s => s.id === sellerId)?.name || 'Unknown Seller'
    };
    setBooks([...books, newBook]);

    setSellers(sellers.map(seller =>
      seller.id === sellerId
        ? { ...seller, products: seller.products + 1 }
        : seller
    ));
  };

  const deleteBook = (bookId) => {
    const book = books.find(b => b.id === bookId);
    if (book) {
      setBooks(books.filter(b => b.id !== bookId));
      setSellers(sellers.map(s =>
        s.id === book.sellerId
          ? { ...s, products: Math.max(0, s.products - 1) }
          : s
      ));
    }
  };

  // Order methods
  const placeOrder = (bookId, orderDetails) => {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    const newOrder = {
      id: Date.now(),
      productName: book.title,
      orderId: Math.random().toString(36).substr(2, 9),
      address: orderDetails.address,
      seller: book.sellerName,
      bookingDate: new Date().toLocaleDateString(),
      deliveryBy: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      price: book.price,
      status: "processing",
      image: book.image,
      userId: orderDetails.userId || 1,
      bookId: book.id
    };

    setOrders([...orders, newOrder]);
    setUsers(users.map(u =>
      u.id === (orderDetails.userId || 1)
        ? { ...u, orders: u.orders + 1 }
        : u
    ));
  };

  // Admin methods
  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setOrders(orders.filter(order => order.userId !== userId));
  };

  const deleteSeller = (sellerId) => {
    setSellers(sellers.filter(seller => seller.id !== sellerId));
    setBooks(books.filter(book => book.sellerId !== sellerId));
  };

  // Filtering methods
  const getUserOrders = (userId) => {
    return orders.filter(order => order.userId === userId);
  };

  const getSellerBooks = (sellerId) => {
    return books.filter(book => book.sellerId === sellerId);
  };

  const getSellerOrders = (sellerId) => {
    const sellerBookIds = books.filter(b => b.sellerId === sellerId).map(b => b.id);
    return orders.filter(order => sellerBookIds.includes(order.bookId));
  };

  const value = {
    books,
    wishlist,
    cart,
    orders,
    users,
    sellers,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    addToCart,
    removeFromCart,
    addBook,
    deleteBook,
    placeOrder,
    deleteUser,
    deleteSeller,
    getUserOrders,
    getSellerBooks,
    getSellerOrders
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
};
