import {  DashboardHeader, StatsGrid, RevenueChart,  Leaderboard,  StatusSection ,useDashboard , DashboardSkeleton, DashboardError} from "../../features/admin/dashboard";

const Dashboard = ({ user }) => {

  const { stats, weeklyVolume, leaderboard, attentionNeeded, activeDispatch, isLoading, isError, error,refetch  } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;
  
  if (isError) return (<DashboardError  message={error}   onRetry={() => refetch()} />);

  return (
    <div className="space-y-6 md:space-y-8 pb-10 font-sans px-2 md:px-0">
      <DashboardHeader />
     <StatsGrid user={user} stats={stats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <RevenueChart data={weeklyVolume} />
        <Leaderboard products={leaderboard} />
      </div>

      <StatusSection 
        attentionNeeded={attentionNeeded} 
        activeDispatch={activeDispatch} 
      />
    </div>
  );
};

export default Dashboard;