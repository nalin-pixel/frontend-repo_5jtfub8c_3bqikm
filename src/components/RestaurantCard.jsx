import { Star, Clock, Bike } from 'lucide-react'

function cents(n){return (n/100).toFixed(2)}

function RestaurantCard({ item, onOpen }){
  return (
    <button onClick={() => onOpen?.(item)} className="text-left group w-full">
      <div className="overflow-hidden rounded-2xl bg-white/5 border border-white/10">
        <div className="relative">
          <img src={item.cover_url} alt={item.name} className="h-44 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
          <div className="absolute top-3 left-3 inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            <Star className="h-3 w-3 text-amber-300" /> {item.rating_avg?.toFixed(1)} ({item.rating_count})
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold text-lg">{item.name}</h3>
            <div className="text-slate-300 text-sm inline-flex items-center gap-1"><Clock className="h-4 w-4" /> {item.eta_minutes} min</div>
          </div>
          <div className="text-slate-400 text-sm mt-1">{item.cuisine}</div>
          <div className="text-slate-300 text-sm mt-2 inline-flex items-center gap-1"><Bike className="h-4 w-4" /> Delivery ${cents(item.delivery_fee_cents)}</div>
        </div>
      </div>
    </button>
  )
}

export default RestaurantCard
