import React from 'react';

const CustomerSkeleton = () => (
  <div className="space-y-4 animate-pulse p-6">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-24 bg-gray-100 rounded-3xl w-full"></div>
    ))}
  </div>
);

export default CustomerSkeleton;