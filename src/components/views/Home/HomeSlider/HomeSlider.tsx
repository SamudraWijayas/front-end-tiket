import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

const HomeSlider = (props: PropTypes) => {
  const { banners, isLoadingBanners } = props;

  return (
    <div className="mt-6 mb-6 px-0">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={1.3}
          centeredSlides={true}
          spaceBetween={20}
          loop
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          className="w-full"
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <div className="relative aspect-[16/6] w-full overflow-hidden rounded-none lg:rounded-2xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${banner.image}`}
                  alt="sip"
                  fill
                  unoptimized
                  sizes="100vw"
                  className="rounded-lg object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="aspect-[16/6] w-full" />
      )}
    </div>
  );
};

export default HomeSlider;
