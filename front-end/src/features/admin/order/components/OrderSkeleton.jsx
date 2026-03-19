export const OrderSkeleton = () => (
  <div className="max-w-7xl mx-auto py-2 space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-gray-100 animate-pulse h-64 rounded-2xl w-full" />
    ))}
  </div>
);