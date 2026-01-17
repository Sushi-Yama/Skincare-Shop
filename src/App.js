import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Account from "./pages/Account";
import SkinTypes from "./pages/SkinTypes";
import Routines from "./pages/Routines";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import { sendTestMessage } from "./services/telegramService";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [cartItems, setCartItems] = useState([]); // Changed: removed localStorage load
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [telegramConnected, setTelegramConnected] = useState(false);

  // Initialize currentPage from URL hash on component mount
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const page = hash === "" ? "home" : hash;
      setCurrentPage(page);
    }
  }, []);

  // Update URL hash when currentPage changes
  useEffect(() => {
    const pageHash = currentPage === "home" ? "" : currentPage;
    window.location.hash = pageHash;
  }, [currentPage]);

  // Test Telegram connection on app load
  useEffect(() => {
    const testTelegram = async () => {
      try {
        const response = await sendTestMessage();
        if (response) {
          setTelegramConnected(true);
          console.log("Telegram bot connected successfully");
        }
      } catch (error) {
        console.log("Telegram bot not connected:", error);
      }
    };
    testTelegram();
  }, []);

  // Save cart items to localStorage whenever they change - REMOVED
  // useEffect(() => {
  //   localStorage.setItem('cartItems', JSON.stringify(cartItems));
  // }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      let newItems;

      if (existingItem) {
        newItems = prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }

      return newItems;
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart after successful order
  const clearCart = () => {
    setCartItems([]);
    // localStorage.removeItem('cartItems'); // Removed because we are not using localStorage
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    // Update URL hash
    const pageHash = page === "home" ? "" : page;
    window.location.hash = pageHash;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentPage("product-detail");
    // For product detail, we can use a special hash with product ID
    window.location.hash = `product-${product.id}`;
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return (
          <Home
            navigateTo={navigateTo}
            openProductDetail={openProductDetail}
            addToCart={addToCart}
          />
        );
      case "products":
        return (
          <Products
            navigateTo={navigateTo}
            openProductDetail={openProductDetail}
            addToCart={addToCart}
          />
        );
      case "product-detail":
        return (
          <ProductDetail
            product={selectedProduct}
            addToCart={addToCart}
            navigateTo={navigateTo}
            openProductDetail={openProductDetail}
          />
        );
      case "cart":
        return (
          <Cart
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
            navigateTo={navigateTo}
            addToCart={addToCart}
            openProductDetail={openProductDetail}
          />
        );
      case "checkout":
        return (
          <Checkout
            cartItems={cartItems}
            cartTotal={cartTotal}
            navigateTo={navigateTo}
            clearCart={clearCart}
          />
        );
      case "about":
        return <About navigateTo={navigateTo} />;
      case "contact":
        return <Contact navigateTo={navigateTo} />;
      case "skin-types":
        return <SkinTypes navigateTo={navigateTo} />;
      case "routines":
        return <Routines navigateTo={navigateTo} />;
      case "account":
        return <Account navigateTo={navigateTo} />;
      default:
        return (
          <Home
            navigateTo={navigateTo}
            openProductDetail={openProductDetail}
            addToCart={addToCart}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Telegram Status Indicator */}
      {telegramConnected && (
        <div className="fixed top-4 left-4 z-50 animate-pulse">
          <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
            <svg
              className="w-3 h-3 mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Telegram Connected
          </div>
        </div>
      )}

      <Header
        navigateTo={navigateTo}
        cartCount={cartCount}
        openCart={() => setIsCartOpen(true)}
        openProductDetail={openProductDetail}
      />

      <main className="flex-grow">{renderPage()}</main>

      <CartSidebar
        isOpen={isCartOpen}
        closeCart={() => setIsCartOpen(false)}
        cartItems={cartItems}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        cartTotal={cartTotal}
        navigateTo={navigateTo}
      />

      <Footer navigateTo={navigateTo} />
    </div>
  );
}

export default App;
