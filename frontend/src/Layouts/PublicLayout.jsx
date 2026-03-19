import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ReviewModal from "../components/common/ReviewModal";
import { useReviews } from "../features/user/profile/hooks/useReviews";
import { fetchCart } from "../redux/cartSlice";
import { checkInitialStatus } from "../hooks/locationActions";

const PublicLayout = () => {
  const dispatch = useDispatch();
  const { eligibility } = useReviews();
  const [showPopup, setShowPopup] = useState(false);

  // 1. Initial Cart Fetch
  useEffect(() => {
    const token = localStorage.getItem('user_access');
    if (token) {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // 2. Initial App Setup & Real-time store status check (Polls every 20 seconds)
  useEffect(() => {
    const initializeApp = async () => {
      await dispatch(checkInitialStatus(false, true));
    };
    
    initializeApp();

    const interval = setInterval(() => {
      dispatch(checkInitialStatus(true, false));
    }, 20000);
    
    return () => clearInterval(interval);
  }, [dispatch]);

  // 3. Review Popup Logic
  useEffect(() => {
    if (eligibility?.is_eligible && !eligibility?.has_reviewed) {
      setShowPopup(true);
    }
  }, [eligibility]);

  return (
    <div className="flex flex-col w-full">
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <ReviewModal isOpen={showPopup} onClose={() => setShowPopup(false)} />
      <Footer />
    </div>
  );
};

export default PublicLayout;