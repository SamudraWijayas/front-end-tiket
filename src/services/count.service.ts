import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";

const countServices = {
  getEventTicketTotals: (id: string) =>
    instance.get(`${endpoint.COUNT}/total-price/${id}`), // array per tiket
  getEventTotalIncome: (id: string) =>
    instance.get(`${endpoint.COUNT}/all-ticket/${id}`), // summary total event
  getCountTotal: () => instance.get(`${endpoint.COUNT}/total`),

  getCountTotalById: (id: string) => instance.get(`${endpoint.COUNT}/${id}`),
  getOrderByEventOrganizer: () =>
    instance.get(`${endpoint.COUNT}/total/events-byorganizer`),
  // stats
  getCountOrganizer: (eventId?: string) =>
    instance.get(`${endpoint.COUNT}/income`, {
      params: eventId ? { eventId } : {},
    }),

  getCountOrganizerToday: (eventId?: string) =>
    instance.get(`${endpoint.COUNT}/income/today`, {
      params: eventId ? { eventId } : {},
    }),

  getSalesStats: (params?: string) =>
    instance.get(`${endpoint.STATS}/sales?${params}`),

  getTicketStats: (eventId?: string) =>
    instance.get(`${endpoint.STATS}/tickets`, {
      params: eventId ? { eventId } : {},
    }),
};

export default countServices;
