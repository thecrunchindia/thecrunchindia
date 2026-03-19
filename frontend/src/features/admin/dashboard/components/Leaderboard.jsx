import { Award } from "lucide-react";

export default function Leaderboard({ products: apiProducts = [] }) {
  
  const maxSold = apiProducts.length > 0 
    ? Math.max(...apiProducts.map(p => p.sold)) 
    : 1;

  return (
    <div className="bg-[#111111] p-6 md:p-8 rounded-[2.5rem] md:rounded-[3rem] text-white shadow-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Award className="text-primary" size={22} />
        <h3 className="text-lg md:text-xl font-black uppercase tracking-tight">Leaderboard</h3>
      </div>
      <div className="space-y-6 md:space-y-8">
        {apiProducts.map((p, i) => {
          const percentage = (p.sold / maxSold) * 100;

          return (
            <div key={i} className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-black uppercase">
                <p className="truncate pr-2">{p.item}</p>
                <p className="text-primary">{p.sold} Sold</p>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-1000" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}

        {apiProducts.length === 0 && (
          <p className="text-[10px] text-gray-500 font-bold uppercase text-center py-4">
            No sales data available
          </p>
        )}
      </div>
    </div>
  );
}