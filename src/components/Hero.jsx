import { MapPin, Search, ShoppingCart } from 'lucide-react'

function Hero({ onSearch }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 via-rose-500 to-fuchsia-600 p-1 shadow-2xl">
      <div className="rounded-3xl bg-slate-900/80 backdrop-blur-sm p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
              Cravings, Delivered Fast
            </h1>
            <p className="mt-3 text-slate-200/90">
              Discover the best restaurants near you. Track in real-time. Earn rewards every order.
            </p>

            <div className="mt-6 flex items-stretch gap-3">
              <div className="flex items-center gap-2 bg-white/95 rounded-xl px-3 py-2 w-full shadow">
                <MapPin className="h-5 w-5 text-rose-500" />
                <input
                  placeholder="Enter your address"
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/95 rounded-xl px-3 py-2 w-full shadow">
                <Search className="h-5 w-5 text-fuchsia-500" />
                <input
                  placeholder="Search for cuisines, dishes, restaurants"
                  onKeyDown={(e) => e.key === 'Enter' && onSearch?.(e.target.value)}
                  className="w-full bg-transparent outline-none text-slate-700 placeholder-slate-400"
                />
              </div>
              <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl shadow">
                <ShoppingCart className="h-5 w-5" /> View Cart
              </button>
            </div>
          </div>

          <div className="relative md:w-80 lg:w-96">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-inner" />
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
