import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

const restaurantData: Record<string, any> = {
  '1': {
    id: 1,
    name: 'Karachi Biryani House',
    cuisine: 'Pakistani, Biryani',
    rating: 4.8,
    deliveryTime: '25-35 min',
    deliveryFee: 99,
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&h=400&fit=crop',
    address: 'Gulshan-e-Iqbal, Karachi',
    phone: '+92 300 1234567',
    items: [
      { id: 101, name: 'Chicken Biryani', description: 'Fragrant basmati rice with spiced chicken', price: 450, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop', category: 'Biryani' },
      { id: 102, name: 'Beef Biryani', description: 'Tender beef with aromatic spices', price: 520, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop', category: 'Biryani' },
      { id: 103, name: 'Prawn Biryani', description: 'Fresh prawns with basmati rice', price: 580, image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop', category: 'Biryani' },
      { id: 104, name: 'Raita', description: 'Yogurt with cucumber and spices', price: 80, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Sides' },
      { id: 105, name: 'Naan', description: 'Traditional tandoori bread', price: 60, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Bread' },
    ]
  },
  '2': {
    id: 2,
    name: 'Lahore Kebab Corner',
    cuisine: 'Pakistani, Grilled',
    rating: 4.7,
    deliveryTime: '20-30 min',
    deliveryFee: 79,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=1200&h=400&fit=crop',
    address: 'Defence, Lahore',
    phone: '+92 300 9876543',
    items: [
      { id: 201, name: 'Seekh Kebab', description: 'Grilled minced meat kebab', price: 320, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=300&h=300&fit=crop', category: 'Kebab' },
      { id: 202, name: 'Shami Kebab', description: 'Fried meat patty with lentils', price: 280, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=300&h=300&fit=crop', category: 'Kebab' },
      { id: 203, name: 'Tandoori Chicken', description: 'Marinated and grilled chicken', price: 380, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ae1?w=300&h=300&fit=crop', category: 'Grilled' },
      { id: 204, name: 'Lassi', description: 'Traditional yogurt drink', price: 100, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Drinks' },
    ]
  },
  '3': {
    id: 3,
    name: 'Peshawar Chapli Kabab',
    cuisine: 'Pakistani, Street Food',
    rating: 4.6,
    deliveryTime: '15-25 min',
    deliveryFee: 59,
    image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=1200&h=400&fit=crop',
    address: 'Saddar, Peshawar',
    phone: '+92 300 5555555',
    items: [
      { id: 301, name: 'Chapli Kabab', description: 'Traditional Peshawar style meat patty', price: 280, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Kabab' },
      { id: 302, name: 'Chapli Kabab Combo', description: 'Two kababs with naan and chutney', price: 450, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Combo' },
      { id: 303, name: 'Aloo Ke Parathe', description: 'Potato filled flatbread', price: 150, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Bread' },
    ]
  },
  '4': {
    id: 4,
    name: 'Islamabad Nihari',
    cuisine: 'Pakistani, Traditional',
    rating: 4.9,
    deliveryTime: '30-40 min',
    deliveryFee: 89,
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=1200&h=400&fit=crop',
    address: 'F-7, Islamabad',
    phone: '+92 300 7777777',
    items: [
      { id: 401, name: 'Beef Nihari', description: 'Slow-cooked meat curry with naan', price: 380, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop', category: 'Curry' },
      { id: 402, name: 'Chicken Nihari', description: 'Tender chicken in aromatic gravy', price: 340, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop', category: 'Curry' },
      { id: 403, name: 'Nihari with Rice', description: 'Served with fragrant basmati rice', price: 420, image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=300&h=300&fit=crop', category: 'Curry' },
      { id: 404, name: 'Green Chutney', description: 'Fresh mint and cilantro chutney', price: 40, image: 'https://images.unsplash.com/photo-1585238341710-4b4e6b2b8b3e?w=300&h=300&fit=crop', category: 'Condiments' },
    ]
  }
};

export default function Restaurant() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const restaurant = restaurantData[id || '1'];
  if (!restaurant) return <div>Restaurant not found</div>;

  const categories = [...new Set(restaurant.items.map((item: MenuItem) => item.category))];
  const activeCategory = selectedCategory || categories[0];
  const filteredItems = restaurant.items.filter((item: MenuItem) => item.category === activeCategory);

  const handleAddItem = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      restaurantId: restaurant.id,
      image: item.image,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 text-foreground hover:text-primary">
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-xl font-bold text-foreground">Menu</h1>
          <Button size="sm" onClick={() => navigate('/cart')}>
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart
          </Button>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-64 bg-gray-200">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
      </div>

      {/* Restaurant Info */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h2 className="text-3xl font-bold text-foreground mb-2">{restaurant.name}</h2>
          <p className="text-muted-foreground mb-4">{restaurant.cuisine}</p>

          <div className="flex flex-wrap gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-primary text-primary" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              <span>{restaurant.address}</span>
            </div>
            <div>Delivery: Rs. {restaurant.deliveryFee}</div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap font-medium transition-colors ${
                activeCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-secondary text-foreground hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item: MenuItem) => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground mb-1">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">Rs. {item.price}</span>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-orange-600"
                    onClick={() => handleAddItem(item)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
