## CUSTOM FETCHING HOOK (TanStack React Query)

```javascript
// in src/features/admin/dashboard/hooks/useDashboard.js
import { useQuery } from '@tanstack/react-query';
import api from '../../../../api/axios'; // Pre-configured Axios instance
import { extractErrorMessages } from '../../../../utils/extractErrorMessages';

// Custom hook to fetch Dashboard statistics
export const useDashboard = () => {

  // Using TanStack Query to handle caching, background refetching, and state
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['admin-stats'], // Unique caching key
    queryFn: async () => {
      // API call using our custom axios instance
      const response = await api.get('/dashboard/admin-stats/');
      return response.data;
    },
    refetchInterval: 30000, // Background polling every 30 seconds
  });

  // Return the processed data and states for the component to use
  return {
    stats: data?.stats || {},
    weeklyVolume: data?.weekly_volume || [],
    isLoading, // Tracks if data is currently fetching
    isError, // Tracks if fetching failed
    error: extractErrorMessages(error), // Parsed error string
    refetch, // Function to manually retry the fetch
  };
};
```

## How to use it

```javascript
// in src/Pages/admin/Dashboard.jsx
import { useDashboard, DashboardSkeleton, DashboardError, StatsGrid, RevenueChart } from "../../features/admin/dashboard";

const Dashboard = ({ user }) => {
  // 1. Destructure the exact states and data from the hook
  const { 
    stats, 
    weeklyVolume, 
    isLoading, 
    isError, 
    error,
    refetch  
  } = useDashboard();

  // 2. Handle Loading State gracefully 
  if (isLoading) {
    return <DashboardSkeleton />;
  }
  
  // 3. Handle Error State
  if (isError) {
    return <DashboardError message={error} onRetry={() => refetch()} />;
  }

  // 4. Render UI with structured Data
  return (
    <div className="space-y-6 md:space-y-8 pb-10">
      <StatsGrid user={user} stats={stats} />
      <RevenueChart data={weeklyVolume} />
      {/* ... other components ... */}
    </div>
  );
};

export default Dashboard;
```