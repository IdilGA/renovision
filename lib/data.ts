export type Style = "Japandi" | "Scandinavian" | "Modern" | "Industrial" | "Hotel Chic";
export type Category = "Sofas" | "Tables" | "Chairs" | "Lighting" | "Decoration" | "Plants";
export type Store = "IKEA" | "JYSK" | "Leen Bakker" | "Kwantum" | "H&M Home";

export interface FurnitureItem {
  id: string;
  name: string;
  store: Store;
  price: number;
  style: Style;
  category: Category;
  description: string;
  color: string; // emoji or placeholder color for visual
  emoji: string;
}

export interface RoomDesign {
  id: string;
  name: string;
  style: Style;
  wallColor: string;
  floorColor: string;
  furniture: string[]; // furniture IDs
  createdAt: string;
  thumbnail?: string;
}

export const STYLES: { id: Style; description: string; emoji: string; colors: string[] }[] = [
  {
    id: "Japandi",
    description: "Minimalist Japanese-Scandinavian fusion with natural materials",
    emoji: "🌿",
    colors: ["#e8e0d4", "#c4b9a8", "#8b7355", "#4a4236"],
  },
  {
    id: "Scandinavian",
    description: "Clean lines, light woods, and functional beauty",
    emoji: "🪵",
    colors: ["#f0ebe3", "#d4c5b0", "#a89880", "#6b5d4e"],
  },
  {
    id: "Modern",
    description: "Bold contrasts, sleek surfaces, contemporary forms",
    emoji: "◼",
    colors: ["#e5e5e5", "#b0b0b0", "#404040", "#1a1a1a"],
  },
  {
    id: "Industrial",
    description: "Raw textures, metal accents, urban warehouse aesthetic",
    emoji: "⚙️",
    colors: ["#d4cfc9", "#a09890", "#6b6560", "#3d3935"],
  },
  {
    id: "Hotel Chic",
    description: "Luxurious, curated, boutique hotel elegance",
    emoji: "✨",
    colors: ["#f5f0e8", "#d4c5a0", "#8b7355", "#2d2520"],
  },
];

export const FURNITURE: FurnitureItem[] = [
  // Sofas
  { id: "s1", name: "KIVIK Sofa", store: "IKEA", price: 699, style: "Scandinavian", category: "Sofas", description: "3-seat sofa with deep seats and low back", color: "#c4b9a8", emoji: "🛋️" },
  { id: "s2", name: "Osaka Sofa", store: "Leen Bakker", price: 1299, style: "Japandi", category: "Sofas", description: "Low profile sofa in natural linen", color: "#d4c5b0", emoji: "🛋️" },
  { id: "s3", name: "Denver Corner", store: "JYSK", price: 849, style: "Industrial", category: "Sofas", description: "L-shaped corner sofa in dark velvet", color: "#4a4236", emoji: "🛋️" },
  { id: "s4", name: "Marble Sofa", store: "H&M Home", price: 1599, style: "Hotel Chic", category: "Sofas", description: "Curved bouclé sofa in off-white", color: "#f0ebe3", emoji: "🛋️" },
  { id: "s5", name: "Grid Sofa", store: "Kwantum", price: 549, style: "Modern", category: "Sofas", description: "Modular two-seat in graphite gray", color: "#606060", emoji: "🛋️" },

  // Tables
  { id: "t1", name: "LACK Coffee Table", store: "IKEA", price: 29, style: "Modern", category: "Tables", description: "Minimalist square table in black", color: "#1a1a1a", emoji: "🪑" },
  { id: "t2", name: "Bamboo Side Table", store: "H&M Home", price: 149, style: "Japandi", category: "Tables", description: "Handcrafted bamboo with round top", color: "#c4a882", emoji: "🪑" },
  { id: "t3", name: "Oslo Dining Table", store: "Leen Bakker", price: 599, style: "Scandinavian", category: "Tables", description: "Solid oak 6-person dining table", color: "#a0784f", emoji: "🪑" },
  { id: "t4", name: "Steel Pipe Table", store: "JYSK", price: 349, style: "Industrial", category: "Tables", description: "Reclaimed wood and black metal frame", color: "#5a4a3a", emoji: "🪑" },
  { id: "t5", name: "Travertine Table", store: "Kwantum", price: 899, style: "Hotel Chic", category: "Tables", description: "Natural travertine stone round table", color: "#d4c5a0", emoji: "🪑" },

  // Chairs
  { id: "c1", name: "POÄNG Chair", store: "IKEA", price: 119, style: "Scandinavian", category: "Chairs", description: "Birch veneer frame with cushion", color: "#c8a96e", emoji: "💺" },
  { id: "c2", name: "Wabi Chair", store: "H&M Home", price: 299, style: "Japandi", category: "Chairs", description: "Rattan woven seat, oak legs", color: "#b89060", emoji: "💺" },
  { id: "c3", name: "Ghost Chair", store: "Kwantum", price: 249, style: "Modern", category: "Chairs", description: "Transparent polycarbonate dining chair", color: "#e0e0e0", emoji: "💺" },
  { id: "c4", name: "Loft Chair", store: "JYSK", price: 189, style: "Industrial", category: "Chairs", description: "Leather seat with metal pipe legs", color: "#6b4c35", emoji: "💺" },
  { id: "c5", name: "Velvet Accent Chair", store: "Leen Bakker", price: 449, style: "Hotel Chic", category: "Chairs", description: "Deep emerald velvet with gold legs", color: "#2d5a3d", emoji: "💺" },

  // Lighting
  { id: "l1", name: "RANARP Floor Lamp", store: "IKEA", price: 69, style: "Scandinavian", category: "Lighting", description: "Adjustable arm floor lamp in black", color: "#2a2a2a", emoji: "💡" },
  { id: "l2", name: "Washi Pendant", store: "H&M Home", price: 189, style: "Japandi", category: "Lighting", description: "Hand-folded rice paper pendant shade", color: "#f5f0e0", emoji: "💡" },
  { id: "l3", name: "Arc Lamp", store: "Kwantum", price: 299, style: "Modern", category: "Lighting", description: "Chrome arc floor lamp, marble base", color: "#c0c0c0", emoji: "💡" },
  { id: "l4", name: "Edison Cage Light", store: "JYSK", price: 89, style: "Industrial", category: "Lighting", description: "Exposed bulb metal cage pendant", color: "#8b7355", emoji: "💡" },
  { id: "l5", name: "Alabaster Globe", store: "Leen Bakker", price: 349, style: "Hotel Chic" as Style, category: "Lighting", description: "Natural alabaster sphere pendant", color: "#e8e0d0", emoji: "💡" },

  // Decoration
  { id: "d1", name: "Linen Throw", store: "H&M Home", price: 39, style: "Japandi", category: "Decoration", description: "Stonewashed natural linen blanket", color: "#d4c5a0", emoji: "🧺" },
  { id: "d2", name: "Wool Rug 160x230", store: "Kwantum", price: 299, style: "Scandinavian", category: "Decoration", description: "Hand-tufted wool in warm beige tones", color: "#c8b898", emoji: "🧺" },
  { id: "d3", name: "Abstract Print", store: "IKEA", price: 49, style: "Modern", category: "Decoration", description: "Framed geometric art print 50x70cm", color: "#404040", emoji: "🖼️" },
  { id: "d4", name: "Concrete Vase", store: "JYSK", price: 29, style: "Industrial", category: "Decoration", description: "Raw concrete cylinder vase", color: "#9a9490", emoji: "🏺" },
  { id: "d5", name: "Ceramic Bowl Set", store: "Leen Bakker", price: 89, style: "Hotel Chic", category: "Decoration", description: "Hand-thrown matte ceramic trio", color: "#c4b090", emoji: "🏺" },

  // Plants
  { id: "p1", name: "Monstera Deliciosa", store: "IKEA", price: 29, style: "Japandi", category: "Plants", description: "Large tropical leaf plant, 60cm", color: "#4a7a4a", emoji: "🌿" },
  { id: "p2", name: "Fiddle Leaf Fig", store: "H&M Home", price: 79, style: "Hotel Chic", category: "Plants", description: "Tall statement plant 120cm in white pot", color: "#5a8a5a", emoji: "🌿" },
  { id: "p3", name: "Pampas Grass", store: "Kwantum", price: 19, style: "Scandinavian", category: "Plants", description: "Dried pampas grass arrangement", color: "#d4c090", emoji: "🌾" },
  { id: "p4", name: "Snake Plant", store: "JYSK", price: 24, style: "Modern", category: "Plants", description: "Architectural sansevieria in matte pot", color: "#3d6b3d", emoji: "🌱" },
  { id: "p5", name: "Olive Tree", store: "Leen Bakker", price: 129, style: "Hotel Chic", category: "Plants", description: "Mediterranean olive in terracotta", color: "#6b8b4a", emoji: "🫒" },
];

export const WALL_COLORS = [
  { name: "Chalk White", value: "#f8f6f2" },
  { name: "Warm Sand", value: "#e8dcc8" },
  { name: "Sage Green", value: "#b8c9b0" },
  { name: "Clay", value: "#c4a882" },
  { name: "Slate Blue", value: "#8fa0b0" },
  { name: "Plaster Pink", value: "#e0c8c0" },
  { name: "Charcoal", value: "#3d3835" },
  { name: "Off White", value: "#f0ece4" },
];

export const FLOOR_COLORS = [
  { name: "Light Oak", value: "#c8a96e" },
  { name: "Dark Walnut", value: "#6b4c2a" },
  { name: "White Wash", value: "#e8e2d8" },
  { name: "Concrete", value: "#a8a09a" },
  { name: "Herringbone", value: "#b09070" },
  { name: "Black Tile", value: "#2d2a28" },
];

export const SAMPLE_PROJECTS: RoomDesign[] = [
  {
    id: "proj1",
    name: "Living Room Refresh",
    style: "Japandi",
    wallColor: "#f8f6f2",
    floorColor: "#c8a96e",
    furniture: ["s2", "t2", "l2", "p1"],
    createdAt: "2024-01-15",
  },
  {
    id: "proj2",
    name: "Nordic Bedroom",
    style: "Scandinavian",
    wallColor: "#f0ece4",
    floorColor: "#e8e2d8",
    furniture: ["s1", "t3", "c1", "p3"],
    createdAt: "2024-01-20",
  },
  {
    id: "proj3",
    name: "Urban Loft Study",
    style: "Industrial",
    wallColor: "#3d3835",
    floorColor: "#6b4c2a",
    furniture: ["s3", "t4", "l4", "d4"],
    createdAt: "2024-01-22",
  },
];
