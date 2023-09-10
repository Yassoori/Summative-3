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
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default Home
