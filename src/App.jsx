import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import RestaurantCard from './components/RestaurantCard'
import RestaurantModal from './components/RestaurantModal'
import CartDrawer from './components/CartDrawer'

function App(){
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [restaurants, setRestaurants] = useState([])
  const [filtered, setFiltered] = useState([])
  const [selected, setSelected] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${baseUrl}/restaurants`)
        const data = await res.json()
        setRestaurants(data)
        setFiltered(data)
      } catch (e) {
        console.error(e)
      }
    }
    load()
  }, [])

  const onSearch = (q) => {
    const t = (q||'').toLowerCase()
    setFiltered(restaurants.filter(r => r.name.toLowerCase().includes(t) || (r.cuisine||'').toLowerCase().includes(t)))
  }

  const addToCart = async (restaurant, dish) => {
    try {
      const res = await fetch(`${baseUrl}/carts/items`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-User-Id': 'demo-user' }, body: JSON.stringify({ restaurant_id: restaurant.id, dish_id: dish.id, quantity: 1 }) })
      const data = await res.json()
      setCartOpen(true)
    } catch (e) {
      alert('Failed to add to cart')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)] pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <Hero onSearch={onSearch} />

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(item => (
            <RestaurantCard key={item.id} item={item} onOpen={setSelected} />
          ))}
        </div>
      </div>

      <RestaurantModal open={!!selected} onClose={() => setSelected(null)} restaurant={selected} onAdd={addToCart} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  )
}

export default App
