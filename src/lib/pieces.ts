export type EditionStatus = "open" | "closed";

export type Piece = {
  slug: string;
  name: string;
  editionLabel: string;
  status: EditionStatus;
  note: string;
  price: string;
  imagePath: string;
  secondaryImagePath?: string;
  imageAlt: string;
};

export const pieces: Piece[] = [
  {
    slug: "ivory-column-coat",
    name: "Ivory Column Coat",
    editionLabel: "Edition I",
    status: "open",
    note: "Individually finished. Finite allocation.",
    price: "₹ 2,95,000",
    imagePath: "/images/piece-01.png",
    secondaryImagePath: "/images/piece-01.png", // Corrected: Was piece-05 (now tunique)
    imageAlt: "Ivory coat in a calm studio light",
  },
  {
    slug: "black-ink-drape-dress",
    name: "Ink Drape Dress",
    editionLabel: "Edition I",
    status: "open",
    note: "Fluid form. Tailored ease.",
    price: "₹ 3,45,000",
    imagePath: "/images/piece-02c.png",
    secondaryImagePath: "/images/piece-02c.png", // Corrected: piece-02 is the Cape
    imageAlt: "Black draped dress with restrained silhouette",
  },
  {
    slug: "quiet-silk-trouser",
    name: "Quiet Silk Trouser",
    editionLabel: "Edition II",
    status: "closed",
    note: "Edition closed. Held in Archive.",
    price: "₹ 1,85,000",
    imagePath: "/images/piece-03.png",
    secondaryImagePath: "/images/piece-03.png", // Corrected: Was piece-02 (dress)
    imageAlt: "Silk trouser in soft shadow",
  },
  {
    slug: "atelier-wrap",
    name: "Atelier Wrap",
    editionLabel: "Edition I",
    status: "closed",
    note: "Edition closed. Held in Archive.",
    price: "₹ 2,15,000",
    imagePath: "/images/piece-04.png",
    secondaryImagePath: "/images/piece-04.png", // Corrected: Was piece-03 (trouser)
    imageAlt: "Wrap garment on a hanger, understated",
  },
  {
    slug: "midnight-wool-cape",
    name: "Midnight Wool Cape",
    editionLabel: "Edition I",
    status: "open",
    note: "Heavyweight drape. Unstructured form.",
    price: "₹ 4,15,000",
    imagePath: "/images/piece-02.png",
    secondaryImagePath: "/images/piece-02.png", // Same as primary to avoid color mismatch
    imageAlt: "Dark wool cape with minimal detailing",
  },
  {
    slug: "sculpted-ivory-tunic",
    name: "Sculpted Ivory Tunic",
    editionLabel: "Edition II",
    status: "open",
    note: "Stiffened silk. Architectural silhouette.",
    price: "₹ 2,45,000",
    imagePath: "/images/fabric-ivory-01.jpg",
    secondaryImagePath: "/images/fabric-ivory-02.jpg", // Consistent ivory texture
    imageAlt: "Ivory tunic with structured shoulders",
  },
  {
    slug: "reserve-cashmere-shawl",
    name: "Reserve Cashmere Shawl",
    editionLabel: "Edition I",
    status: "open",
    note: "Hand-loomed. Undyed natural fiber.",
    price: "₹ 1,95,000",
    imagePath: "/images/atelier-tools-01.jpg",
    secondaryImagePath: "/images/atelier-01.jpg",
    imageAlt: "Textured cashmere shawl",
  },
];

export const openPieces = pieces.filter((p) => p.status === "open");
export const closedPieces = pieces.filter((p) => p.status === "closed");
