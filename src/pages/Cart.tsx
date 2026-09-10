import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  const deliveryFee = 99;
  const tax = Math.round(total * 0.15);
  const grandTotal = total + deliveryFee + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
            <button onClick={() => navigate('/')} className="flex items-center gap-2 text-foreground hover:text-primary">
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
          </div>
        </header>

        {/* Empty State */}
        <main className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="mb-6">
            <div className="w-24 h-24 bg-secondary rounded-full mx-auto flex items-center justify-center mb-4">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">Add some delicious food to get started!</p>
            <Button onClick={() => navigate('/')} className="bg-primary hover:bg-orange-600">
              Continue Shopping
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold text-foreground">Shopping Cart</h1>
          <div className="w-10"></div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-border overflow-hidden">
              {items.map((item, index) => (
                <div key={item.id} className={`p-4 flex gap-4 ${index > 0 ? 'border-t border-border' : ''}`}>
                  <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-3">Rs. {item.price}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-secondary rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <span className="ml-auto font-bold text-primary">Rs. {item.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1 hover:bg-destructive hover:text-white rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-border p-6 sticky top-24">
              <h2 className="text-lg font-bold text-foreground mb-4">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">Rs. {total}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax (15%)</span>
                  <span className="font-semibold">Rs. {tax}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-semibold">Rs. {deliveryFee}</span>
                </div>
              </div>

              <div className="flex justify-between mb-6">
                <span className="font-bold text-foreground">Total</span>
                <span className="text-2xl font-bold text-primary">Rs. {grandTotal}</span>
              </div>

              <Button className="w-full bg-primary hover:bg-orange-600 mb-3">
                Proceed to Checkout
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/')}
              >
                Continue Shopping
              </Button>

              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-destructive hover:text-destructive/80 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
