import { RiShieldCheckLine, RiTimerFlashLine, RiLeafLine, RiPriceTag3Line } from "react-icons/ri";

const features = [
  {
    id: 1,
    title: "Super Fast",
    desc: "Delivery in 30 mins",
    icon: <RiTimerFlashLine className="text-primary size-5 md:size-8" />,
  },
  {
    id: 2,
    title: "Safe Pack",
    desc: "100% Hygienic",
    icon: <RiShieldCheckLine className="text-primary size-5 md:size-8" />,
  },
  {
    id: 3,
    title: "Best Offers",
    desc: "Pocket Friendly Deals",
    icon: <RiPriceTag3Line className="text-primary size-5 md:size-8" />,
  },
  {
    id: 4,
    title: "Freshness",
    desc: "Farm to kitchen",
    icon: <RiLeafLine className="text-primary size-5 md:size-8" />,
  },
];

const BrandFeatures = () => {
  return (
    <section className="py-6 md:py-12 bg-white border-t border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-10">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="group flex flex-col items-center text-center md:flex-row md:text-left md:items-center gap-2 md:gap-4 p-1 md:p-2 rounded-2xl transition-all duration-300"
            >
              {/* MODIFIED: Smaller Icon Container for mobile */}
              <div className="p-2.5 md:p-4 bg-gray-50 rounded-xl md:rounded-2xl group-hover:scale-110 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                {feature.icon}
              </div>

              <div className="flex flex-col">
                <h3 className="font-black uppercase text-[10px] md:text-base text-gray-900 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[7px] md:text-xs font-bold text-gray-500 uppercase mt-0.5 leading-tight">
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandFeatures;