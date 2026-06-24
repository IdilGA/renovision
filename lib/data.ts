export type Stijl = "Japandi" | "Scandinavisch" | "Modern" | "Industrieel" | "Hotel Chic";
export type Categorie = "Banken" | "Tafels" | "Stoelen" | "Verlichting" | "Decoratie" | "Planten";
export type Winkel = "IKEA" | "JYSK" | "Leen Bakker" | "Kwantum" | "H&M Home";

// Keep English aliases for internal compatibility
export type Style = Stijl;
export type Category = Categorie;
export type Store = Winkel;

export interface MeubelItem {
  id: string;
  naam: string;
  winkel: Winkel;
  prijs: number;
  stijl: Stijl;
  categorie: Categorie;
  beschrijving: string;
  afbeelding: string;
  emoji: string;
  // English aliases
  name?: string;
  store?: Winkel;
  style?: Stijl;
  category?: Categorie;
  price?: number;
  description?: string;
  image?: string;
  naam_kort?: string;
}

export type FurnitureItem = MeubelItem;

export interface KamerOntwerp {
  id: string;
  naam: string;
  stijl: Stijl;
  muurKleur: string;
  vloerKleur: string;
  meubels: string[];
  aangemaakt: string;
  // English aliases
  name?: string;
  style?: Stijl;
  wallColor?: string;
  floorColor?: string;
  furniture?: string[];
  createdAt?: string;
}

export type RoomDesign = KamerOntwerp;

const IMG = (id: string) => `https://images.unsplash.com/photo-${id}?w=600&auto=format&fit=crop&q=70`;

export const STYLES: { id: Stijl; beschrijving: string; emoji: string; kleuren: string[] }[] = [
  {
    id: "Japandi",
    beschrijving: "Minimalistische Japans-Scandinavische fusie met natuurlijke materialen",
    emoji: "🌿",
    kleuren: ["#e8e0d4", "#c4b9a8", "#8b7355", "#4a4236"],
  },
  {
    id: "Scandinavisch",
    beschrijving: "Strakke lijnen, lichte houtsoorten en functionele schoonheid",
    emoji: "🪵",
    kleuren: ["#f0ebe3", "#d4c5b0", "#a89880", "#6b5d4e"],
  },
  {
    id: "Modern",
    beschrijving: "Gedurfde contrasten, strakke oppervlakken en hedendaagse vormen",
    emoji: "◼",
    kleuren: ["#e5e5e5", "#b0b0b0", "#404040", "#1a1a1a"],
  },
  {
    id: "Industrieel",
    beschrijving: "Ruwe texturen, metalen accenten en stedelijke fabrieksesthetiek",
    emoji: "⚙️",
    kleuren: ["#d4cfc9", "#a09890", "#6b6560", "#3d3935"],
  },
  {
    id: "Hotel Chic",
    beschrijving: "Luxueus, gecureerd en elegante boutique-hotelstijl",
    emoji: "✨",
    kleuren: ["#f5f0e8", "#d4c5a0", "#8b7355", "#2d2520"],
  },
];

export const MEUBELS: MeubelItem[] = [
  // ── Banken ──
  {
    id: "s1",
    naam: "KIVIK 3-zits bank",
    naam_kort: "KIVIK Bank",
    winkel: "IKEA",
    prijs: 699,
    stijl: "Scandinavisch",
    categorie: "Banken",
    beschrijving: "Ruime 3-zits bank met diepe zitplaats en lage rugleuning. Verkrijgbaar in Hillared donkerblauw.",
    afbeelding: IMG("1555041469-a586c61ea9bc"),
    emoji: "🛋️",
  },
  {
    id: "s2",
    naam: "Osaka Linnen Bank",
    winkel: "Leen Bakker",
    prijs: 1299,
    stijl: "Japandi",
    categorie: "Banken",
    beschrijving: "Laag profiel sofa in naturel linnen met eiken poten. Tijdloze rust in elke woonkamer.",
    afbeelding: IMG("1493663284031-b7e3aefcae8e"),
    emoji: "🛋️",
  },
  {
    id: "s3",
    naam: "Denver Hoekbank",
    winkel: "JYSK",
    prijs: 849,
    stijl: "Industrieel",
    categorie: "Banken",
    beschrijving: "L-vormige hoekbank in donker fluweel met metalen poten. Perfect voor een loftinterieur.",
    afbeelding: IMG("1540574163026-643ea20ade25"),
    emoji: "🛋️",
  },
  {
    id: "s4",
    naam: "Pearl Bouclé Sofa",
    winkel: "H&M Home",
    prijs: 1799,
    stijl: "Hotel Chic",
    categorie: "Banken",
    beschrijving: "Gebogen boucléstof bank in gebroken wit. Luxueus en sculpturaal van vorm.",
    afbeelding: IMG("1567016432779-094069958ea5"),
    emoji: "🛋️",
  },
  {
    id: "s5",
    naam: "Grid Modulaire Bank",
    winkel: "Kwantum",
    prijs: 549,
    stijl: "Modern",
    categorie: "Banken",
    beschrijving: "Modulaire 2-zitter in grafietgrijs. Eenvoudig uitbreidbaar met extra elementen.",
    afbeelding: IMG("1561233835-f938d1c47a4b"),
    emoji: "🛋️",
  },

  // ── Tafels ──
  {
    id: "t1",
    naam: "LACK Salontafel",
    winkel: "IKEA",
    prijs: 29,
    stijl: "Modern",
    categorie: "Tafels",
    beschrijving: "Minimalistische vierkante salontafel in zwart. Strak en functioneel.",
    afbeelding: IMG("1533090161767-e6ffed986c88"),
    emoji: "🪵",
  },
  {
    id: "t2",
    naam: "Bamboe Bijzettafel",
    winkel: "H&M Home",
    prijs: 149,
    stijl: "Japandi",
    categorie: "Tafels",
    beschrijving: "Handgemaakte bamboe bijzettafel met rond blad. Duurzaam en warm van uitstraling.",
    afbeelding: IMG("1567538096621-38d2284b23ff"),
    emoji: "🪵",
  },
  {
    id: "t3",
    naam: "Oslo Eiken Eettafel",
    winkel: "Leen Bakker",
    prijs: 699,
    stijl: "Scandinavisch",
    categorie: "Tafels",
    beschrijving: "Massief eiken eettafel voor 6 personen. Tijdloze Scandinavische vormgeving.",
    afbeelding: IMG("1449247613801-ab06418e2861"),
    emoji: "🪵",
  },
  {
    id: "t4",
    naam: "Iron & Wood Tafel",
    winkel: "JYSK",
    prijs: 399,
    stijl: "Industrieel",
    categorie: "Tafels",
    beschrijving: "Gerecycled hout met zwart stalen frame. Robuust industrieel karakter.",
    afbeelding: IMG("1586023492125-27b2c045efd7"),
    emoji: "🪵",
  },
  {
    id: "t5",
    naam: "Travertijn Ronde Tafel",
    winkel: "Kwantum",
    prijs: 1099,
    stijl: "Hotel Chic",
    categorie: "Tafels",
    beschrijving: "Natuurlijk travertijnsteen op goudkleurig onderstel. Echte blikvanger.",
    afbeelding: IMG("1616594039964-ae9021a400a0"),
    emoji: "🪵",
  },

  // ── Stoelen ──
  {
    id: "c1",
    naam: "POÄNG Fauteuil",
    winkel: "IKEA",
    prijs: 119,
    stijl: "Scandinavisch",
    categorie: "Stoelen",
    beschrijving: "Berken multiplex frame met comfortabel kussen. Klassiek Scandinavisch ontwerp.",
    afbeelding: IMG("1506439773649-6e0eb8cfb237"),
    emoji: "💺",
  },
  {
    id: "c2",
    naam: "Wabi Rotan Stoel",
    winkel: "H&M Home",
    prijs: 329,
    stijl: "Japandi",
    categorie: "Stoelen",
    beschrijving: "Gevlochten rotan zitting op eiken poten. Ambachtelijk en organisch.",
    afbeelding: IMG("1598300042247-d088f8ab3a91"),
    emoji: "💺",
  },
  {
    id: "c3",
    naam: "Ghost Transparante Stoel",
    winkel: "Kwantum",
    prijs: 249,
    stijl: "Modern",
    categorie: "Stoelen",
    beschrijving: "Transparante polycarbonaat eetkamerstoel. Ruimtelijk en eigentijds.",
    afbeelding: IMG("1592078615290-033ee584e267"),
    emoji: "💺",
  },
  {
    id: "c4",
    naam: "Loft Leren Stoel",
    winkel: "JYSK",
    prijs: 199,
    stijl: "Industrieel",
    categorie: "Stoelen",
    beschrijving: "Lederen zitting op stalen buispoten. Stoer industrieel accent.",
    afbeelding: IMG("1581539250439-c96689b516dd"),
    emoji: "💺",
  },
  {
    id: "c5",
    naam: "Velvet Accent Fauteuil",
    winkel: "Leen Bakker",
    prijs: 499,
    stijl: "Hotel Chic",
    categorie: "Stoelen",
    beschrijving: "Diep smaragdgroen fluweel op goudkleurige poten. Pure luxe.",
    afbeelding: IMG("1503602642458-232111445657"),
    emoji: "💺",
  },

  // ── Verlichting ──
  {
    id: "l1",
    naam: "RANARP Vloerlamp",
    winkel: "IKEA",
    prijs: 69,
    stijl: "Scandinavisch",
    categorie: "Verlichting",
    beschrijving: "Verstelbare vloerlamp in zwart. Functioneel en tijdloos van design.",
    afbeelding: IMG("1507003211169-0a1dd7228f2d"),
    emoji: "💡",
  },
  {
    id: "l2",
    naam: "Washi Hanglamp",
    winkel: "H&M Home",
    prijs: 189,
    stijl: "Japandi",
    categorie: "Verlichting",
    beschrijving: "Met de hand gevouwen rijstpapieren lampenkap. Warm en rustgevend licht.",
    afbeelding: IMG("1565814329452-e1efa11c5b89"),
    emoji: "💡",
  },
  {
    id: "l3",
    naam: "Arc Booglamp",
    winkel: "Kwantum",
    prijs: 349,
    stijl: "Modern",
    categorie: "Verlichting",
    beschrijving: "Chroom booglamp op marmeren voet. Sculpturaal statement in elk interieur.",
    afbeelding: IMG("1524484485831-a92ffc0de03f"),
    emoji: "💡",
  },
  {
    id: "l4",
    naam: "Edison Kooi Lamp",
    winkel: "JYSK",
    prijs: 89,
    stijl: "Industrieel",
    categorie: "Verlichting",
    beschrijving: "Metalen kooi met zichtbare gloeilamp. Authentic industrieel karakter.",
    afbeelding: IMG("1513506003901-1e6a35f4df4d"),
    emoji: "💡",
  },
  {
    id: "l5",
    naam: "Alabaster Bol Lamp",
    winkel: "Leen Bakker",
    prijs: 429,
    stijl: "Hotel Chic",
    categorie: "Verlichting",
    beschrijving: "Hanglamp van natuurlijk alabastersteen. Elk exemplaar is uniek.",
    afbeelding: IMG("1558618666-fcd25c85cd64"),
    emoji: "💡",
  },

  // ── Decoratie ──
  {
    id: "d1",
    naam: "Linnen Plaid",
    winkel: "H&M Home",
    prijs: 45,
    stijl: "Japandi",
    categorie: "Decoratie",
    beschrijving: "Stonewashed naturel linnen deken. Luchtig en comfortabel door het hele jaar.",
    afbeelding: IMG("1586158291800-2665f07bba79"),
    emoji: "🧺",
  },
  {
    id: "d2",
    naam: "Wol Vloerkleed 160×230",
    winkel: "Kwantum",
    prijs: 349,
    stijl: "Scandinavisch",
    categorie: "Decoratie",
    beschrijving: "Handgetufted wollen vloerkleed in warme beige tinten. Zacht en duurzaam.",
    afbeelding: IMG("1618220048045-10a6dbdf2e1d"),
    emoji: "🧺",
  },
  {
    id: "d3",
    naam: "Abstract Kunstprint",
    winkel: "IKEA",
    prijs: 59,
    stijl: "Modern",
    categorie: "Decoratie",
    beschrijving: "Ingelijste geometrische kunstprint 50×70 cm. Statement voor elke muur.",
    afbeelding: IMG("1579783901086-a2b06f238ffe"),
    emoji: "🖼️",
  },
  {
    id: "d4",
    naam: "Betonnen Vaas",
    winkel: "JYSK",
    prijs: 34,
    stijl: "Industrieel",
    categorie: "Decoratie",
    beschrijving: "Ruw beton cilindervaas. Stoere tegenhanger voor bloemen en takken.",
    afbeelding: IMG("1578500351292-db4a8df5e6cb"),
    emoji: "🏺",
  },
  {
    id: "d5",
    naam: "Keramiek Schalen Set",
    winkel: "Leen Bakker",
    prijs: 99,
    stijl: "Hotel Chic",
    categorie: "Decoratie",
    beschrijving: "Set van 3 handgedraaide matte keramische schalen. Prachtig als decoratie.",
    afbeelding: IMG("1575652375547-23282ba20c41"),
    emoji: "🏺",
  },

  // ── Planten ──
  {
    id: "p1",
    naam: "Monstera Deliciosa",
    winkel: "IKEA",
    prijs: 29,
    stijl: "Japandi",
    categorie: "Planten",
    beschrijving: "Grote tropische bladplant, circa 60 cm. Geeft elke ruimte een botanisch gevoel.",
    afbeelding: IMG("1416879595882-3373a0480b5b"),
    emoji: "🌿",
  },
  {
    id: "p2",
    naam: "Vioolbladvijg",
    winkel: "H&M Home",
    prijs: 89,
    stijl: "Hotel Chic",
    categorie: "Planten",
    beschrijving: "Grote statement plant van 120 cm in witte pot. Hotelsfeer in jouw woonkamer.",
    afbeelding: IMG("1463320726281-696a3cc57e97"),
    emoji: "🌿",
  },
  {
    id: "p3",
    naam: "Pampas Gras",
    winkel: "Kwantum",
    prijs: 22,
    stijl: "Scandinavisch",
    categorie: "Planten",
    beschrijving: "Gedroogde pampas boeket. Sfeervol en onderhoudsvrij decoratie-element.",
    afbeelding: IMG("1502987781765-4aadc2a1f7d0"),
    emoji: "🌾",
  },
  {
    id: "p4",
    naam: "Vrouwentong",
    winkel: "JYSK",
    prijs: 26,
    stijl: "Modern",
    categorie: "Planten",
    beschrijving: "Architectonische sansevieria in matte pot. Vrijwel onderhoudsloos.",
    afbeelding: IMG("1444636573849-c8c47f6a6e59"),
    emoji: "🌱",
  },
  {
    id: "p5",
    naam: "Olijfboom",
    winkel: "Leen Bakker",
    prijs: 149,
    stijl: "Hotel Chic",
    categorie: "Planten",
    beschrijving: "Mediterrane olijfboom in terracottapot. Mediterraan gevoel in huis.",
    afbeelding: IMG("1600411833196-7b8de3f5fdef"),
    emoji: "🫒",
  },
] as MeubelItem[];

// Add English aliases to each item
MEUBELS.forEach((m) => {
  m.name = m.naam;
  m.store = m.winkel;
  m.style = m.stijl;
  m.category = m.categorie;
  m.price = m.prijs;
  m.description = m.beschrijving;
  m.image = m.afbeelding;
  // keep naam_kort if not set
  if (!m.naam_kort) m.naam_kort = m.naam;
});

// English alias
export const FURNITURE = MEUBELS;

export const MUUR_KLEUREN = [
  { naam: "Krijtwitw", value: "#f8f6f2" },
  { naam: "Warm Zand", value: "#e8dcc8" },
  { naam: "Saliegroen", value: "#b8c9b0" },
  { naam: "Klei", value: "#c4a882" },
  { naam: "Leisteenblauw", value: "#8fa0b0" },
  { naam: "Pleisterroze", value: "#e0c8c0" },
  { naam: "Houtskool", value: "#3d3835" },
  { naam: "Gebroken Wit", value: "#f0ece4" },
];

export const VLOER_KLEUREN = [
  { naam: "Licht Eiken", value: "#c8a96e" },
  { naam: "Donker Walnoot", value: "#6b4c2a" },
  { naam: "White Wash", value: "#e8e2d8" },
  { naam: "Beton", value: "#a8a09a" },
  { naam: "Visgraat", value: "#b09070" },
  { naam: "Zwarte Tegel", value: "#2d2a28" },
];

// English aliases
export const WALL_COLORS = MUUR_KLEUREN.map((k) => ({ name: k.naam, value: k.value }));
export const FLOOR_COLORS = VLOER_KLEUREN.map((k) => ({ name: k.naam, value: k.value }));

export const VOORBEELD_PROJECTEN: KamerOntwerp[] = [
  {
    id: "proj1",
    naam: "Woonkamer Refresh",
    stijl: "Japandi",
    muurKleur: "#f8f6f2",
    vloerKleur: "#c8a96e",
    meubels: ["s2", "t2", "l2", "p1"],
    aangemaakt: "2024-01-15",
    name: "Woonkamer Refresh",
    style: "Japandi",
    wallColor: "#f8f6f2",
    floorColor: "#c8a96e",
    furniture: ["s2", "t2", "l2", "p1"],
    createdAt: "2024-01-15",
  },
  {
    id: "proj2",
    naam: "Nordische Slaapkamer",
    stijl: "Scandinavisch",
    muurKleur: "#f0ece4",
    vloerKleur: "#e8e2d8",
    meubels: ["s1", "t3", "c1", "p3"],
    aangemaakt: "2024-01-20",
    name: "Nordische Slaapkamer",
    style: "Scandinavisch",
    wallColor: "#f0ece4",
    floorColor: "#e8e2d8",
    furniture: ["s1", "t3", "c1", "p3"],
    createdAt: "2024-01-20",
  },
  {
    id: "proj3",
    naam: "Urban Loft Studeerkamer",
    stijl: "Industrieel",
    muurKleur: "#3d3835",
    vloerKleur: "#6b4c2a",
    meubels: ["s3", "t4", "l4", "d4"],
    aangemaakt: "2024-01-22",
    name: "Urban Loft Studeerkamer",
    style: "Industrieel",
    wallColor: "#3d3835",
    floorColor: "#6b4c2a",
    furniture: ["s3", "t4", "l4", "d4"],
    createdAt: "2024-01-22",
  },
];

export const SAMPLE_PROJECTS = VOORBEELD_PROJECTEN;
