import { useState } from 'react';
import { Heart, MapPin, Star, Clock, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  image: string;
  discount?: string;
}

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  restaurantId: number;
}

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Karachi Biryani House',
    cuisine: 'Pakistani, Biryani',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=300&fit=crop',
    discount: '30% OFF',
  },
  {
    id: 2,
    name: 'Lahore Kebab Corner',
    cuisine: 'Pakistani, Grilled',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 79,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=500&h=300&fit=crop',
    discount: '20% OFF',
  },
  {
    id: 3,
    name: 'Peshawar Chapli Kabab',
    cuisine: 'Pakistani, Street Food',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 59,
    image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=500&h=300&fit=crop',
  },
  {
    id: 4,
    name: 'Islamabad Nihari',
    cuisine: 'Pakistani, Traditional',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 89,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500&h=300&fit=crop',
  },
];

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice with spiced chicken',
    price: 450,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop',
    restaurantId: 1,
  },
  {
    id: 2,
    name: 'Seekh Kebab',
    description: 'Grilled minced meat kebab with spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=300&h=300&fit=crop',
    restaurantId: 2,
  },
  {
    id: 3,
    name: 'Chapli Kabab',
    description: 'Traditional Peshawar style meat patty',
    price: 280,
    image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop',
    restaurantId: 3,
  },
  {
    id: 4,
    name: 'Nihari',
    description: 'Slow-cooked meat curry with naan',
    price: 380,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop',
    restaurantId: 4,
  },
];

export default function Index() {
  const [cartItems, setCartItems] = useState(0);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const addToCart = () => {
    setCartItems(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
                BP
              </div>
              <h1 className="text-2xl font-bold text-foreground">BismillAha Pakwan</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>Karachi, Pakistan</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({cartItems})
              </Button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search restaurants or dishes..."
              className="pl-10 bg-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-secondary border-t border-border p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <MapPin className="w-4 h-4" />
              <span>Karachi, Pakistan</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart ({cartItems})
            </Button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-orange-500 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Delicious Pakistani Food Delivered
          </h2>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            Order from your favorite restaurants and get it delivered hot to your door
          </p>
          <Button
            size="lg"
            className="bg-white text-primary hover:bg-gray-100"
          >
            Order Now
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Featured Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-6">Featured Restaurants</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {restaurants.map(restaurant => (
              <div
                key={restaurant.id}
                className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
              >
                {/* Restaurant Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {restaurant.discount && (
                    <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold">
                      {restaurant.discount}
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(restaurant.id)}
                    className="absolute top-3 left-3 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.includes(restaurant.id)
                          ? 'fill-primary text-primary'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                </div>

                {/* Restaurant Info */}
                <div className="p-4">
                  <h4 className="font-bold text-foreground mb-1">{restaurant.name}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{restaurant.cuisine}</p>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-primary text-primary" />
                      <span className="font-semibold text-foreground">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground">
                    Delivery: Rs. {restaurant.deliveryFee}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Popular Items Section */}
        <section>
          <h3 className="text-2xl font-bold text-foreground mb-6">Popular Dishes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {menuItems.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300"
              >
                {/* Item Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Item Info */}
                <div className="p-4">
                  <h4 className="font-bold text-foreground mb-1">{item.name}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">Rs. {item.price}</span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-orange-600"
                      onClick={addToCart}
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-3">About Us</h5>
              <p className="text-sm opacity-80">
                BismillAha Pakwan brings authentic Pakistani cuisine to your doorstep.
              </p>
            </div>
            <div>
              <h5 className="font-bold mb-3">Quick Links</h5>
              <ul className="text-sm space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Home</a></li>
                <li><a href="#" className="hover:opacity-100">Restaurants</a></li>
                <li><a href="#" className="hover:opacity-100">Orders</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">Support</h5>
              <ul className="text-sm space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Contact Us</a></li>
                <li><a href="#" className="hover:opacity-100">FAQ</a></li>
                <li><a href="#" className="hover:opacity-100">Feedback</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-3">Follow Us</h5>
              <ul className="text-sm space-y-2 opacity-80">
                <li><a href="#" className="hover:opacity-100">Facebook</a></li>
                <li><a href="#" className="hover:opacity-100">Instagram</a></li>
                <li><a href="#" className="hover:opacity-100">Twitter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-20 pt-8 text-center text-sm opacity-80">
            <p>&copy; 2026 BismillAha Pakwan. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
