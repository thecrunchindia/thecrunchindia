import { ArrowRight, ShieldCheck, Zap, ChevronRight, ChevronLeft, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogin } from '../hooks/useLogin';
import logo from '../../../../assets/Logo-web.png';
import logoicon from '../../../../assets/Logocrunch.png';
import loginbg from '../../../../assets/loginbg.jpg';

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    step, setStep,
    mobile, setMobile,
    otp,
    loading,
    error,
    timer,
    canResend,
    inputRefs,
    formatTime,
    handleOtpChange,
    handleKeyDown,
    sendOtp,
    verifyOtp,
    resendOtp
  } = useLogin();

  return (
    <div className="h-screen w-full flex flex-col lg:flex-row bg-[#0a0a0a] overflow-hidden font-sans">
      {/* LEFT SIDE - Hero Section */}
      <div className="relative w-full lg:w-[60%] h-[30vh] lg:h-full bg-black flex-shrink-0 overflow-hidden">
        <img src={loginbg} className="absolute inset-0 w-full h-full object-cover opacity-25 lg:opacity-30" alt="Premium Culinary" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent lg:hidden"></div>
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent"></div>
        <div className="hidden lg:block absolute top-32 left-25 z-20">
          <img src={logoicon} alt="Logo" className="w-22 h-22 object-contain opacity-90 drop-shadow-2xl" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center lg:justify-start p-6 lg:p-24 lg:pt-52">
          <div className="flex flex-col items-center lg:hidden">
            <img src={logo} alt="Logo" className="w-30 h-30 -mt-10 object-contain drop-shadow-2xl" />
            <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#f9a602] -mt-8 sm:mt-4">The Elite Kitchen</p>
          </div>
          <div className="hidden lg:block space-y-10">
            <h1 className="text-7xl lg:text-[100px] font-black uppercase italic leading-[0.9] tracking-tighter text-white">
              Beyond <br /> <span className="text-[#f9a602]">Taste.</span>
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form Section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full lg:w-[40%] flex flex-col items-center justify-start lg:justify-center px-8 lg:px-20 bg-[#0a0a0a] flex-grow pt-6 lg:pt-0"
      >
        <div className="max-w-sm w-full space-y-6">
          <header className="text-center lg:text-left space-y-3">
            <h2 className="text-3xl lg:text-7xl font-black uppercase tracking-tighter text-white leading-tight italic">
              Sign <span className="text-[#f9a602]">In.</span>
            </h2>
            <p className="text-gray-500 text-[9px] lg:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center lg:justify-start gap-2">
              <Zap size={12} className="text-[#f9a602] fill-[#f9a602]" />
              The Journey Begins Here
            </p>
          </header>

          <div className="flex flex-col-reverse">
            {step === 1 ? (
              <form onSubmit={sendOtp} className="space-y-6 w-full">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                    <span className="text-[#f9a602] font-black text-sm sm:text-base pr-3 border-r border-white/10">+91</span>
                  </div>
                  <input
                    type="tel"
                    maxLength="10"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Mobile Number"
                    className="w-full pl-20 pr-6 py-3 text-sm sm:text-base bg-white/[0.03] border border-white/10 rounded-2xl focus:border-[#f9a602] transition-all font-bold text-white outline-none placeholder:text-sm placeholder:text-gray-700"
                  />
                </div>
                <button disabled={loading} type="submit" className="w-full bg-[#f9a602] text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <ArrowRight size={16} strokeWidth={3} />
                    </>
                  )}
                </button>
              </form>
            ) : (
              <form onSubmit={verifyOtp} className="space-y-8 w-full">
                <div className="flex justify-between gap-2">
                  {otp.map((data, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="tel"
                      maxLength="1"
                      value={data}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onChange={(e) => handleOtpChange(e.target.value, index)}
                      className="w-full h-12 lg:h-14 bg-white/5 border border-white/10 rounded-xl text-center font-black text-xl text-[#f9a602] focus:border-[#f9a602] outline-none"
                    />
                  ))}
                </div>

                <div className="space-y-4">
                  <button disabled={loading} type="submit" className="w-full bg-[#f9a602] text-black py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50">
                    {loading ? (
                      <>
                        <Loader2 className="animate-spin" size={16} />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <span>Verify Access</span>
                        <ShieldCheck size={16} />
                      </>
                    )}
                  </button>

                  <div className="flex flex-col items-center gap-6">
                    {canResend ? (
                      <button
                        type="button"
                        onClick={resendOtp}
                        disabled={loading}
                        className="text-[9px] font-black uppercase tracking-widest text-[#f9a602] hover:text-white transition-colors cursor-pointer disabled:opacity-50"
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
                      <ChevronLeft size={14} /> Change Number
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Error Message Section - Appears right above the input fields */}
            <div className="w-full min-h-[50px] mb-2 flex items-end">
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10 }}
                    className="w-full p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3"
                  >
                    <AlertCircle size={16} className="text-red-500 shrink-0" />
                    <p className="text-red-500 text-[8px] sm:text-[10px] font-bold uppercase tracking-widest">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* MODIFIED: Show 'Create Account' only in Step 1 */}
          {step === 1 && (
            <div className="pt-8 border-t border-white/5 flex flex-col items-center lg:items-start gap-4">
              <p className="text-[10px] font-medium text-gray-500">New to our table?</p>
              
              <button onClick={() => navigate('/signup')} className="group flex items-center gap-3 text-white cursor-pointer">
                <div className="w-7 h-7 lg:hidden" /> 
                <span className="font-black uppercase tracking-widest text-[11px] group-hover:text-[#f9a602] transition-colors">
                  Create Account
                </span>
                <div className="w-7 h-7 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#f9a602] group-hover:text-black transition-all">
                  <ChevronRight size={14} />
                </div>
              </button>
            </div>
          )}
          
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;