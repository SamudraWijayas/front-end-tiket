interface IOrder {
  _id?: string;
  orderId?: string;
  status?: string;
  ticket?: string;
  events?: {
    name: string;
  };
  createdBy?: {
    fullName: string;
  };
  total?: number;
  createdAt?: string | DateValue;
  quantity?: number;
  orderId?: number;
  payment?: {
    redirect_url?: string;
  };
}

export type { IOrder };
