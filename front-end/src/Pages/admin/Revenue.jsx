import React from "react";
import { RevenueHeader, RevenueStats, RevenueChart ,useRevenue , RevenueSkeleton, RevenueError} from "../../features/admin/revenue";


const Revenue = ({ user }) => {
  const { 
    totalSales, 
    todaysIncome, 
    salesPerformance, 
    isLoading, 
    isError, 
    error,
    refetch 
  } = useRevenue();

  // Guard clause for access
  if (user?.role !== "admin") {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4 px-4 text-center">
        <h2 className="text-2xl font-black uppercase text-gray-300 tracking-tighter">Superadmin Access Only</h2>
      </div>
    );
  }

  if (isLoading) return <RevenueSkeleton />;
  
  if (isError) return (
    <RevenueError message={error} onRetry={() => refetch()} />
  );

  return (
    <div className="max-w-full overflow-hidden space-y-6 md:space-y-8 pb-10 font-sans px-4 sm:px-6 lg:px-8">
      <RevenueHeader />
      
      {/* Passing API data to Stats */}
      <RevenueStats 
        totalSales={totalSales} 
        todaysIncome={todaysIncome} 
      />
      
      {/* Passing mapped sales performance data */}
      <RevenueChart data={salesPerformance} />
      
      
    </div>
  );
};

export default Revenue;