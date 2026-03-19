import React from "react";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const RevenueChart = ({ data }) => (
  <div className="bg-white p-5 sm:p-8 rounded-[2rem] sm:rounded-[2.5rem] border border-gray-100 shadow-sm">
    <div className="flex items-center justify-between mb-8 px-1">
      <div>
        <h3 className="text-base sm:text-lg font-black uppercase text-[#1A1A1A] tracking-tighter">
          Sales Performance
        </h3>
        <p className="text-[9px] text-gray-400 font-black uppercase tracking-[0.2em] mt-0.5">
          Revenue Overview
        </p>
      </div>
      <div className="bg-primary/10 p-2 rounded-xl">
        <TrendingUp className="text-primary" size={20} />
      </div>
    </div>

    <div className="w-full h-[300px] min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            {/* ഡാഷ്‌ബോർഡിലെ അതേ ഗോൾഡൻ ഗ്രേഡിയന്റ് */}
            <linearGradient id="colorSalesPerformance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ffb60a" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ffb60a" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          
          <XAxis 
            dataKey="date" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fontWeight: 900, fill: '#1A1A1A', textTransform: 'uppercase' }} 
            dy={10}
          />
          
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 9, fontWeight: 900, fill: '#9ca3af' }} 
          />
          
          <Tooltip 
            cursor={{ stroke: '#ffb60a', strokeWidth: 1, strokeDasharray: '5 5' }}
            contentStyle={{ 
              borderRadius: '16px', 
              border: 'none', 
              backgroundColor: '#1A1A1A', 
              color: '#fff',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', 
              fontWeight: '900', 
              fontSize: '11px',
              padding: '12px'
            }} 
            itemStyle={{ color: '#ffb60a' }}
            labelStyle={{ color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', fontSize: '9px' }}
          />

          <Area 
            type="monotone" 
            dataKey="amount" 
            stroke="#ffb60a"
            strokeWidth={4} 
            fillOpacity={1} 
            fill="url(#colorSalesPerformance)" 
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  </div>
);

export default RevenueChart;