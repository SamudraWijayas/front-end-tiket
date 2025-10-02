import instance from "@/libs/axios/instance";
import endpoint from "./endpoint.constant";
import { IVoucher } from "@/types/Voucher";

const voucherServices = {
  // scan tiket dengan nama voucher di tb order
  scanVoucher: (voucherId: string) =>
    instance.post(`${endpoint.VOUCHER}/scan`, { voucherId }),
  // voucher diskon
  getVouchersByEventId: (id: string) =>
    instance.get(`${endpoint.VOUCHER}/${id}/events`),
  getVouchersById: (id: string) => instance.get(`${endpoint.VOUCHER}/${id}`),
  addVoucher: (payload: IVoucher) => instance.post(endpoint.VOUCHER, payload),
  deleteVoucher: (id: string) => instance.delete(`${endpoint.VOUCHER}/${id}`),
  updateVoucher: (id: string, payload: IVoucher) =>
    instance.put(`${endpoint.VOUCHER}/${id}`, payload),
  updateVoucherStatus: (id: string, isActive: boolean) =>
    instance.patch(`${endpoint.VOUCHER}/${id}/status`, { isActive }),
  // services/voucher.service.ts
  validateVoucher: (code?: string, ticketId?: string, eventId?: string) =>
    instance.post(`${endpoint.VOUCHER}/validate`, { code, ticketId, eventId }),
};

export default voucherServices;
