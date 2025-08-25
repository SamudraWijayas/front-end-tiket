import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IBanner } from "@/types/Banner";

const bannerService = {
  getBanners: (params?: string) => instance.get(`${endpoint.BANNER}?${params}`),
  getBannerById: (id: string) => instance.get(`${endpoint.BANNER}/${id}`),
  addBanner: (payload: IBanner) => instance.post(`${endpoint.BANNER}`, payload),
  deleteBanner: (id: string) => instance.delete(`${endpoint.BANNER}/${id}`),
  updateBanner: (id: string, payload: IBanner) =>
    instance.put(`${endpoint.BANNER}/${id}`, payload),
};

export default bannerService;
