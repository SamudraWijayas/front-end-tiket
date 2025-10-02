import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { ICart } from "@/types/Ticket";

const orderServices = {
  getOrders: (params: string) => instance.get(`${endpoint.ORDER}?${params}`),
  getMemberOrder: (params: string) =>
    instance.get(`${endpoint.ORDER}-history?${params}`),
  getOrderByEventOrganizer: (params: string) =>
    instance.get(`${endpoint.ORDER}/by-organizer?${params}`),
  getTicketByOrganizer: (params: string) =>
    instance.get(`${endpoint.ORDER}/by-ticket?${params}`),
  getOrderById: (id: string) => instance.get(`${endpoint.ORDER}/${id}`),
  getEventTicketTotals: (id: string) =>
    instance.get(`${endpoint.COUNT}/total-price/${id}`), // array per tiket

  getEventTotalIncome: (id: string) =>
    instance.get(`${endpoint.COUNT}/all-ticket/${id}`), // summary total event

  createOrder: (payload: ICart) => instance.post(endpoint.ORDER, payload),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${endpoint.ORDER}/${id}/${status}`),
  deleteOrder: (id: string) => instance.delete(`${endpoint.ORDER}/${id}`),
  // jumlah
  getOrdersTotal: () => instance.get(`${endpoint.COUNT}/total`),
  getOrderTotalById: (id: string) => instance.get(`${endpoint.COUNT}/${id}`),
  // canceled
  cancelOrder: (orderId: string) =>
    instance.post(`${endpoint.ORDER}/${orderId}/cancel`),
};

export default orderServices;
