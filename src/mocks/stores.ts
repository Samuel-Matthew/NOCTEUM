export interface Store {
  id: string;
  city: string;
  country: string;
  address: string;
  hours: string;
  phone: string;
  mapX: number;
  mapY: number;
  image: string;
}

export const stores: Store[] = [
  {
    id: "paris",
    city: "Paris",
    country: "France",
    address: "72 Rue du Faubourg Saint-Honoré, 75008 Paris",
    hours: "Mon–Sat: 10:00–19:00, Sun: 12:00–18:00",
    phone: "+33 1 42 65 00 00",
    mapX: 49,
    mapY: 33,
    image:
      "https://readdy.ai/api/search-image?query=elegant%20luxury%20fragrance%20boutique%20interior%20Paris%20Haussmann%20architecture%20chandelier%20marble%20counters%20soft%20warm%20lighting%20minimal%20shelves%20with%20perfume%20bottles%20high%20end%20retail%20photography&width=600&height=400&seq=20&orientation=landscape",
  },
  {
    id: "new-york",
    city: "New York",
    country: "United States",
    address: "821 Madison Avenue, New York, NY 10065",
    hours: "Mon–Sat: 10:00–20:00, Sun: 11:00–18:00",
    phone: "+1 212 555 0147",
    mapX: 28,
    mapY: 36,
    image:
      "https://readdy.ai/api/search-image?query=modern%20luxury%20fragrance%20store%20interior%20New%20York%20soho%20style%20concrete%20and%20wood%20warm%20ambient%20lighting%20minimal%20product%20displays%20high%20end%20retail%20photography%20cinematic&width=600&height=400&seq=21&orientation=landscape",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    country: "Japan",
    address: "5-2-1 Ginza, Chuo-ku, Tokyo 104-0061",
    hours: "Mon–Sun: 11:00–21:00",
    phone: "+81 3 5555 0198",
    mapX: 82,
    mapY: 38,
    image:
      "https://readdy.ai/api/search-image?query=minimal%20Japanese%20luxury%20fragrance%20boutique%20interior%20Tokyo%20Ginza%20wood%20and%20paper%20screens%20soft%20diffused%20lighting%20zen%20aesthetic%20product%20shelves%20high%20end%20retail%20photography&width=600&height=400&seq=22&orientation=landscape",
  },
  {
    id: "london",
    city: "London",
    country: "United Kingdom",
    address: "27 Old Bond Street, London W1S 4QE",
    hours: "Mon–Sat: 10:00–19:00, Sun: 12:00–17:00",
    phone: "+44 20 7493 0000",
    mapX: 46,
    mapY: 30,
    image:
      "https://readdy.ai/api/search-image?query=classic%20British%20luxury%20fragrance%20boutique%20interior%20London%20Mayfair%20brass%20and%20velvet%20warm%20library%20atmosphere%20product%20displays%20high%20end%20retail%20photography%20elegant%20lighting&width=600&height=400&seq=23&orientation=landscape",
  },
];
