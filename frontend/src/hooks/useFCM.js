import { useEffect } from "react";
import { messaging, getToken, onMessage } from "../utils/firebase";
import api from "../api/axios";
import { toast } from "sonner";

export const useFCM = (isAdminPath, user) => {
  useEffect(() => {
    const setupFCM = async () => {
      const adminToken = localStorage.getItem("admin_token");

      if (isAdminPath && adminToken && "Notification" in window) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const token = await getToken(messaging, {
              vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
            });

            if (token) {
              await api.post(
                "/notifications/save-fcm-token/",
                { fcm_token: token },
                { headers: { Authorization: `Bearer ${adminToken}` } }
              );
              console.log("FCM Token saved successfully");
            }
          }
        } catch (error) {
          console.error("Error setting up FCM:", error);
        }
      }
    };

    setupFCM();

    const unsubscribe = onMessage(messaging, (payload) => {
      toast.success(`${payload.notification.title}: ${payload.notification.body}`, {
        duration: 4000,
      });
      new Audio("/OrderNotify.mp3").play().catch(() => {});
    });

    return () => unsubscribe();
  }, [user, isAdminPath]); 
};