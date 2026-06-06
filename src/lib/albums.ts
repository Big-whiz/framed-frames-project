export type Album = {
  slug: string;
  title: string;
  tagline: string;
  cover: string;
  span: "col" | "row" | "square";
  images: string[];
};

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const albums: Album[] = [
  {
    slug: "dance-and-motion",
    title: "Dance & Motion",
    tagline: "Bodies in light",
    cover: u("photo-1518834107812-67b0b7c58434"),
    span: "col",
    images: [
      u("photo-1518834107812-67b0b7c58434"),
      u("photo-1547153760-18fc86324498"),
      u("photo-1535525153412-5a092d83dbc0"),
      u("photo-1504609813442-a8924e83f76e"),
      u("photo-1519682337058-a94d519337bc"),
      u("photo-1508700115892-45ecd05ae2ad"),
      u("photo-1524594152303-9fd13543fe6e"),
      u("photo-1545959570-a94084071b5d"),
      u("photo-1496337589254-7e19d01cec44"),
      u("photo-1533561797500-4fad4750814e"),
      u("photo-1455729552865-3658a5d39692"),
      u("photo-1502635385003-ee1e6a1a742d"),
    ],
  },
  {
    slug: "church-and-worship",
    title: "Church & Worship",
    tagline: "Sanctuary in frame",
    cover: u("photo-1438232992991-995b7058bbb3"),
    span: "row",
    images: [
      u("photo-1438232992991-995b7058bbb3"),
      u("photo-1507692049790-de58290a4334"),
      u("photo-1473177104440-ffee2f376098"),
      u("photo-1519892300165-cb5542fb47c7"),
      u("photo-1520637836862-4d197d17c97a"),
      u("photo-1490127252417-7c393f993ee4"),
      u("photo-1542384557-0824d90731ee"),
      u("photo-1519750013411-d04ac8f04eb6"),
      u("photo-1503455637927-730bce8583c0"),
      u("photo-1466442929976-97f336a657be"),
    ],
  },
  {
    slug: "live-events",
    title: "Live Events",
    tagline: "Front row energy",
    cover: u("photo-1470229722913-7c0e2dbbafd3"),
    span: "square",
    images: [
      u("photo-1470229722913-7c0e2dbbafd3"),
      u("photo-1501281668745-f7f57925c3b4"),
      u("photo-1493225457124-a3eb161ffa5f"),
      u("photo-1429962714451-bb934ecdc4ec"),
      u("photo-1459749411175-04bf5292ceea"),
      u("photo-1516450360452-9312f5e86fc7"),
      u("photo-1506157786151-b8491531f063"),
      u("photo-1514525253161-7a46d19cd819"),
      u("photo-1533174072545-7a4b6ad7a6c3"),
      u("photo-1524368535928-5b5e00ddc76b"),
    ],
  },
  {
    slug: "portraits",
    title: "Portraits",
    tagline: "Faces & stories",
    cover: u("photo-1531123897727-8f129e1688ce"),
    span: "square",
    images: [
      u("photo-1531123897727-8f129e1688ce"),
      u("photo-1517841905240-472988babdf9"),
      u("photo-1463453091185-61582044d556"),
      u("photo-1500648767791-00dcc994a43e"),
      u("photo-1506794778202-cad84cf45f1d"),
      u("photo-1502323777036-f29e3972d82f"),
      u("photo-1488161628813-04466f872be2"),
      u("photo-1521119989659-a83eee488004"),
    ],
  },
];

export const getAlbum = (slug: string) => albums.find((a) => a.slug === slug);
