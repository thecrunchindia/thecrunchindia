import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import api from "../api/axios";
import { extractErrorMessages } from "../utils/extractErrorMessages";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const audioRef = useRef(new Audio(`/OrderNotify.mp3?t=${Date.now()}`));
  
  const prevOrderCount = useRef(null); 

  const { data: notifications = [], isLoading, isError, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await api.get("/notifications/unread/");
      return response.data;
    },
    refetchInterval: 8000, 
  });

  useEffect(() => {
    const orderNotif = notifications.find(n => n.type === 'order');
    const currentCount = orderNotif ? orderNotif.count : 0;

    if (prevOrderCount.current !== null && currentCount > prevOrderCount.current) {
      
      audioRef.current.currentTime = 0;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise.catch(e => console.error("Autoplay Blocked - Click anywhere on the page first", e));
      }

      if (Notification.permission === "granted") {
        new Notification("New Order Received! 🔔", {
          body: `You have ${currentCount} new orders to process.`,
          icon: "/icon-192.png",
          requireInteraction: true
        });
      }
    }

    prevOrderCount.current = currentCount;
  }, [notifications]);

  const markAsReadMutation = useMutation({
    mutationFn: async (type) => {
      const response = await api.post(`/notifications/mark-read/${type}/`);
      return response.data;
    },
    onMutate: async (type) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });
      const previousNotifications = queryClient.getQueryData(["notifications"]);
      queryClient.setQueryData(["notifications"], (old) =>
        old ? old.filter((n) => n.type !== type) : []
      );
      return { previousNotifications };
    },
    onError: (err, type, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(["notifications"], context.previousNotifications);
      }
      console.error("Notification Error:", extractErrorMessages(err));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    notifications,
    isLoading,
    isError,
    errorMessage: extractErrorMessages(error),
    markAsRead: markAsReadMutation.mutate,
  };
};