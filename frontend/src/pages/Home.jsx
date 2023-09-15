import { useEffect, useState, lazy, useRef, Suspense } from "react";
import { useProducts } from "../context/ProductContext";
import { Link, useParams } from "react-router-dom";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual, Navigation, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import LoadingSpinner from "../components/LoadingSpinner";

const LazyProductCard = lazy(() => import("../components/ProductCard.jsx"));

const Home = () => {
  const { category } = useParams();
  const { filteredProducts = [], fetchProducts } = useProducts();

  // Swiper
  const [swiperRef, setSwiperRef] = useState(null);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);

  // Create array with 500 slides
  const [slides, setSlides] = useState(
    Array.from({ length: 500 }).map((_, index) => `Slide ${index + 1}`)
  );

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, "Slide " + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  useEffect(() => {
    fetchProducts("all")
  }, []);
  
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
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        onSwiper={setSwiperRef}
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        virtual> 
        
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <SwiperSlide key={product._id} virtualIndex={index}>
                <Link to={`/product/${product._id}`}>
                  <LazyProductCard product={product} />
                </Link>
              </SwiperSlide>
            ))
          ) : (
            <p>No products to display.</p>
          )}
          
      </Swiper>
      </Suspense>

    </div>
  );
};

export default Home;
