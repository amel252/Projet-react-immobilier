import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
// import Swiper styles
import 'swiper/css/bundle';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// img qu'on va utilisé
import Img1 from "../assets/hero-carousel/img1.jpg";
import Img2 from "../assets/hero-carousel/img2.jpg";
import Img3 from "../assets/hero-carousel/img3.jpg";
import Img4 from "../assets/hero-carousel/img4.jpg";


// import required modules
import { Autoplay, Pagination } from 'swiper/modules';

export default function Listing() {
    SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/listing/get/${params.listingId}`);
        const data = await res.json();

        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }

        setListing(data);
        setError(false);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchListing();
  }, [params.listingId]);
    return (
    <main className="min-h-screen">
      {loading && <p className="text-center my-7 text-2xl">Loading ...</p>}
      {error && <p className="text-center my-7 text-red-700 text-lg">Une erreur est survenue !</p>}
      {listing && !loading && !error && (
                <div>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        pagination={{ clickable: true, }}

                        autoplay={{delay: 1500,disableOnInteraction: false,}}
                        breakpoints={{640: {slidesPerView: 1,spaceBetween: 20,},768: {slidesPerView: 1,spaceBetween: 40,},
                            1024: { slidesPerView: 1, spaceBetween: 50, },
                        }}

                        modules={[Pagination, Autoplay, Navigation]}
                        className="mySwiper">
                            <SwiperSlide>
                                <img src={Img1} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Img2} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' />
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src={Img3} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' />
                            </SwiperSlide>

                            <SwiperSlide>
                                <img src={Img4} alt="" className='w-full lg:h-[420px] sm:h-96 h-80' />
                            </SwiperSlide>

                    </Swiper>
            </div>
            )}
    </main>
  );
}