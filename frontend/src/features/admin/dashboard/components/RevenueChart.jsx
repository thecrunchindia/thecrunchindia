import { BarChart3 } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function WeeklyOrderChart({ data: apiData = [] }) {
  const chartData = apiData.map(item => ({
    name: item.day,
    orders: item.orders
  }));

  return (
    <div className="lg:col-span-2 bg-white p-5 md:p-8 rounded-[2.5rem] md:rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8 px-2">
        <div>
          <h3 className="text-lg md:text-xl font-black uppercase tracking-tight text-[#1A1A1A]">Weekly Order Volume</h3>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Performance Analysis</p>
        </div>
        <div className="bg-primary/10 p-2.5 rounded-2xl hidden sm:block">
          <BarChart3 className="text-primary" size={22} />
        </div>
      </div>

      <div className="w-full">
        <ResponsiveContainer width="100%" aspect={window.innerWidth < 768 ? 1.5 : 2.5}>
          <AreaChart data={chartData} margin={{ left: 15, right: 15, top: 10, bottom: 20 }}>
            <defs>
              <linearGradient id="colorOrderVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#ffb60a" stopOpacity={0.4} />
                <stop offset="90%" stopColor="#ffb60a" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              dy={15} 
              interval={0} 
              tick={{ fill: '#1A1A1A', fontSize: 10, fontWeight: 900, textTransform: 'uppercase' }} 
            />
            
            <YAxis hide />

            {/* ടൂൾടിപ്പ് സ്റ്റൈൽ റെവന്യൂ ചാർട്ടിലേതുപോലെ മാറ്റി */}
            <Tooltip 
              cursor={{ stroke: '#ffb60a', strokeWidth: 1, strokeDasharray: '5 5' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                backgroundColor: '#1A1A1A', // Dark Theme Tooltip
                color: '#fff',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.2)', 
                fontWeight: '900', 
                fontSize: '11px',
                padding: '12px'
              }} 
              itemStyle={{ color: '#ffb60a' }} // Value color
              labelStyle={{ color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', fontSize: '9px' }}
            />

            <Area 
              type="monotone" 
              dataKey="orders" 
              stroke="#ffb60a" // Solid Primary Gold
              strokeWidth={4} 
              fill="url(#colorOrderVolume)" 
              animationDuration={1500} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}