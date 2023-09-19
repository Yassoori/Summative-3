import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.css";

//import pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ProductDetails from "./pages/Details";
import VendorAccount from "./components/VendorAccount";
import Account from "./pages/Account";
//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignupModal";

// import context hook
import { useAuthContext } from "./hooks/useAuthContext";
import { useLoginModalContext } from "./hooks/useLoginModalContext";
import { IconContextProvider } from "./context/IconContext";
import { ProductsContextProvider } from "./context/ProductContext";
import { WishlistProvider } from "./context/wishlistContext";
import { useContext } from "react";

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
                </Routes>
              </div>
              {isLoginVisible && (
                <LoginSignup onClose={handleLoginModalClose} />
              )}
              <Footer />
            </ProductsContextProvider>
          </IconContextProvider>
        </WishlistProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
