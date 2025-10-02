import instance from "@/libs/axios/instance";
import endpoint from "@/services/endpoint.constant";

const barcodeService = {
  getBarcodeByOrderId: (orderId: string) => instance.get(`${endpoint.BARCODE}/${orderId}`),
};

export default barcodeService;
