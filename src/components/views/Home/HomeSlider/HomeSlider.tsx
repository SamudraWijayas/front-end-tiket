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
    <div className="mt-4 mb-6 px-4 sm:px-6 lg:px-16">
      {!isLoadingBanners ? (
        <Swiper
          pagination={{
            clickable: true,
          }}
          slidesPerView={1}
          breakpoints={{
            1024: {
              slidesPerView: 2,
            },
          }}
          spaceBetween={8}
          loop
          speed={800}
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
              <div className="relative aspect-[16/7] overflow-hidden rounded-xl bg-gray-100 lg:rounded-2xl">
                <Image
                  src={`${process.env.NEXT_PUBLIC_IMAGE}${banner.image}`}
                  alt="image"
                  width={1920}
                  height={700}
                  unoptimized
                  className="h-full w-full bg-gray-200 object-cover"
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
