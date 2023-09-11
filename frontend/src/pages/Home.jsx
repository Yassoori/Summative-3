import { useEffect } from "react";
import axios from "axios";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // axios call
        const response = await axios.get("http://localhost:4000/api/products");

        if (response.status === 200) {
          console.log("All Products:", response.data);
        }
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };
    fetchProducts();
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
    </div>
  );
};

export default Home;
