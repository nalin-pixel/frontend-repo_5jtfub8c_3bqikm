import { useEffect, useMemo, useState } from 'react'
import { X, Loader2 } from 'lucide-react'

function cents(n){return (n/100).toFixed(2)}

function CartDrawer({ open, onClose }){
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(false)
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const ensureCart = async () => {
    setLoading(true)
    const res = await fetch(`${baseUrl}/carts`, { method: 'POST', headers: { 'X-User-Id': 'demo-user' } })
    const data = await res.json()
    setCart(data)
    setLoading(false)
  }

  useEffect(() => {
    if(open) ensureCart()
  }, [open])

  const updateQty = async (itemId, qty) => {
    setLoading(true)
    const res = await fetch(`${baseUrl}/carts/items/${itemId}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', 'X-User-Id': 'demo-user' }, body: JSON.stringify({ quantity: qty }) })
    const data = await res.json()
    setCart(data)
    setLoading(false)
  }

  const checkout = async () => {
    setLoading(true)
    const res = await fetch(`${baseUrl}/checkout`, { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-User-Id': 'demo-user' }, body: JSON.stringify({ address: '123 Demo Street', payment_method: 'cod', tip_cents: 0 }) })
    const data = await res.json()
    if(data?.id){
      alert('Order placed! Order ID: ' + data.id)
      onClose?.()
    } else {
      alert('Checkout failed')
    }
    setLoading(false)
  }

  if(!open) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 shadow-2xl">
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <h3 className="text-white font-semibold">Your Cart</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-white/5"><X className="h-5 w-5" /></button>
        </div>
        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-160px)]">
          {loading && (
            <div className="flex items-center gap-2 text-slate-300"><Loader2 className="h-4 w-4 animate-spin" /> Updating...</div>
          )}
          {!cart?.items?.length && (
            <div className="text-slate-400">Your cart is empty.</div>
          )}
          {cart?.items?.map((it) => (
            <div key={it.item_id} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-3">
              {it.image_url && <img src={it.image_url} alt={it.name} className="h-14 w-14 object-cover rounded-lg" />}
              <div className="flex-1">
                <div className="text-white font-medium">{it.name}</div>
                <div className="text-slate-400 text-sm">${cents(it.price_cents)}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => updateQty(it.item_id, Math.max(0, (it.quantity||1)-1))} className="px-2 py-1 bg-white/10 text-white rounded">-</button>
                <div className="text-white w-6 text-center">{it.quantity}</div>
                <button onClick={() => updateQty(it.item_id, (it.quantity||1)+1)} className="px-2 py-1 bg-white/10 text-white rounded">+</button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-slate-300"><span>Subtotal</span><span>${cents(cart?.subtotal_cents||0)}</span></div>
          <div className="flex items-center justify-between text-slate-300"><span>Delivery</span><span>${cents(cart?.delivery_fee_cents||0)}</span></div>
          <div className="flex items-center justify-between text-white font-semibold text-lg"><span>Total</span><span>${cents(cart?.total_cents||0)}</span></div>
          <button disabled={!cart?.items?.length || loading} onClick={checkout} className="w-full mt-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white py-2 rounded-xl">Place Order</button>
        </div>
      </div>
    </div>
  )
}

export default CartDrawer
