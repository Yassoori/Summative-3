import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

//import pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ProductDetails from "./pages/Details";
import VendorAccount from "./components/VendorAccount";
import Account from "./pages/Account";
import Cart from "./pages/Cart";
//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignupModal";

// import context hook
import { useAuthContext } from "./hooks/useAuthContext";
import { useLoginModalContext } from "./hooks/useLoginModalContext";
import { IconContextProvider } from "./context/IconContext";
import { ProductsContextProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/WishlistContext";
import { CartProvider } from "./context/CartContext";

//Import Local Storage

function App() {
  const { isLoginVisible, dispatch } = useLoginModalContext();
  const { user } = useAuthContext;

  const handleLoginModalClose = () => {
    // Dispatch the action to close the modal
    dispatch({ type: "LOGIN_CLOSE" });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <IconContextProvider>
              <ProductsContextProvider>
                <Header />
                <div className="pages">
                  <Routes>
                    <Route path="/about" element={<About />} />
                    <Route path="/" element={<Home />} />
                    <Route exact path="/shop/:category" element={<Shop />} />
                    <Route
                      path="/product/:productId"
                      element={<ProductDetails />}
                    />
                    <Route
                      path="/account/:userId"
                      element={
                        user && user.isVendor ? <VendorAccount /> : <Account />
                      }
                    />
                    <Route path="/cart/:userId" element={<Cart />} />
                  </Routes>
                </div>
                {isLoginVisible && (
                  <LoginSignup onClose={handleLoginModalClose} />
                )}
                <Footer/>
              </ProductsContextProvider>
            </IconContextProvider>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
