import { IBanner } from "@/types/Banner";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import { Skeleton } from "@heroui/react";
import Image from "next/image";

interface PropTypes {
  banners: IBanner[];
  isLoadingBanners: boolean;
}

const HomeSlider = ({ banners, isLoadingBanners }: PropTypes) => {
  return (
    <div className="mt-6 mb-6 px-0 sm:px-6 lg:px-16">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={1.4}
          centeredSlides
          spaceBetween={16}
          loop
          speed={800}
          observer
          observeParents
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full"
        >
          {banners?.map((banner: IBanner) => (
            <SwiperSlide key={banner._id}>
              <div className="relative aspect-[16/6] overflow-hidden rounded-none bg-gray-100 lg:rounded-3xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${banner.image}`}
                  alt="image"
                  width={1920}
                  height={700}
                  unoptimized
                  className="h-full w-full object-cover bg-gray-200"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Skeleton className="aspect-[20/6] w-full rounded-3xl" />
      )}
    </div>
  );
};

export default HomeSlider;
