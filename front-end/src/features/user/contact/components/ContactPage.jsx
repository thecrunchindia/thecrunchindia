import { useContact } from '../hooks/useContact';
import { Loader2, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';
import pizzaImg from '../../../../assets/pizza.png';

function ContactPage() {
  const { formData, loading, error, handleChange, handleSubmit } = useContact();

  return (
    <div className="min-h-screen bg-white flex font-sans">
      
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-24 bg-white relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-bold uppercase tracking-wider mb-4 text-gray-600">
               <Sparkles size={14} className="text-[var(--color-primary)]" /> Contact Us
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Let's <span className="text-[var(--color-primary)]">Talk.</span>
            </h1>
          </div>

          {/* Show Error at the top of the form */}
          {error && (
            <div className="bg-red-50 border-2 border-red-100 p-4 rounded-xl flex items-center gap-3 text-red-600">
              <AlertCircle size={20} />
              <p className="text-xs sm:text-sm font-bold">{error}</p>
            </div>
          )}  

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
               <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-primary/20 rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
              />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
               <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-3.5  bg-gray-50 border-2 border-primary/20 rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
              />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
               <input
                type="text"
                name="subject"
                required
                value={formData.subject}
                onChange={handleChange}
                placeholder="Enter a subject"
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-primary/20 rounded-xl focus:bg-white focus:border-primary transition-all outline-none"
              />
            </div>

            <div>
               <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
               <textarea
                name="message"
                required
                rows="4"
                value={formData.message}
                onChange={handleChange}
                placeholder="Type your message here..."
                className="w-full px-4 py-3.5 bg-gray-50 border-2 border-primary/20 rounded-xl focus:bg-white focus:border-primary transition-all outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}

              className="cursor-pointer w-full  py-3 sm:py-4  rounded-xl font-black text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg bg-black text-white hover:bg-gray-900 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5 cursor-disabled" /> Sending...
                </>
              ) : (
                <>
                  Send Message <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right Side Image (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-white flex-col items-center justify-center p-12">
        <img src={pizzaImg} alt="Pizza" className="w-full max-w-lg drop-shadow-2xl" />
      </div>
    </div>
  );
}

export default ContactPage;