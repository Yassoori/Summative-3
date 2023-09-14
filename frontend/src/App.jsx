import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./css/App.min.css";

//import pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import ProductDetails from "./pages/Details";
//import components
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoginSignup from "./components/LoginSignupModal";

// import context hook
import { useLoginModalContext } from "./hooks/useLoginModalContext";
import { IconContextProvider } from "./context/IconContext";
import { ProductsContextProvider } from "./context/ProductContext";

function App() {
  const { isLoginVisible, dispatch } = useLoginModalContext();

  const handleLoginModalClose = () => {
    // Dispatch the action to close the modal
    dispatch({ type: "LOGIN_CLOSE" });
  };

  return (
    <div className="App">
      <BrowserRouter>
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
              </Routes>
            </div>
            {isLoginVisible && <LoginSignup onClose={handleLoginModalClose} />}
            <Footer />
          </ProductsContextProvider>
        </IconContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
