import React from 'react';
import { Lock, User, Loader2, ShieldCheck, ArrowRight, Eye, EyeOff, Activity, ShoppingCart, AlertCircle } from 'lucide-react';
import Logo from "../../../assets/Logocrunch.png";
import { useAdminLogin } from './useAdminLogin';

const AdminLoginForm = () => {
  const { 
    credentials, 
    loading, 
    showPassword, 
    error,
    handleChange, 
    handleLogin, 
    togglePasswordVisibility 
  } = useAdminLogin();

  return (
    <div className="min-h-screen w-full flex bg-[#050505] overflow-hidden font-sans">
      
      {/* --- LEFT SIDE: Live Brand Impact (Laptop View) --- */}
      <div className="hidden lg:flex w-[45%] relative flex-col items-center justify-center border-r border-white/5 bg-[#080808] p-12">
        {/* Ambient Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-[120px] opacity-50" />
        
        <div className="relative z-10 w-full max-w-sm text-center lg:text-left">
          <div className="mb-0">
            <img src={Logo} alt="Logo" className="h-20 w-auto" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">
              THE <br /> <span className="text-primary italic tracking-normal">CRUNCH</span>
            </h1>
            <div className="flex items-center gap-3 py-2 justify-center lg:justify-start">
              <div className="h-[1px] w-8 bg-primary/50" />
              <span className="text-primary/70 text-[10px] font-black uppercase tracking-[0.3em]">Management System</span>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-y-10 gap-x-8 pt-12 border-t border-white/5">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Activity size={16} className="text-primary" />
                </div>
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="text-left">
                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Live Traffic</h4>
                <p className="text-gray-500 text-[9px] uppercase leading-tight font-medium mt-1">Monitoring active <br />engagement</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShoppingCart size={16} className="text-primary" />
                </div>
                <span className="text-[10px] font-mono text-primary/80 uppercase">Active</span>
              </div>
              <div className="text-left">
                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Real-time Orders</h4>
                <p className="text-gray-500 text-[9px] uppercase leading-tight font-medium mt-1">Tracking throughput & <br />revenue</p>
              </div>
            </div>
          </div>
        </div>

        {/* System Metadata Strip */}
        <div className="absolute bottom-10 left-12 flex items-center gap-6 opacity-30 font-mono">
            <div className="flex flex-col">
                <span className="text-[7px] text-gray-400 uppercase tracking-tighter">Terminal</span>
                <span className="text-[9px] text-white tracking-widest uppercase font-bold">$log</span>
            </div>
            <div className="flex flex-col border-l border-white/10 pl-6">
                <span className="text-[7px] text-gray-400 uppercase tracking-tighter">Identity</span>
                <span className="text-[9px] text-white tracking-widest uppercase">{credentials.username || 'AUTH_PENDING'}</span>
            </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: Form & Mobile Branding --- */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative bg-gradient-to-b from-transparent to-primary/[0.02]">
        
        {/* MOBILE ONLY LOGO TOP */}
        <div className="lg:hidden flex flex-col items-center mb-10 text-center">
            <img src={Logo} alt="Logo" className="h-15 w-auto mb-0" />
            <h2 className="text-2xl font-black text-white uppercase tracking-tighter italic">The <span className="text-primary">Crunch</span></h2>
            <div className="w-8 h-[1px] bg-primary/50 mt-1" />
        </div>

        <div className="w-full max-w-[340px] z-10">
          <div className="mb-10 text-left">
            <h3 className="text-3xl font-black text-white uppercase tracking-tight">Login</h3>
            <div className="flex items-center gap-2 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Awaiting Verification</p>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            
            {/* --- Error Message UI --- */}
            {error && (
              <div className="flex items-start gap-3 p-3 rounded-xl bg-red-500/10 border border-red-500/20 animate-in fade-in slide-in-from-top-2">
                <AlertCircle className="text-red-500 shrink-0" size={16} />
                <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider leading-tight">
                  {error}
                </p>
              </div>
            )}

            <div className="space-y-4">
              {/* Personnel ID */}
              <div className="space-y-2 group">
                <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Personnel ID</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={15} />
                  <input
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-4 py-3 bg-white/[0.02] border ${error ? 'border-red-500/30' : 'border-white/10'} rounded-xl focus:border-primary/40 focus:bg-white/[0.04] outline-none transition-all text-white text-xs font-semibold placeholder:text-gray-800`}
                    placeholder="Username"
                  />
                </div>
              </div>

              {/* Access Key */}
              <div className="space-y-2 group">
                <label className="text-[9px] text-gray-500 font-black uppercase tracking-[0.15em] ml-1 group-focus-within:text-primary transition-colors">Access Key</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-primary transition-colors" size={15} />
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={credentials.password}
                    onChange={handleChange}
                    className={`w-full pl-11 pr-11 py-3 bg-white/[0.02] border ${error ? 'border-red-500/30' : 'border-white/10'} rounded-xl focus:border-primary/40 focus:bg-white/[0.04] outline-none transition-all text-white text-xs font-semibold placeholder:text-gray-800`}
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-300 transition-colors focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="cursor-pointer w-full h-12 mt-4 bg-primary text-black rounded-xl font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-[0_0_25px_rgba(255,255,255,0.05)] hover:brightness-110 transition-all flex items-center justify-center gap-3 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> AUTHENTICATING
                </>
              ) : (
                <>
                  Authenticate
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          {/* Footer Guard */}
          <div className="mt-12 flex items-center gap-3 justify-center py-3 border-t border-white/5 grayscale opacity-50">
             <ShieldCheck size={14} className="text-primary" />
             <span className="text-[8px] text-white font-bold uppercase tracking-[0.2em]">Secure Session Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginForm;