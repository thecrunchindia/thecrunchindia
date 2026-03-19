import React from 'react'
import { ChefHat } from 'lucide-react';

const OrderAnimation = () => {
    return (

        <div className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center text-center px-4 overflow-hidden touch-none">
            <div className="absolute inset-0 bg-black"></div>
            <div className="relative z-10">
                <div className="relative mb-8 scale-125 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-white/10 rounded-full"></div>
                    <div className="w-24 h-24 border-4 border-[#f9a602] border-t-transparent rounded-full animate-spin absolute top-0"></div>
                    <ChefHat size={32} className="absolute text-[#f9a602] animate-bounce" />
                </div>
                <h2 className="text-[#f9a602] text-xl font-black tracking-[0.2em] uppercase">
                    Placing Order...
                </h2>
                <p className="text-gray-500 text-[10px] mt-4 uppercase tracking-widest font-bold">
                    Please don't refresh the page
                </p>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                body { overflow: hidden !important; touch-action: none !important; }
            ` }} />
        </div>
    )
}

export default OrderAnimation;