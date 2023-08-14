import sliderImg1 from "../../assets/banners/chatgpt.jpg";
import sliderImg2 from "../../assets/banners/bard.png";
import sliderImg3 from "../../assets/banners/GeeksforGeeks.jpg";
import sliderImg4 from "../../assets/banners/stackoverflow.png";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const BlogSlider = () => {
    const sliderContents = [
        {
            img: sliderImg1,
            title: "How ChatGPT help to the developers?",
            description:
                "ChatGPT is an AI language which provides developers with instant responses. It helps debugging and learning processes. It reduces many times.",
        },
        {
            img: sliderImg2,
            title: "ChatGPT or Google Bard?",
            description:
                "Both are AI language. Bard is developed by Google. It is used to help people to learn new things. Both are used to helping developers. ",
        },
        {
            img: sliderImg3,
            title: "Research about developers portal.",
            description:
                "There are so many portals and community for developers. They are GeeksForGeeks, StackOverFlow. GeeksForGeeks is one of the best community for developers.",
        },
        {
            img: sliderImg4,
            title: "StackOverFlow or CodeStack? Which is better?",
            description:
                "StackOverFlow is a problem solving portal for developers. But there are some obstacles to find problem in this. CodeStack is a good choice for developers.",
        },
    ];

    return (
        <div>
            <h1 className="text-4xl text-center text-gray-800 font-bold">Featured Blogs</h1>
            <p className='text-center text-gray-500 font-medium mt-2 mb-16'>Navigating the Blogging Landscape</p>
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                autoplay={{ delay: 2000 }}
                modules={[Autoplay]}
            >
                {sliderContents.map((sliderContent, index) => (
                    <SwiperSlide key={index}>
                        <div className="card flex items-center p-4 border border-gray-300 shadow-md">
                            <div className="image w-2/3 pr-4">
                                <img
                                    src={sliderContent.img}
                                    alt="Image"
                                    className="max-w-full h-auto"
                                />
                            </div>
                            <div className="content w-1/3">
                                <h3 className="text-2xl font-semibold">{sliderContent.title}</h3>
                                <p className="mt-2 text-lg font-medium text-gray-600">{sliderContent.description}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default BlogSlider;