import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

function cents(n){return (n/100).toFixed(2)}

function RestaurantModal({ open, onClose, restaurant, onAdd }){
  const [menu, setMenu] = useState([])
  useEffect(() => {
    const fetchMenu = async () => {
      if(!restaurant) return
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/restaurants/${restaurant.id}/menu`)
      const data = await res.json()
      setMenu(data)
    }
    if(open) fetchMenu()
  }, [open, restaurant])

  if(!open || !restaurant) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full md:w-[720px] max-h-[90vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-slate-900 border border-white/10">
        <div className="p-6 sticky top-0 bg-slate-900/80 backdrop-blur flex items-center justify-between border-b border-white/10">
          <div>
            <h3 className="text-white text-xl font-semibold">{restaurant.name}</h3>
            <p className="text-slate-400 text-sm">{restaurant.cuisine} • ETA {restaurant.eta_minutes} min</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-6 grid sm:grid-cols-2 gap-4">
          {menu.map(dish => (
            <div key={dish.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <img src={dish.image_url} alt={dish.name} className="h-36 w-full object-cover" />
              <div className="p-4">
                <h4 className="text-white font-semibold">{dish.name}</h4>
                <p className="text-slate-400 text-sm line-clamp-2">{dish.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-white font-semibold">${cents(dish.price_cents)}</div>
                  <button onClick={() => onAdd?.(restaurant, dish)} className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RestaurantModal
