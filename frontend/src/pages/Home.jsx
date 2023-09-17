import { useEffect, useState, lazy, useRef, Suspense } from "react";
import { useProducts } from "../context/ProductContext";
import { Link, useParams } from "react-router-dom";

// react-icons
import { BsChevronLeft } from "react-icons/bs"
import { BsChevronRight } from "react-icons/bs"

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductCard from "../components/ProductCard.jsx";
// const LazyProductCard = lazy(() => import("../components/ProductCard.jsx"));

const Home = () => {
  const { category } = useParams();
  const { filteredProducts = [], fetchProducts } = useProducts();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [prevDisabled, setPrevDisabled] = useState(true);
  const [nextDisabled, setNextDisabled] = useState(false);

  useEffect(() => {
    fetchProducts("all")
  }, []);
  
  useEffect(() => {
    const handleResize = () => {
    if (filteredProducts.length > 0) {
      const startIndex = currentIndex;
      const endIndex = Math.min(currentIndex + (window.innerWidth <= 768 ? 1 : 3), filteredProducts.length);

      // Create an array of product indices to display
      const productIndices = Array.from({ length: endIndex - startIndex }, (_, index) => startIndex + index);

      // Use the product indices to extract the products to display
      const productsToDisplay = productIndices.map(index => filteredProducts[index]);

      setDisplayedProducts(productsToDisplay);
      setPrevDisabled(currentIndex === 0);
      setNextDisabled(currentIndex === filteredProducts.length - 1);
    }
  }
    // Call the handleResize function on initial load
    handleResize();

    // Add an event listener to update the state when the window is resized
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };

  }, [currentIndex, filteredProducts]);

  

  const slideToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < filteredProducts.length - 1 ? prevIndex + 1 : 0
    );
  };

  const slideToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredProducts.length - 1
    );
  };

  useEffect(() => {
    fetchProducts("all");
  }, []);
  console.log(filteredProducts);

  return (
    <div className="home">
      <div className="hero">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper">
          <SwiperSlide className="hero-image1">
            <img
              src="https://cdn.shopify.com/s/files/1/0885/3178/files/HOMEPAGE_HERO_-_AUGUST.png?v=1692127025"
              alt="hero1"
            />
          </SwiperSlide>
          <SwiperSlide className="hero-image2">
            <img
              src="https://buddhamama.com/wp-content/uploads/2022/06/Buddha-Mama-Jewelry-star-necklace-hero.jpg"
              alt="hero2"
            />
          </SwiperSlide>
          <SwiperSlide className="hero-image3">
            <img
              src="https://assets.vogue.com/photos/60679161b475e844532aacd5/4:3/w_1600%2Cc_limit/VO120118_jewelry_08.jpg"
              alt="hero3"
            />
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="category-jewelry">
        <Link to="/shop/necklace">
          <div className="necklace category">
            <img
              className="category-image"
              src="https://cdn.shopify.com/s/files/1/0658/2235/9778/files/womens-necklaces-type-pendant.jpg"
              alt="image of woman wearing necklace"
            />
            <div className="category-name">NECKLACES</div>
          </div>
        </Link>
        <Link to="/shop/bracelet">
          <div className="braclets category">
            <img
              className="category-image"
              src="https://cdn.shopify.com/s/files/1/0658/2235/9778/files/womens-bracelets-type-all.jpg"
              alt="image of woman wearing bracelet"
            />
            <div className="category-name">BRACELETS</div>
          </div>
        </Link>
        <Link to="/shop/earring">
          <div className="earring category">
            <img
              className="category-image"
              src="https://cdn.shopify.com/s/files/1/0658/2235/9778/files/womens-earrings-type-all.jpg"
              alt="woman wearing earings"
            />
            <div className="category-name">EARRINGS</div>
          </div>
        </Link>
        <Link to="/shop/ring">
          <div className="ring category">
            <img
              className="category-image"
              src="https://cdn.shopify.com/s/files/1/0658/2235/9778/files/womens-rings-type-cocktail.jpg"
              alt="woman wearing ring"
            />
            <div className="category-name">RINGS</div>
          </div>
        </Link>
      </div>
      
      <Suspense fallback={<LoadingSpinner />}>
        <div className="product-slider">
          <h3>NEW ARRIVALS</h3>
          {displayedProducts.length > 0 ? (
            <div className="product-list">
              {displayedProducts.map((product) => (
                <div key={product._id} className="product-card">
                    <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <p>No products to display.</p>
          )}
            
          <div className="slider-controls">
            <button className="prev-button" onClick={slideToPrev} disabled={prevDisabled}>
              <BsChevronLeft/>
            </button>
            <button className="next-button" onClick={slideToNext} disabled={nextDisabled}>
              <BsChevronRight/>
            </button>
          </div>
        </div>
      </Suspense>

      <div className="sub-hero">
            <img src='https://robbreport.com/wp-content/uploads/2020/08/19605-63073546-art.gif' alt='diamonds'/>
            <div className="diamond">
              <h4>Diamond Jewellery</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <Link to="/shop/all">
              <button>SHOP NOW</button>
            </Link>      
      </div>

    </div>
  );
};

export default Home;