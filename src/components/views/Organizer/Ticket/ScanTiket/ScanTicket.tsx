import { Scanner } from "@yudiel/react-qr-scanner";
import useScanTicket from "./useScanTicket";
import { Camera } from "lucide-react";

const ScanTicket = () => {
  const { scanVoucher, isScanning } = useScanTicket();

  return (
    <div className="flex flex-col items-center justify-center p-4 md:p-8">
      {/* Card scanner */}
      <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50 px-4 py-3">
          <Camera className="text-xl text-blue-500" />
          <h2 className="text-lg font-semibold text-gray-700">
            Scan Ticket QR
          </h2>
        </div>

        {/* Scanner */}
        <div className="p-2">
          <Scanner
            onScan={(results) => {
              if (isScanning) return; // cegah double request saat loading

              let voucherId: string | null = null;

              if (Array.isArray(results) && results[0]?.rawValue) {
                voucherId = results[0].rawValue;
              } else if (typeof results === "string") {
                voucherId = results;
              }

              if (voucherId) {
                scanVoucher(voucherId); // trigger API
              }
            }}
            onError={(error: unknown) => {
              console.error("Scanner Error:", error);
            }}
            constraints={{ facingMode: "environment" }}
          />
        </div>

        {/* Footer / Loading indicator */}
        {isScanning && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="animate-pulse rounded-lg bg-white/80 px-4 py-2 font-medium text-gray-800">
              Scanning...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanTicket;
