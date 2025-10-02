interface IOrder {
  _id?: string;
  // orderId?: string;
  status?: string;
  ticket?: {
    name: string;
  };
  events?: {
    name: string;
    banner: string;
  };
  createdBy?: {
    fullName: string;
  };
  total?: number;
  createdAt?: string | DateValue;
  quantity?: number;
  orderId?: number;
  pajak?: number;
  vouchertiket?:number;
  payment?: {
    redirect_url?: string;
  };
}
interface ISnapResult {
  order_id: string;
  transaction_id: string;
  gross_amount: string;
  payment_type: string;
  transaction_time: string;
  transaction_status:
    | "capture"
    | "settlement"
    | "pending"
    | "deny"
    | "cancel"
    | "expire"
    | "failure";
  status_message: string;
  status_code: string;
  fraud_status?: "accept" | "challenge" | "deny";
  bank?: string;
  va_numbers?: Array<{
    bank: string;
    va_number: string;
  }>;
  permata_va_number?: string;
  bill_key?: string;
  biller_code?: string;
  pdf_url?: string;
  finish_redirect_url?: string; // kalau redirect setelah bayar
}

interface IEventOrderTotal {
  totalAmount: number;
  eventId: string;
  eventName: string;
}

interface IOrderSummary {
  totalOrders: number;
  totalAmount: number;
  ticketName: string;
  eventId: string;
  eventName: string;
  ticketId: string;
}

export type { IOrder, IEventOrderTotal, IOrderSummary, ISnapResult };
