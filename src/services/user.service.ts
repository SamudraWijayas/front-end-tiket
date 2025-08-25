import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { IUser } from "@/types/User";

const userServices = {
  getUsers: (params?: string) => instance.get(`${endpoint.USER}?${params}`),
  getUserById: (id: string) => instance.get(`${endpoint.USER}/${id}`),
  addUser: (payload: IUser) => instance.post(`${endpoint.USER}`, payload),
  deleteUser: (id: string) => instance.delete(`${endpoint.USER}/${id}`),
  updateUser: (id: string, payload: IUser) =>
    instance.put(`${endpoint.USER}/${id}`, payload),
};

export default userServices;
