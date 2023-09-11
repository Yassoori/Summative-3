import {useEffect} from 'react'
import axios from 'axios'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const Home = () => {

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                // axios call
                const response = await axios.get("http://localhost:4000/api/products")

                if (response.status === 200) {
                    console.log(response.data);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts()
    },[])

  return (
    <div className='home'>
        <div className='hero'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                delay: 6000,
                disableOnInteraction: false,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
            >
                <SwiperSlide className='hero-image1'>
                    <img src="https://cdn.shopify.com/s/files/1/0885/3178/files/HOMEPAGE_HERO_-_AUGUST.png?v=1692127025" alt="hero1"/>
                </SwiperSlide>
                <SwiperSlide className='hero-image2'>
                    <img src="https://buddhamama.com/wp-content/uploads/2022/06/Buddha-Mama-Jewelry-star-necklace-hero.jpg" alt="hero2" />
                </SwiperSlide>
                <SwiperSlide className='hero-image3'>
                    <img src="https://assets.vogue.com/photos/60679161b475e844532aacd5/4:3/w_1600%2Cc_limit/VO120118_jewelry_08.jpg" alt="hero3"/>
                </SwiperSlide>
            </Swiper>
      </div>

      <div className='category-jewelry'>
            <div className='necklace category'>
                <div className='category-name'>NECKLACE</div>
            </div>
            <div className='braclets category'>
                <div className='category-name'>BRACLETS</div>
            </div>
            <div className='earring category'>
                <div className='category-name'>EARRING</div>
            </div>
            <div className='ring category'>
                <div className='category-name'>RING</div>
            </div>
      </div>
    </div>
  )
}

export default Home
