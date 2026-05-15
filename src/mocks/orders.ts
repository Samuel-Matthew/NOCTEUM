export interface OrderItem {
  productId: string;
  name: string;
  size: "30ml" | "50ml" | "100ml";
  price: number;
  quantity: number;
  image: string;
  scentFamily: string;
}

export interface TrackingEvent {
  status: string;
  location: string;
  timestamp: string;
  completed: boolean;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  street: string;
  apartment?: string;
  city: string;
  country: string;
  postalCode: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status:
    | "delivered"
    | "shipped"
    | "out_for_delivery"
    | "processing"
    | "cancelled";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  trackingNumber: string;
  carrier: string;
  trackingEvents: TrackingEvent[];
}

export const mockOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "NC-A7F3B21D",
    date: "2026-05-10T14:32:00Z",
    status: "delivered",
    items: [
      {
        productId: "velvet-ember",
        name: "Velvet Ember",
        size: "50ml",
        price: 210,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=elegant%20luxury%20perfume%20bottle%20with%20amber%20golden%20liquid%20on%20dark%20obsidian%20background%20minimal%20studio%20lighting%20warm%20tones%20high%20end%20fragrance%20product%20photography&width=120&height=150&seq=1&orientation=portrait",
        scentFamily: "Amber",
      },
      {
        productId: "obsidian-rose",
        name: "Obsidian Rose",
        size: "30ml",
        price: 155,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=120&height=150&seq=3&orientation=portrait",
        scentFamily: "Floral",
      },
    ],
    subtotal: 365,
    shipping: 0,
    total: 365,
    shippingAddress: {
      firstName: "Elena",
      lastName: "Voss",
      street: "14 Rue de la Paix",
      city: "Paris",
      country: "France",
      postalCode: "75002",
    },
    trackingNumber: "DHL-7846291034-FR",
    carrier: "DHL Express",
    trackingEvents: [
      {
        status: "Order Placed",
        location: "Paris, France",
        timestamp: "2026-05-10T14:32:00Z",
        completed: true,
      },
      {
        status: "Processing",
        location: "Noctēum Atelier",
        timestamp: "2026-05-10T16:45:00Z",
        completed: true,
      },
      {
        status: "Shipped",
        location: "Paris Distribution Center",
        timestamp: "2026-05-11T09:12:00Z",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Lyon Hub, France",
        timestamp: "2026-05-12T03:28:00Z",
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Paris, France",
        timestamp: "2026-05-13T08:15:00Z",
        completed: true,
      },
      {
        status: "Delivered",
        location: "14 Rue de la Paix, Paris",
        timestamp: "2026-05-13T14:42:00Z",
        completed: true,
      },
    ],
  },
  {
    id: "ord-002",
    orderNumber: "NC-9E2C45A1",
    date: "2026-04-22T09:15:00Z",
    status: "delivered",
    items: [
      {
        productId: "noir-vetiver",
        name: "Noir Vetiver",
        size: "100ml",
        price: 315,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=minimal%20luxury%20perfume%20bottle%20dark%20green%20liquid%20against%20black%20background%20studio%20lighting%20refined%20elegant%20fragrance%20product%20shot%20high%20end&width=120&height=150&seq=2&orientation=portrait",
        scentFamily: "Woody",
      },
      {
        productId: "bois-sauvage",
        name: "Bois Sauvage",
        size: "50ml",
        price: 95,
        quantity: 2,
        image:
          "https://readdy.ai/api/search-image?query=luxury+deodorant+packaging+dark+green+and+black+minimal+design+studio+lighting+elegant+product+photography+high+end+men+grooming&ref=&width=120&height=150&seq=8&orientation=portrait",
        scentFamily: "Woody",
      },
    ],
    subtotal: 505,
    shipping: 0,
    total: 505,
    shippingAddress: {
      firstName: "Elena",
      lastName: "Voss",
      street: "14 Rue de la Paix",
      city: "Paris",
      country: "France",
      postalCode: "75002",
    },
    trackingNumber: "UPS-9928475610-FR",
    carrier: "UPS Standard",
    trackingEvents: [
      {
        status: "Order Placed",
        location: "Paris, France",
        timestamp: "2026-04-22T09:15:00Z",
        completed: true,
      },
      {
        status: "Processing",
        location: "Noctēum Atelier",
        timestamp: "2026-04-22T11:30:00Z",
        completed: true,
      },
      {
        status: "Shipped",
        location: "Paris Distribution Center",
        timestamp: "2026-04-23T07:45:00Z",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Charles de Gaulle Hub",
        timestamp: "2026-04-24T02:18:00Z",
        completed: true,
      },
      {
        status: "Delivered",
        location: "14 Rue de la Paix, Paris",
        timestamp: "2026-04-25T11:20:00Z",
        completed: true,
      },
    ],
  },
  {
    id: "ord-003",
    orderNumber: "NC-B1D8E47F",
    date: "2026-05-12T18:45:00Z",
    status: "shipped",
    items: [
      {
        productId: "santal-creme",
        name: "Santal Crème",
        size: "50ml",
        price: 185,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=artisan+luxury+fragrance+bottle+warm+cream+colored+liquid+elegant+glass+design+dark+background+studio+lighting+high+end+product+photography&ref=&width=120&height=150&seq=6&orientation=portrait",
        scentFamily: "Woody",
      },
    ],
    subtotal: 185,
    shipping: 15,
    total: 200,
    shippingAddress: {
      firstName: "Elena",
      lastName: "Voss",
      street: "14 Rue de la Paix",
      city: "Paris",
      country: "France",
      postalCode: "75002",
    },
    trackingNumber: "DHL-9023847561-FR",
    carrier: "DHL Express",
    trackingEvents: [
      {
        status: "Order Placed",
        location: "Paris, France",
        timestamp: "2026-05-12T18:45:00Z",
        completed: true,
      },
      {
        status: "Processing",
        location: "Noctēum Atelier",
        timestamp: "2026-05-12T20:10:00Z",
        completed: true,
      },
      {
        status: "Shipped",
        location: "Paris Distribution Center",
        timestamp: "2026-05-13T08:30:00Z",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Lyon Hub, France",
        timestamp: "2026-05-13T22:15:00Z",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Marseille Sort Facility",
        timestamp: "2026-05-14T05:40:00Z",
        completed: false,
      },
      {
        status: "Out for Delivery",
        location: "Paris, France",
        timestamp: "2026-05-14T08:00:00Z",
        completed: false,
      },
      {
        status: "Delivered",
        location: "14 Rue de la Paix, Paris",
        timestamp: "2026-05-14T14:00:00Z",
        completed: false,
      },
    ],
  },
  {
    id: "ord-004",
    orderNumber: "NC-F5A2019C",
    date: "2026-03-15T11:20:00Z",
    status: "delivered",
    items: [
      {
        productId: "citrus-ducale",
        name: "Citrus Ducale",
        size: "100ml",
        price: 240,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=elegant%20cologne%20bottle%20with%20bright%20citrus%20golden%20liquid%20on%20warm%20neutral%20background%20studio%20lighting%20luxury%20fragrance%20product%20photography%20refined%20minimal&width=120&height=150&seq=4&orientation=portrait",
        scentFamily: "Citrus",
      },
      {
        productId: "aqua-profonda",
        name: "Aqua Profonda",
        size: "50ml",
        price: 160,
        quantity: 1,
        image:
          "https://readdy.ai/api/search-image?query=minimal+luxury+cologne+bottle+blue+liquid+clear+glass+against+soft+gray+background+studio+lighting+elegant+fragrance+product+photography+high+end&ref=&width=120&height=150&seq=5&orientation=portrait",
        scentFamily: "Aquatic",
      },
    ],
    subtotal: 400,
    shipping: 0,
    total: 400,
    shippingAddress: {
      firstName: "Elena",
      lastName: "Voss",
      street: "14 Rue de la Paix",
      city: "Paris",
      country: "France",
      postalCode: "75002",
    },
    trackingNumber: "DHL-6638291047-FR",
    carrier: "DHL Express",
    trackingEvents: [
      {
        status: "Order Placed",
        location: "Paris, France",
        timestamp: "2026-03-15T11:20:00Z",
        completed: true,
      },
      {
        status: "Processing",
        location: "Noctēum Atelier",
        timestamp: "2026-03-15T13:50:00Z",
        completed: true,
      },
      {
        status: "Shipped",
        location: "Paris Distribution Center",
        timestamp: "2026-03-16T08:00:00Z",
        completed: true,
      },
      {
        status: "In Transit",
        location: "Lyon Hub, France",
        timestamp: "2026-03-17T04:30:00Z",
        completed: true,
      },
      {
        status: "Out for Delivery",
        location: "Paris, France",
        timestamp: "2026-03-18T09:10:00Z",
        completed: true,
      },
      {
        status: "Delivered",
        location: "14 Rue de la Paix, Paris",
        timestamp: "2026-03-18T16:25:00Z",
        completed: true,
      },
    ],
  },
];

const ORDERS_STORAGE_KEY = "nocteum-orders";

export function loadOrders(): Order[] {
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Order[];
      return [
        ...mockOrders,
        ...saved.filter((o) => !mockOrders.find((m) => m.id === o.id)),
      ];
    }
  } catch {
    // ignore
  }
  return [...mockOrders];
}

export function saveOrder(order: Order) {
  try {
    const existing = loadOrders();
    const updated = [order, ...existing];
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function getStatusLabel(status: Order["status"]): string {
  const labels: Record<string, string> = {
    delivered: "Delivered",
    shipped: "In Transit",
    out_for_delivery: "Out for Delivery",
    processing: "Processing",
    cancelled: "Cancelled",
  };
  return labels[status] || status;
}

export function getStatusColor(status: Order["status"]): string {
  const colors: Record<string, string> = {
    delivered: "#10B981",
    shipped: "#D4A853",
    out_for_delivery: "#F59E0B",
    processing: "#6B7280",
    cancelled: "#EF4444",
  };
  return colors[status] || "#6B7280";
}
