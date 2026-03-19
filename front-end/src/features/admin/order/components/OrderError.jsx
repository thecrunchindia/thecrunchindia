import { X } from "lucide-react";

export const OrderError = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <div className="bg-red-50 p-4 rounded-full mb-4">
      <X className="text-red-500" size={32} />
    </div>
    <h3 className="font-black text-gray-900 uppercase">Something went wrong</h3>
    <p className="text-gray-500 text-sm mt-1 mb-6">{message}</p>
    <button onClick={onRetry} className="bg-black text-white px-8 py-3 rounded-xl font-black text-xs uppercase">
      Try Again
    </button>
  </div>
);