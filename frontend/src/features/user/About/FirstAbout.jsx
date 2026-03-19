import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Leaf, ShieldCheck, Award, Heart } from 'lucide-react';
import soup from "../../../assets/soup.jpg";
import Rice from "../../../assets/Rice.jpg";

import Food from "../../../assets/Food.webp";



const FirstAbout = () => {
  return (
    <div className="min-h-screen bg-white text-[#1e2939] font-sans selection:bg-[var(--color-primary)] selection:text-[#1e2939] overflow-x-hidden">

      {/* =========================================
          📱 1. MOBILE VIEW (Visible < 768px)
      ========================================= */}
      <div className="block md:hidden">

        {/* Mobile Hero */}
        <section className="px-5 py-12 text-left">
          <span className="text-[var(--color-primary)] font-bold tracking-widest text-xs uppercase mb-2 block">Our Mission</span>
          <h1 className="text-4xl font-black leading-[1.1] mb-2 text-[#1e2939]">
            Crafting  Happiness.
          </h1>
          <p className="text-lg font-bold text-[var(--color-primary)] mb-2">One Meal at a Time.</p>
          <p className="text-[#1e2939]/80 text-sm leading-relaxed mb-6">
            More than just food, we serve an experience. Born from a passion for authentic flavors.
          </p>
          <div className="w-16 h-1 bg-[var(--color-primary)]"></div>
        </section>

        {/* Mobile Story */}
        <section className="px-5 pb-12">
          <div className="flex gap-2 overflow-hidden mb-8">
            <img src={Rice} alt="Cooking" className="w-2/3 h-56 object-cover rounded-lg border border-gray-100" />
            <div className="w-1/3 flex flex-col gap-2">
              <img src={Food} alt="Food" className="h-24 object-cover rounded-lg border border-gray-100" />
              <div className="h-full  rounded-lg flex items-center justify-center">
                <img src={soup} alt="Cooking" className="object-cover rounded-lg border border-gray-100" />
              </div>
            </div>
          </div>

          <h2 className="text-3x2  font-bold mb-1 text-[#1e2939]">The Secret Ingredient
            is </h2><span className="text-[var(--color-primary)] font-bold text-1xl">Passion.</span>
          <div className="text-[#1e2939]/80 text-sm leading-7 mb-6 space-y-4">
            <p>Our journey began in a small kitchen with a big dream: to bring restaurant-quality hygiene and home-cooked love together.</p>
            <p>We don't believe in shortcuts. From hand-picking the freshest vegetables at dawn to slow-cooking our sauces, every step is a testament to our commitment to quality.</p>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-6">
            <div><h4 className="text-3xl font-black text-[var(--color-primary)]">100%</h4><p className="text-[10px] font-bold text-black uppercase tracking-wider">Fresh</p></div>
            <div><h4 className="text-3xl font-black text-[var(--color-primary)]">0%</h4><p className="text-[10px] font-bold text-black uppercase tracking-wider">Preservatives</p></div>
          </div>
        </section>

        {/* Mobile Features */}
        <section className="bg-gray-50 px-5 py-10">
          <h3 className="text-xl font-bold mb-6 text-[#1e2939]">Why Choose Us?</h3>
          <div className="space-y-4">
            <MobileFeatureRow icon={<Leaf />} title="Farm Fresh" desc="Sourced directly from farmers." />
            <MobileFeatureRow icon={<ChefHat />} title="Master Chefs" desc="Culinary experts at work." />
            <MobileFeatureRow icon={<ShieldCheck />} title="Top Hygiene" desc="Safety protocols followed." />
            <MobileFeatureRow icon={<Award />} title="Premium Quality" desc="Best ingredients only." />
          </div>
        </section>

        {/* Mobile CTA - SMALLER BUTTON HERE */}
        <section className="px-5 py-12 text-center">
          <h2 className="text-1xl font-bold mb-6 text-[#1e2939]">Taste the difference today</h2>
          <Link
            to="/menu"
            // Changed: w-fit, px-6, py-2.5, text-sm to make it smaller
            className="inline-block bg-[#1e2939] text-white font-bold py-2 px-4 rounded-full shadow-lg active:scale-95 transition-transform text-sm w-fit"
          >
            Explore Full Menu
          </Link>
        </section>
      </div>


      {/* =========================================
          💻 2. TABLET VIEW (Visible 768px - 1023px)
      ========================================= */}
      <div className="hidden md:block lg:hidden">

        {/* Tablet Hero */}
        <section className="relative py-16 px-6 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight mb-4 text-[#1e2939] leading-tight">
              Crafting Happiness, <br />
              <span className="text-[var(--color-primary)]">One Meal at a Time.</span>
            </h1>
            <p className="text-[#1e2939]/80 text-lg mx-auto mb-8 leading-relaxed font-medium">
              More than just food, we serve an experience. Born from a passion for authentic flavors and uncompromising quality.
            </p>
          </div>
        </section>

        {/* Tablet Story */}
        <section className="container mx-auto px-6 py-12">
          <div className="flex flex-col gap-10">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src={soup} alt="Chefs" className="rounded-2xl h-56 w-full object-cover shadow-md" />
                <img src={Rice}  alt="Ingredients" className="rounded-2xl h-56 w-full object-cover shadow-md mt-6" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-full shadow-lg">
                <Heart className="w-6 h-6 text-red-500 fill-current" />
              </div>
            </div>

            <div className="space-y-4 text-center">
              <h2 className="text-4xl font-bold text-[#1e2939]">
                The Secret Ingredient <br /> is <span className="text-[var(--color-primary)]">Passion.</span>
              </h2>
              <p className="text-[#1e2939]/80 text-base leading-relaxed">
                Our journey began in a small kitchen with a big dream: to bring restaurant-quality hygiene and home-cooked love together.
              </p>
              <p className="text-[#1e2939]/80 text-base leading-relaxed">
                We don't believe in shortcuts. From hand-picking the freshest vegetables at dawn to slow-cooking our sauces, every step is a testament to our commitment to quality.
              </p>
              <div className="pt-4 flex gap-8 justify-center">
                <div><h4 className="text-3xl font-bold text-[var(--color-primary)]">100%</h4><p className="text-xs font-bold text-[#1e2939]/60 uppercase">Fresh</p></div>
                <div><h4 className="text-3xl font-bold text-[var(--color-primary)]">0%</h4><p className="text-xs font-bold text-[#1e2939]/60 uppercase">Preservatives</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Tablet Features (2x2 Grid) */}
        <section className="bg-gray-50 py-16 my-8">
          <div className="container mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3 text-[#1e2939]">Why Trust Our Kitchen?</h2>
              <p className="text-[#1e2939]/80">We adhere to the strictest standards.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <DesktopFeatureCard icon={<Leaf />} title="Farm Fresh" desc="Sourced directly from farmers." />
              <DesktopFeatureCard icon={<ChefHat />} title="Master Chefs" desc="Experts crafting recipes." />
              <DesktopFeatureCard icon={<ShieldCheck />} title="Top Hygiene" desc="Safety protocols followed." />
              <DesktopFeatureCard icon={<Award />} title="Premium Quality" desc="Best ingredients only." />
            </div>
          </div>
        </section>

        {/* Tablet CTA */}
        <section className="py-16 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#1e2939]">Taste the difference today.</h2>
          <Link to="/menu" className="inline-block bg-[#1e2939] text-white font-bold py-3 px-8 rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 shadow-md">Explore Our Menu</Link>
        </section>
      </div>


      {/* =========================================
          💻 3. DESKTOP VIEW (Visible 1024px +)
      ========================================= */}
      <div className="hidden lg:block">

        {/* Desktop Hero */}
        <section className="relative py-24 px-6 text-center overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[var(--color-primary)]/15 rounded-full blur-[100px] -z-10"></div>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl font-bold tracking-tight mb-6 text-[#1e2939] leading-tight">
              Crafting Happiness, <br />
              <span className="text-[var(--color-primary)]">One Meal at a Time.</span>
            </h1>
            <p className="text-[#1e2939]/80 text-xl max-w-2xl mx-auto mb-8 leading-relaxed font-medium">
              More than just food, we serve an experience. Born from a passion for authentic flavors and uncompromising quality.
            </p>
          </div>
        </section>

        {/* Desktop Story */}
        <section className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img src={soup} alt="Chefs" className="rounded-2xl h-64 w-full object-cover shadow-lg hover:scale-105 transition-transform duration-500" />
                <img src={Rice} alt="Ingredients" className="rounded-2xl h-64 w-full object-cover shadow-lg mt-8 hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl">
                <Heart className="w-8 h-8 text-red-500 fill-current" />
              </div>
            </div>
            <div className="space-y-6 text-left">
              <h2 className="text-5xl font-bold text-[#1e2939]">
                The Secret Ingredient <br /> is <span className="text-[var(--color-primary)]">Passion.</span>
              </h2>
              <p className="text-[#1e2939]/80 text-lg leading-relaxed">
                Our journey began in a small kitchen with a big dream: to bring restaurant-quality hygiene and home-cooked love together.
              </p>
              <p className="text-[#1e2939]/80 text-lg leading-relaxed">
                We don't believe in shortcuts. From hand-picking the freshest vegetables at dawn to slow-cooking our sauces, every step is a testament to our commitment to quality.
              </p>
              <div className="pt-4 flex gap-8">
                <div><h4 className="text-3xl font-bold text-[var(--color-primary)]">100%</h4><p className="text-sm font-bold text-[#1e2939]/60 uppercase">Fresh</p></div>
                <div><h4 className="text-3xl font-bold text-[var(--color-primary)]">0%</h4><p className="text-sm font-bold text-[#1e2939]/60 uppercase">Preservatives</p></div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Features */}
        <section className="bg-gray-50 py-24 my-12">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-4xl font-bold mb-4 text-[#1e2939]">Why Trust Our Kitchen?</h2>
              <p className="text-[#1e2939]/80">We adhere to the strictest standards of safety and quality.</p>
            </div>
            <div className="grid grid-cols-4 gap-8">
              <DesktopFeatureCard icon={<Leaf />} title="Farm Fresh" desc="Sourced directly from farmers." />
              <DesktopFeatureCard icon={<ChefHat />} title="Master Chefs" desc="Experts crafting recipes." />
              <DesktopFeatureCard icon={<ShieldCheck />} title="Top Hygiene" desc="Safety protocols followed." />
              <DesktopFeatureCard icon={<Award />} title="Premium Quality" desc="Best ingredients only." />
            </div>
          </div>
        </section>

        {/* Desktop CTA */}
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#1e2939]">Taste the difference today.</h2>
          <Link to="/menu" className="inline-block bg-[#1e2939] text-white font-bold py-4 px-10 rounded-full hover:bg-[var(--color-primary)] hover:text-black transition-all duration-300 shadow-lg cursor-pointer">
            Explore Our Menu
          </Link>
        </section>

      </div>

    </div>
  )
}

// --- SUB COMPONENTS ---

const MobileFeatureRow = ({ icon, title, desc }) => (
  <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-100">
    <div className="w-10 h-10 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-lg flex items-center justify-center shrink-0">
      <div className="w-5 h-5">{icon}</div>
    </div>
    <div>
      <h4 className="font-bold text-sm text-[#1e2939]">{title}</h4>
      <p className="text-xs text-[#1e2939]/60">{desc}</p>
    </div>
  </div>
);

const DesktopFeatureCard = ({ icon, title, desc }) => (
  <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300 flex flex-col items-center">
    <div className="w-16 h-16 bg-[var(--color-primary)]/10 text-[var(--color-primary)] rounded-full flex items-center justify-center mb-6">
      <div className="w-8 h-8">{icon}</div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-[#1e2939]">{title}</h3>
    <p className="text-[#1e2939]/70 text-sm">{desc}</p>
  </div>
);

export default FirstAbout