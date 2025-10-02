interface ITicket {
  _id?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string;
  description?: string;
  events?: string;
  maxPurchase?: number | string;

  quotaType?: "limited" | "unlimited";
  isScannable?: boolean;
  scanMultiple?: boolean;
  scanStart?: Date | null;
  scanEnd?: Date | null;

  ticketStyle?: {
    headerColor?: string;
    logoColor?: string;
    backgroundColor?: string;
    customNote?: string;
  };

  saleStart?: Date | null;
  saleEnd?: Date | null;
  salesType?: "online" | "offline";
  isActive?: boolean;
}

interface ICart {
  events: string;
  ticket: string;
  quantity: number;
}

export type { ITicket, ICart };
