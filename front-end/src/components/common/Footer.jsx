import { useState } from "react";
import { Link } from "react-router-dom";
import { useSiteInfo } from "../../hooks/useSiteInfo";
import { 
  RiInstagramFill, 
  RiFacebookCircleFill, 
  RiTwitterXFill, 
  RiWhatsappFill,
  RiMapPin2Line,
  RiPhoneLine,
  RiMailLine,
  RiTimeLine,
  RiHome4Line,
  RiUserStarLine,
  RiChatSmile3Line,
  RiArrowRightSLine
} from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import Logo from "../../assets/Logo-web.png";
import TermsModal from "../common/TermsModal";
import PrivacyModal from "../common/PrivacyModal";

const Footer = () => {
  const { data: info, isLoading } = useSiteInfo();
  
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  if (isLoading) return <footer className="bg-[#0A0A0A] h-20"></footer>;

  return (
    <>
      <footer className="bg-[#0A0A0A] text-white pt-12 md:pt-20 pb-32 md:pb-12 border-t border-white/5">
        <div className="max-w-[1440px] mx-auto px-6 md:px-10">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-white/5 pb-12 md:pb-16">
            
            {/* 1. Brand & About */}
            <div className="flex flex-col ">
              <Link to="/" className="inline-block group">
                <img 
                  src={Logo} 
                  alt={`${info?.appName || 'App'} Logo`}
                  className="h-18 md:h-25 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]" 
                />
              </Link>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium max-w-xs">
                {info?.footerDescription}
              </p>

              {/* Social Icons */}
              <div className="flex gap-5 pt-5">
                <a href={info?.socials?.instagram !== "#" ? `https://instagram.com/${info?.socials?.instagram}` : "#"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#E4405F] transition-all transform hover:-translate-y-1">
                  <RiInstagramFill size={20} />
                </a>
                <a href={info?.socials?.facebook !== "#" ? `https://facebook.com/${info?.socials?.facebook}` : "#"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#1877F2] transition-all transform hover:-translate-y-1">
                  <RiFacebookCircleFill size={20} />
                </a>
                <a href={info?.socials?.twitter !== "#" ? `https://twitter.com/${info?.socials?.twitter}` : "#"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-all transform hover:-translate-y-1">
                  <RiTwitterXFill size={18} />
                </a>
                <a href={info?.socials?.whatsapp !== "#" ? `https://wa.me/${info?.socials?.whatsapp}` : "#"} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-[#25D366] transition-all transform hover:-translate-y-1">
                  <RiWhatsappFill size={20} />
                </a>
              </div>
            </div>

            {/* 2. Navigation */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6 md:mb-8 border-l-2 border-primary pl-3">Navigation</h4>
              <ul className="space-y-4 text-gray-400">
                {[
                  { name: "Home", path: "/", icon: <RiHome4Line /> },
                  { name: "Menu", path: "/menu", icon: <IoFastFoodOutline /> },
                  { name: "About Us", path: "/about", icon: <RiUserStarLine /> },
                  { name: "Contact Us", path: "/contact", icon: <RiChatSmile3Line /> },
                ].map((link) => (
                  <li key={link.name}>
                    <Link to={link.path} className="flex items-center gap-3 text-xs md:text-sm font-semibold hover:text-primary transition-all group">
                      <span className="text-base md:text-lg group-hover:scale-110 transition-transform">{link.icon}</span>
                      <span className="relative">
                         {link.name}
                         <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-primary transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. Working Hours */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6 md:mb-8 border-l-2 border-primary pl-3">Working Hours</h4>
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <RiTimeLine className="text-primary shrink-0" size={18} />
                  <div className="text-[11px] md:text-xs">
                    <p className="text-gray-500 font-bold uppercase text-[9px] mb-1">Mon - Sat</p>
                    <p className="text-white font-medium">{info?.workingHours?.weekdays}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <RiTimeLine className="text-primary shrink-0" size={18} />
                  <div className="text-[11px] md:text-xs">
                    <p className="text-gray-500 font-bold uppercase text-[9px] mb-1">Sunday</p>
                    <p className="text-white font-medium">{info?.workingHours?.sunday}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. Get In Touch */}
            <div>
              <h4 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-white/50 mb-6 md:mb-8 border-l-2 border-primary pl-3">Get In Touch</h4>
              <ul className="space-y-6">
                <li>
                  <a 
                    href={info?.latitude ? `https://www.google.com/maps?q=${info?.latitude},${info?.longitude}` : "#"} 
                    target="_blank" rel="noreferrer" 
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                      <RiMapPin2Line size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-600 uppercase mb-0.5">Visit Us</p>
                      <p className="text-xs md:text-sm font-medium text-white/80 group-hover:text-white transition-colors leading-snug">
                        {info?.type_address}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`tel:+91${info?.phone}`} className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                      <RiPhoneLine size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-600 uppercase mb-0.5">Call Us</p>
                      <p className="text-xs md:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        +91 {info?.phone}
                      </p>
                    </div>
                  </a>
                </li>
                <li>
                  <a href={`mailto:${info?.email}`} className="flex items-center gap-4 group">
                    <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all shrink-0">
                      <RiMailLine size={18} />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-gray-600 uppercase mb-0.5">Email Us</p>
                      <p className="text-xs md:text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                        {info?.email}
                      </p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col items-center md:items-start gap-1">
              <p className="text-[9px] md:text-[10px] font-bold text-gray-600 uppercase tracking-widest text-center md:text-left leading-loose">
                © {new Date().getFullYear()} {info?.appName}. All rights reserved
              </p>
              {/* Developed By Section */}
              <p className="text-[8px] md:text-[9px] font-medium text-gray-700 uppercase tracking-widest">
                Developed by <a href="www.yourbrand.com" className="text-gray-500 hover:text-primary transition-colors">Your Brand</a>
              </p>
            </div>
            
            <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} 
                className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
              >
                <RiArrowRightSLine className="text-primary group-hover:translate-x-1 transition-transform" /> Terms
              </a>
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }} 
                className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
              >
                <RiArrowRightSLine className="text-primary group-hover:translate-x-1 transition-transform" /> Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Render Modals */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
};

export default Footer;