import React from "react";

const BookingSkeleton = () => {
  return (
    <tr className="animate-pulse border-b border-gray-50 last:border-0">
      {/* Name Column */}
      <td className="px-4 md:px-8 py-5">
        <div className="h-4 w-24 bg-gray-200 rounded-md"></div>
      </td>

      {/* Mobile Column */}
      <td className="px-4 md:px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
          <div className="h-3 w-28 bg-gray-100 rounded"></div>
        </div>
      </td>

      {/* Email Column */}
      <td className="px-4 md:px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
          <div className="h-3 w-32 bg-gray-100 rounded"></div>
        </div>
      </td>

      {/* Date Column */}
      <td className="px-4 md:px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 bg-gray-200 rounded-sm"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </td>

      {/* Time Column */}
      <td className="px-4 md:px-8 py-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-100 rounded-full"></div>
          <div className="h-3 w-16 bg-gray-100 rounded"></div>
        </div>
      </td>

      {/* Guests Column */}
      <td className="px-4 md:px-8 py-5 text-center">
        <div className="inline-block h-6 w-16 bg-gray-100 rounded-lg"></div>
      </td>

      {/* Details Column */}
      <td className="px-4 md:px-8 py-5 text-right">
        <div className="inline-block h-8 w-8 bg-gray-100 rounded-full"></div>
      </td>
    </tr>
  );
};

export default BookingSkeleton;