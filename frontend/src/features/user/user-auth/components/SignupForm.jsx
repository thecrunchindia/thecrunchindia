import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, ChevronLeft, User, Phone, Mail, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSignup } from '../hooks/useSignup';
import logo from '../../../../assets/Logo-web.png';
import logoicon from '../../../../assets/Logocrunch.png';
import loginbg from '../../../../assets/loginbg.jpg';
import TermsModal from '../../../../components/common/TermsModal';
import PrivacyModal from '../../../../components/common/PrivacyModal';

const SignupForm = () => {
  const navigate = useNavigate();
  
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  const {
    step, setStep,
    formData, setFormData,
    otp,
    loading, error,
    timer, canResend,
    inputRefs,
    isAgreed, setIsAgreed,
    formatTime,
    handleOtpChange,
    handleKeyDown,
    handleRegisterSubmit,
    handleVerifySubmit,
    handleResend
  } = useSignup();

  return (
    <>
      <div className="h-screen w-full flex flex-col lg:flex-row bg-[#0a0a0a] overflow-hidden font-sans">

        {/* 1. LEFT CONTENT SECTION */}
        <div className="relative w-full lg:w-[60%] h-[18vh] min-h-[120px] sm:h-[24vh] lg:h-full bg-black flex-shrink-0 overflow-hidden">
          <img src={loginbg} className="absolute inset-0 w-full h-full object-cover opacity-25 lg:opacity-30" alt="Premium Culinary" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden"></div>
          <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent"></div>
          <div className="hidden lg:block absolute top-32 left-25 z-20">
            <img src={logoicon} alt="Logo" className="w-22 h-22 object-contain opacity-90 drop-shadow-2xl" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-center lg:justify-start p-6 lg:p-24 lg:pt-52">
            <div className="flex flex-col items-center lg:hidden">
              <img src={logo} alt="Logo" className="w-24 h-24 sm:w-26 sm:h-26 -mt-8  object-contain drop-shadow-2xl" />
              <p className="text-[7px] font-black uppercase tracking-[0.4em] text-[#f9a602] -mt-6 sm:-mt-8">The Elite Kitchen</p>
            </div>
            <div className="hidden lg:block space-y-10">
              <h1 className="text-7xl lg:text-[100px] font-black uppercase italic leading-[0.9] tracking-tighter text-white">
                Beyond <br /> <span className="text-[#f9a602]">Taste.</span>
              </h1>
              <div className="max-w-md space-y-6">
                <p className="text-gray-300 text-xl font-medium leading-relaxed tracking-wide italic border-l-4 border-[#f9a602] pl-8">The Ultimate Culinary Experience</p>
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-500 pt-4">not just a meal, an experience</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. RIGHT CONTENT SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[40%] flex flex-col items-center justify-start px-6 sm:px-8 lg:px-20 bg-[#0a0a0a] flex-grow pt-4 lg:pt-0 lg:justify-center overflow-y-auto pb-6 lg:pb-0 no-scrollbar min-h-0"
        >
          {/* MODIFIED: Changed space-y-4 to space-y-3 and added my-auto to perfectly center it */}
          <div className="max-w-sm w-full space-y-3 lg:space-y-6 my-auto">
            
            <header className="text-center lg:text-left space-y-0.5 lg:space-y-3 mb-2 lg:mb-0">
              <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight italic">
                Sign <span className="text-[#f9a602]">Up.</span>
              </h2>
              <p className="text-gray-500 text-[8px] lg:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center lg:justify-start gap-2">
                <Zap size={12} className="text-[#f9a602] fill-[#f9a602]" /> Join the Inner Circle
              </p>
            </header>

            <div className="flex flex-col-reverse w-full">
              
              {step === 1 ? (
                // MODIFIED: Changed space-y-4 to space-y-3 to save vertical space
                <form onSubmit={handleRegisterSubmit} className="space-y-3 lg:space-y-6 w-full">
                  
                  {/* Full Name Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <User size={16} className="text-[#f9a602] opacity-70" />
                    </div>
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                      required
                    />
                  </div>

                  {/* Mobile Number Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <span className="text-[#f9a602] font-black text-xs sm:text-sm pr-3 border-r border-white/10">+91</span>
                    </div>
                    <input
                      type="tel"
                      maxLength="10"
                      placeholder="Mobile Number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-[4.5rem] pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                      <Mail size={16} className="text-[#f9a602] opacity-70" />
                    </div>
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-5 py-2.5 lg:py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                    />
                  </div>

                  {/* Terms & Privacy Checkbox */}
                  <div className="flex items-center justify-start gap-3 px-1 pt-2 pb-2">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        type="checkbox"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="w-4 h-4 rounded border-gray-600 bg-white/5 text-[#f9a602] focus:ring-[#f9a602] focus:ring-offset-[#0a0a0a] cursor-pointer"
                      />
                    </div>
                    <label htmlFor="terms" className="text-[9px] sm:text-[10px] text-gray-400 font-medium leading-snug cursor-pointer select-none">
                      I agree to the <span onClick={(e) => { e.preventDefault(); setIsTermsOpen(true); }} className="text-white hover:text-[#f9a602] transition-colors underline underline-offset-2">Terms & Conditions</span> and <span onClick={(e) => { e.preventDefault(); setIsPrivacyOpen(true); }} className="text-white hover:text-[#f9a602] transition-colors underline underline-offset-2">Privacy Policy</span>.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#f9a602] text-black py-3.5 lg:py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] lg:text-[11px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer mt-4"
                  >
                    {loading ? (
                      <><Loader2 className="animate-spin" size={16} /> <span>Sending OTP...</span></>
                    ) : (
                      <><span>Create Account</span> <ArrowRight size={16} strokeWidth={3} /></>
                    )}
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifySubmit} className="space-y-6 lg:space-y-8 w-full mt-2">
                  <div>
                    <p className="text-center text-[#f9a602] text-[10px] font-black uppercase tracking-widest mb-4">Enter 6 Digit OTP</p>
                    
                    {/* OTP Inputs */}
                    <div className="flex justify-between gap-1 sm:gap-2">
                      {otp.map((data, index) => (
                        <input
                          key={index}
                          ref={(el) => (inputRefs.current[index] = el)}
                          type="tel"
                          maxLength="1"
                          value={data}
                          onKeyDown={(e) => handleKeyDown(e, index)}
                          onChange={(e) => handleOtpChange(e.target.value, index)}
                          className="w-full h-12 lg:h-14 bg-white/5 border border-white/10 rounded-xl text-center font-black text-lg sm:text-xl text-[#f9a602] focus:border-[#f9a602] outline-none"
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Verify Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#f9a602] text-black py-3.5 lg:py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] lg:text-[11px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 cursor-pointer"
                    >
                      {loading ? (
                        <><Loader2 className="animate-spin" size={16} /> <span>Verifying...</span></>
                      ) : (
                        <><span>Verify & Register</span> <ShieldCheck size={16} /></>
                      )}
                    </button>

                    <div className="flex flex-col items-center gap-4 lg:gap-6 pt-2">
                      {canResend ? (
                        <button
                          type="button"
                          onClick={handleResend}
                          className="text-[9px] font-black uppercase tracking-widest text-[#f9a602] hover:text-white transition-colors cursor-pointer"
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <p className="text-[9px] font-black uppercase tracking-widest text-gray-500">
                          Resend OTP in <span className="text-[#f9a602]">{formatTime(timer)}</span>
                        </p>
                      )}

                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center justify-center gap-2 cursor-pointer text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white underline underline-offset-4 decoration-[#f9a602]"
                      >
                        <ChevronLeft size={14} /> Back to details
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* Error Message Section */}
              <div className="w-full min-h-[44px] mb-1 flex items-end">
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="w-full p-2.5 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                      <AlertCircle size={16} className="text-red-500 shrink-0" />
                      <p className="text-red-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest leading-tight">
                        {error}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Show 'Already have an account' ONLY in Step 1 */}
            {step === 1 && (
              <div className="pt-3 lg:pt-8 border-t border-white/5 mb-2">
                <div className="flex flex-col items-center lg:items-start gap-2.5 lg:gap-4">
                  <p className="text-[9px] lg:text-[10px] font-medium text-gray-500 tracking-tight">Already have an account?</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="cursor-pointer group flex items-center gap-3 text-white transition-all"
                  >
                    <div className="w-6 h-6 lg:w-7 lg:h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f9a602] group-hover:text-black transition-all">
                      <ChevronLeft size={14} />
                    </div>
                    <span className="font-black uppercase tracking-widest text-[10px] lg:text-[11px] group-hover:text-[#f9a602]">Sign In Now</span>
                    <div className="w-6 h-6 lg:hidden" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      </div>

      {/* Render Modals at the root level */}
      <TermsModal isOpen={isTermsOpen} onClose={() => setIsTermsOpen(false)} />
      <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
    </>
  );
};

export default SignupForm;