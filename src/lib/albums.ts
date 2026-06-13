export type Photo = {
  id: string;
  caption?: string;
  location?: string;
  featured?: boolean;
};

export type Album = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  span: "col" | "row" | "square";
  pullQuote?: string;
  photos: Photo[];
};

export const photoUrl = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const photoSrcSet = (id: string) =>
  [400, 800, 1200, 1600, 2400]
    .map((w) => `${photoUrl(id, w)} ${w}w`)
    .join(", ");

export const albums: Album[] = [
  {
    slug: "dance-and-motion",
    title: "Dance & Motion",
    tagline: "Bodies in light",
    description:
      "A series of contemporary dance photographs — bodies suspended in stage light, frozen at the apex of motion.",
    span: "col",
    pullQuote:
      "Dance is the only art where the medium disappears the moment you make it.",
    photos: [
      { id: "photo-1518834107812-67b0b7c58434", caption: "Backstage warm-up", location: "Lagos · 2025", featured: true },
      { id: "photo-1547153760-18fc86324498", caption: "Apex", location: "Lagos · 2025" },
      { id: "photo-1535525153412-5a092d83dbc0", caption: "Untitled study", location: "Studio · 2024" },
      { id: "photo-1504609813442-a8924e83f76e", caption: "Rehearsal hall", location: "Abuja · 2024" },
      { id: "photo-1519682337058-a94d519337bc", caption: "Spotlight", location: "Lagos · 2025" },
      { id: "photo-1508700115892-45ecd05ae2ad", caption: "In silhouette", location: "Lagos · 2025" },
      { id: "photo-1524594152303-9fd13543fe6e", caption: "Mid-turn", location: "Lagos · 2024" },
      { id: "photo-1545959570-a94084071b5d", caption: "Curtain", location: "Studio · 2024" },
      { id: "photo-1496337589254-7e19d01cec44", caption: "Held", location: "Lagos · 2025" },
      { id: "photo-1533561797500-4fad4750814e", caption: "Floor work", location: "Studio · 2024" },
      { id: "photo-1455729552865-3658a5d39692", caption: "Falling", location: "Lagos · 2025" },
      { id: "photo-1502635385003-ee1e6a1a742d", caption: "Breath", location: "Lagos · 2025" },
    ],
  },
  {
    slug: "church-and-worship",
    title: "Church & Worship",
    tagline: "Sanctuary in frame",
    description:
      "Worship services and quiet sanctuaries — light through stained glass, hands raised, congregations in song.",
    span: "row",
    pullQuote: "The sanctuary keeps a different kind of time.",
    photos: [
      { id: "photo-1438232992991-995b7058bbb3", caption: "Sunday morning", location: "Lagos · 2025", featured: true },
      { id: "photo-1507692049790-de58290a4334", caption: "Light through panes", location: "Lagos · 2024" },
      { id: "photo-1473177104440-ffee2f376098", caption: "Nave", location: "Ibadan · 2024" },
      { id: "photo-1519892300165-cb5542fb47c7", caption: "Quiet", location: "Lagos · 2025" },
      { id: "photo-1520637836862-4d197d17c97a", caption: "Congregation", location: "Lagos · 2025" },
      { id: "photo-1490127252417-7c393f993ee4", caption: "Choir", location: "Lagos · 2025" },
      { id: "photo-1542384557-0824d90731ee", caption: "Pulpit", location: "Lagos · 2024" },
      { id: "photo-1519750013411-d04ac8f04eb6", caption: "Hands raised", location: "Lagos · 2025" },
      { id: "photo-1503455637927-730bce8583c0", caption: "Vespers", location: "Ibadan · 2024" },
      { id: "photo-1466442929976-97f336a657be", caption: "Stained glass", location: "Lagos · 2025" },
    ],
  },
  {
    slug: "live-events",
    title: "Live Events",
    tagline: "Front row energy",
    description:
      "Concerts, festivals, and front-row crowds — high-contrast, high-energy photographs from the pit.",
    span: "square",
    pullQuote: "Front row is a frequency, not a seat.",
    photos: [
      { id: "photo-1470229722913-7c0e2dbbafd3", caption: "Headliner", location: "Lagos · 2025", featured: true },
      { id: "photo-1501281668745-f7f57925c3b4", caption: "Crowd", location: "Lagos · 2025" },
      { id: "photo-1493225457124-a3eb161ffa5f", caption: "Stage left", location: "Lagos · 2025" },
      { id: "photo-1429962714451-bb934ecdc4ec", caption: "Lasers", location: "Lagos · 2024" },
      { id: "photo-1459749411175-04bf5292ceea", caption: "Encore", location: "Lagos · 2025" },
      { id: "photo-1516450360452-9312f5e86fc7", caption: "From the pit", location: "Lagos · 2024" },
      { id: "photo-1506157786151-b8491531f063", caption: "Bassline", location: "Lagos · 2025" },
      { id: "photo-1514525253161-7a46d19cd819", caption: "Smoke", location: "Lagos · 2025" },
      { id: "photo-1533174072545-7a4b6ad7a6c3", caption: "Set close", location: "Lagos · 2024" },
      { id: "photo-1524368535928-5b5e00ddc76b", caption: "Outro", location: "Lagos · 2025" },
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    tagline: "Faces & stories",
    description:
      "Studio and natural-light portraits — quiet faces, deliberate frames.",
    span: "square",
    pullQuote: "A portrait is a conversation that happens to be lit.",
    photos: [
      { id: "photo-1531123897727-8f129e1688ce", caption: "Anna", location: "Studio · 2025", featured: true },
      { id: "photo-1517841905240-472988babdf9", caption: "Window light", location: "Lagos · 2024" },
      { id: "photo-1463453091185-61582044d556", caption: "Untitled", location: "Lagos · 2025" },
      { id: "photo-1500648767791-00dcc994a43e", caption: "Sàmi", location: "Studio · 2025" },
      { id: "photo-1506794778202-cad84cf45f1d", caption: "After hours", location: "Lagos · 2024" },
      { id: "photo-1502323777036-f29e3972d82f", caption: "Quiet", location: "Studio · 2025" },
      { id: "photo-1488161628813-04466f872be2", caption: "Profile", location: "Lagos · 2025" },
      { id: "photo-1521119989659-a83eee488004", caption: "Late afternoon", location: "Lagos · 2024" },
    ],
  },
];

export const getAlbum = (slug: string) => albums.find((a) => a.slug === slug);
