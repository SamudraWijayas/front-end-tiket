interface IVoucher {
  _id?: string;
  code?: string;
  type?: "public" | "private"; // sesuai model backend
  discountType?: "persentase" | "jumlah tetap";
  discountPercentage?: number; // khusus untuk persentase
  minTransaction?: number | null; // untuk persentase atau fixed
  maxDiscount?: number | null; // khusus untuk persentase
  nominaldeduction?: number; // khusus untuk fixed
  quotaType?: "limited" | "unlimited";
  quota?: number;
  event?: string; // event ID
  applicableTickets?: (string | undefined)[]; // array ID tiket
  isActive?: boolean;
}

export type { IVoucher };
