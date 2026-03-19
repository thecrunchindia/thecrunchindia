import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./hooks/ScrollToTop";
import { Toaster } from "./components/ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider, useSelector } from "react-redux";
import { store } from "./redux/store";
import { AnimatePresence } from "framer-motion";
import SiteLaunchLoader from "./components/ui/SiteLaunchLoader";
import ServerErrorPage from "./components/ui/ServerErrorPage";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { useFCM } from "./hooks/useFCM";

const queryClient = new QueryClient();

const AppContent = () => {
  const { isChecking, globalError } = useSelector((state) => state.location);
  const user = useSelector((state) => state.auth?.user);
  const currentPath = window.location.pathname;
  const isAdminPath = currentPath.startsWith("/admin");
  const isAuthPath = currentPath === "/login" || currentPath === "/signup";

  const showLoader = isChecking && !isAdminPath && !isAuthPath && !globalError;

  useFCM(isAdminPath, user);

  if (globalError && !isAdminPath) {
    return <ServerErrorPage />;
  }

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {showLoader && <SiteLaunchLoader key="launch-loader" />}
      </AnimatePresence>
      <ScrollToTop />
      <Toaster position="top-center" />
      <div style={{ visibility: showLoader ? "hidden" : "visible" }}>
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;