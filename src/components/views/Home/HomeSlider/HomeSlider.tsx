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
    <div className="mb-6 mt-6 h-[50vw] px-0 sm:h-[30vw] sm:px-6 lg:h-[20vw] lg:px-16">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            // dynamicBullets: true,
            clickable: true,
          }}
          spaceBetween={30}
          loop
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE}${banner.image}`}
                alt={`${banner.title}`}
                className="h-full w-full rounded-none lg:rounded-2xl object-cover"
                width={1920}
                height={800}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="h-full w-full rounded-2xl" />
      )}
    </div>
  );
};

export default HomeSlider;
