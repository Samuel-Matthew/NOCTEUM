export interface Product {
  id: string;
  name: string;
  category: "perfume" | "cologne" | "deodorant";
  scentFamily: string;
  price30ml: number;
  price50ml: number;
  price100ml: number;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  image: string;
  relatedIds: string[];
}

export const products: Product[] = [
  {
    id: "velvet-ember",
    name: "Velvet Ember",
    category: "perfume",
    scentFamily: "Amber",
    price30ml: 145,
    price50ml: 210,
    price100ml: 340,
    description:
      "A smoldering embrace of spiced amber and vanilla orchid, wrapped in burning oud and golden resins.",
    notes: {
      top: ["Saffron", "Cardamom", "Bergamot"],
      heart: ["Vanilla Orchid", "Amber Resin", "Cinnamon Bark"],
      base: ["Burning Oud", "Sandalwood", "Tonka Bean"],
    },
    image:
      "https://readdy.ai/api/search-image?query=elegant%20luxury%20perfume%20bottle%20with%20amber%20golden%20liquid%20on%20dark%20obsidian%20background%20minimal%20studio%20lighting%20warm%20tones%20high%20end%20fragrance%20product%20photography&width=600&height=750&seq=1&orientation=portrait",
    relatedIds: ["noir-vetiver", "obsidian-rose"],
  },
  {
    id: "noir-vetiver",
    name: "Noir Vetiver",
    category: "perfume",
    scentFamily: "Woody",
    price30ml: 135,
    price50ml: 195,
    price100ml: 315,
    description:
      "Deep Haitian vetiver rooted in earthy patchouli and black pepper, finishing with smoked cedar.",
    notes: {
      top: ["Black Pepper", "Grapefruit", "Mint Leaf"],
      heart: ["Haitian Vetiver", "Patchouli", "Clove"],
      base: ["Smoked Cedar", "Leather", "Oakmoss"],
    },
    image:
      "https://readdy.ai/api/search-image?query=minimal%20luxury%20perfume%20bottle%20dark%20green%20liquid%20against%20black%20background%20studio%20lighting%20refined%20elegant%20fragrance%20product%20shot%20high%20end&width=600&height=750&seq=2&orientation=portrait",
    relatedIds: ["velvet-ember", "santal-creme"],
  },
  {
    id: "obsidian-rose",
    name: "Obsidian Rose",
    category: "perfume",
    scentFamily: "Floral",
    price30ml: 155,
    price50ml: 225,
    price100ml: 365,
    description:
      "Turkish rose petals distilled into darkness, layered with incense and dark chocolate accords.",
    notes: {
      top: ["Turkish Rose", "Pink Pepper", "Lychee"],
      heart: ["Incense", "Peony", "Dark Chocolate"],
      base: ["Labdanum", "Musk", "Agarwood"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["velvet-ember", "fleur-nocturne"],
  },
  {
    id: "citrus-ducale",
    name: "Citrus Ducale",
    category: "cologne",
    scentFamily: "Citrus",
    price30ml: 95,
    price50ml: 145,
    price100ml: 240,
    description:
      "Sicilian bergamot and Calabrian lemon crowned with neroli and white musk. A sunlit morning in liquid form.",
    notes: {
      top: ["Sicilian Bergamot", "Calabrian Lemon", "Mandarin"],
      heart: ["Neroli", "Orange Blossom", "Jasmine"],
      base: ["White Musk", "Vetiver", "Amber"],
    },
    image:
      "https://readdy.ai/api/search-image?query=elegant%20cologne%20bottle%20with%20bright%20citrus%20golden%20liquid%20on%20warm%20neutral%20background%20studio%20lighting%20luxury%20fragrance%20product%20photography%20refined%20minimal&width=600&height=750&seq=4&orientation=portrait",
    relatedIds: ["aqua-profonda", "santal-creme"],
  },
  {
    id: "aqua-profonda",
    name: "Aqua Profonda",
    category: "cologne",
    scentFamily: "Aquatic",
    price30ml: 105,
    price50ml: 160,
    price100ml: 265,
    description:
      "Mediterranean sea salt meets driftwood and seaweed extract, cooled by mint and cucumber.",
    notes: {
      top: ["Sea Salt", "Mint", "Cucumber"],
      heart: ["Driftwood", "Seaweed Extract", "Lavender"],
      base: ["Ambergris", "Cedar", "Musk"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["citrus-ducale", "noir-vetiver"],
  },
  {
    id: "santal-creme",
    name: "Santal Crème",
    category: "cologne",
    scentFamily: "Woody",
    price30ml: 125,
    price50ml: 185,
    price100ml: 295,
    description:
      "Creamy Australian sandalwood blended with fig milk and milky accord, grounded in cashmere wood.",
    notes: {
      top: ["Fig Milk", "Bergamot", "Green Accord"],
      heart: ["Australian Sandalwood", "Iris", "Cashmere Wood"],
      base: ["Musk", "Vanilla", "Amber"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["noir-vetiver", "citrus-ducale"],
  },
  {
    id: "fleur-nocturne",
    name: "Fleur Nocturne",
    category: "deodorant",
    scentFamily: "Floral",
    price30ml: 65,
    price50ml: 95,
    price100ml: 155,
    description:
      "Evening jasmine and tuberose transformed into a skin-loving deodorant with aloe and vitamin E.",
    notes: {
      top: ["Jasmine", "Tuberose", "Ylang-Ylang"],
      heart: ["Aloe Vera", "Vitamin E", "Green Tea"],
      base: ["White Musk", "Sandalwood", "Amber"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["obsidian-rose", "bois-sauvage"],
  },
  {
    id: "bois-sauvage",
    name: "Bois Sauvage",
    category: "deodorant",
    scentFamily: "Woody",
    price30ml: 65,
    price50ml: 95,
    price100ml: 155,
    description:
      "Wild cedar and pine needle freshness in an aluminum-free formula with witch hazel and tea tree.",
    notes: {
      top: ["Pine Needle", "Eucalyptus", "Lemon"],
      heart: ["Wild Cedar", "Witch Hazel", "Tea Tree"],
      base: ["Oakmoss", "Vetiver", "Musk"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["fleur-nocturne", "noir-vetiver"],
  },
  {
    id: "vanille-absolue",
    name: "Vanille Absolue",
    category: "deodorant",
    scentFamily: "Gourmand",
    price30ml: 70,
    price50ml: 105,
    price100ml: 170,
    description:
      "Madagascar vanilla and caramel in a gentle, long-lasting deodorant formula. Comfort in every swipe.",
    notes: {
      top: ["Madagascar Vanilla", "Caramel", "Tonka"],
      heart: ["Shea Butter", "Coconut Oil", "Aloe"],
      base: ["Sandalwood", "Amber", "Musk"],
    },
    image:
      "https://readdy.ai/api/search-image?query=luxury%20perfume%20bottle%20with%20deep%20red%20liquid%20on%20dark%20background%20elegant%20glass%20design%20studio%20lighting%20high%20end%20fragrance%20product%20photography%20warm%20amber%20highlights&width=600&height=750&seq=3&orientation=portrait",
    relatedIds: ["velvet-ember", "fleur-nocturne"],
  },
];

export const scentFamilies = [
  "All",
  "Woody",
  "Amber",
  "Floral",
  "Citrus",
  "Aquatic",
  "Gourmand",
];

export const categories = ["All", "Perfume", "Cologne", "Deodorant"];
