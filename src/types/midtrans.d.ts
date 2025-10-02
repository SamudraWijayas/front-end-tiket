// types/midtrans.d.ts
export {};

declare global {
  interface Window {
    snap: {
      pay(
        token: string,
        options: {
          onSuccess?: (result: SnapResult) => void;
          onPending?: (result: SnapResult) => void;
          onError?: (result: SnapResult) => void;
          onClose?: () => void;
        },
      ): void;
    };
  }

  interface SnapResult {
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
    finish_redirect_url?: string;
  }
}
