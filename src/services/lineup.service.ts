import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";
import { ILineup } from "@/types/Lineup";

const lineupServices = {
  getLineupsByEventId: (id: string) =>
    instance.get(`${endpoint.LINEUP}/${id}/events`),
  getLineupsById: (id: string) => instance.get(`${endpoint.LINEUP}/${id}`),
  addLineup: (payload: ILineup) => instance.post(endpoint.LINEUP, payload),
  deleteLineup: (id: string) => instance.delete(`${endpoint.LINEUP}/${id}`),
  updateLineup: (id: string, payload: ILineup) =>
    instance.put(`${endpoint.LINEUP}/${id}`, payload),
  updateLineupStatus: (id: string, isActive: boolean) =>
    instance.patch(`${endpoint.LINEUP}/${id}/status`, { isActive }),
};

export default lineupServices;
