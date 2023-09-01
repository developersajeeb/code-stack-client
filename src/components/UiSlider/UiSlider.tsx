import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import d1 from '../../assets/uiImages/d1.png'
import d2 from '../../assets/uiImages/d2.jpg'
import d3 from '../../assets/uiImages/d3.png'
import d4 from '../../assets/uiImages/d4.png'
import d5 from '../../assets/uiImages/d5.png'

const UiSlider = () => {
    return (
        <>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                breakpoints={{
                    '@0.00': {
                        slidesPerView: 1,
                        spaceBetween: 10,
                    },
                    '@0.75': {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    '@1.00': {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },

                }}
                modules={[Autoplay, FreeMode, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={d1} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d2} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d3} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d4} alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={d5} alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default UiSlider;