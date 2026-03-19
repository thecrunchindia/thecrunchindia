import React from "react";
import { ShoppingBag, Clock, Users, DollarSign } from "lucide-react";

export default function StatsGrid({ user, stats: apiStats }) {
  const isAdmin = user?.role === "admin";

  const stats = [
    { 
      title: "Total Orders", 
      value: apiStats?.total_orders?.toLocaleString() || "0", 
      icon: <ShoppingBag />, 
      color: "bg-[#1A1A1A]", 
      show: true 
    },
    { 
      title: "Pending Dispatch", 
      value: apiStats?.pending_dispatch?.toString().padStart(2, '0') || "00", 
      icon: <Clock />, 
      color: "bg-rose-500", 
      show: true 
    },
    { 
      title: "Active Customers", 
      value: apiStats?.active_customers?.toLocaleString() || "0", 
      icon: <Users />, 
      color: "bg-blue-600", 
      show: isAdmin 
    },
    { 
      title: "Total Revenue", 
      value: `₹ ${apiStats?.total_revenue?.toLocaleString() || "0"}`, 
      icon: <DollarSign />, 
      color: "bg-emerald-600", 
      show: isAdmin 
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
      {stats.map((stat, index) => stat.show && (
        <button key={index} className="group relative bg-white p-5 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 active:scale-95 text-left h-[130px] flex flex-col justify-between overflow-hidden">
          <div className="flex items-center gap-3">
            <div className={`${stat.color} w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md group-hover:rotate-[5deg] transition-transform`}>
              {React.cloneElement(stat.icon, { size: 16, strokeWidth: 2.5 })}
            </div>
            <p className="text-[10px] font-black uppercase text-gray-600 tracking-widest truncate">{stat.title}</p>
          </div>
          <h3 className="text-3xl font-black text-[#1A1A1A] tracking-tighter">{stat.value}</h3>
          <div className="absolute bottom-5 right-6 w-1 h-1 rounded-full bg-gray-200 group-hover:bg-primary transition-colors" />
        </button>
      ))}
    </div>
  );
}