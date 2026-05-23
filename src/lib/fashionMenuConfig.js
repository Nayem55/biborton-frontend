export const FASHION_CATEGORIES = [
  "Men's T-Shirts",
  "Men's Shirts",
  "Men's Polo",
  "Men's Panjabi & Kurta",
  "Men's Jeans",
  "Men's Pants & Trousers",
  "Men's Jackets",
  "Men's Blazers",
  "Men's Hoodies & Sweatshirts",
  "Men's Ethnic Wear",
  "Women's Saree",
  "Women's Salwar Kameez",
  "Women's Kurti & Tops",
  "Women's Dresses",
  "Women's Gown",
  "Women's Jeans & Pants",
  "Women's Skirts",
  "Women's Hijab & Abaya",
  "Women's Winter Collection",
  "Kids Boys Collection",
  "Kids Girls Collection",
  "Couple Collection",
  "Watches",
  "Sunglasses",
  "Wallets",
  "Belts",
  "Bags & Backpacks",
  "Jewellery",
  "Footwear",
  "Electronics",
  "Mobile Accessories",
  "Computer Accessories",
  "Smart Gadgets",
  "Home Decor",
  "Lighting & Lamps",
  "Bedroom Decor",
  "Kitchen Essentials",
  "Gift Items",
];

const categoryHref = (label) =>
  `/product-category/${encodeURIComponent(label.toLowerCase())}`;

const mapItems = (items) => items.map((label) => ({ label, href: categoryHref(label) }));

export const FASHION_MENU_CONFIG = [
  {
    name: "Men",
    link: categoryHref("Men's T-Shirts"),
    dropdown: [
      {
        title: "Top Wear",
        items: mapItems([
          "Men's T-Shirts",
          "Men's Shirts",
          "Men's Polo",
          "Men's Hoodies & Sweatshirts",
          "Men's Jackets",
        ]),
      },
      {
        title: "Bottom & Ethnic",
        items: mapItems([
          "Men's Jeans",
          "Men's Pants & Trousers",
          "Men's Panjabi & Kurta",
          "Men's Ethnic Wear",
          "Footwear",
        ]),
      },
    ],
  },
  {
    name: "Women",
    link: categoryHref("Women's Dresses"),
    dropdown: [
      {
        title: "Traditional",
        items: mapItems([
          "Women's Saree",
          "Women's Salwar Kameez",
          "Women's Hijab & Abaya",
          "Women's Kurti & Tops",
        ]),
      },
      {
        title: "Modern",
        items: mapItems([
          "Women's Dresses",
          "Women's Gown",
          "Women's Jeans & Pants",
          "Women's Skirts",
          "Women's Winter Collection",
        ]),
      },
    ],
  },
  {
    name: "Kids",
    link: categoryHref("Kids Boys Collection"),
    dropdown: [
      {
        title: "Children",
        items: mapItems([
          "Kids Boys Collection",
          "Kids Girls Collection",
          "Couple Collection",
          "Gift Items",
        ]),
      },
    ],
  },
  {
    name: "Accessories",
    link: categoryHref("Watches"),
    dropdown: [
      {
        title: "Fashion Accessories",
        items: mapItems([
          "Watches",
          "Sunglasses",
          "Wallets",
          "Belts",
          "Bags & Backpacks",
          "Jewellery",
        ]),
      },
    ],
  },
  {
    name: "Electronics",
    link: categoryHref("Electronics"),
    dropdown: [
      {
        title: "Gadgets",
        items: mapItems([
          "Electronics",
          "Mobile Accessories",
          "Computer Accessories",
          "Smart Gadgets",
        ]),
      },
    ],
  },
  {
    name: "Home Decor",
    link: categoryHref("Home Decor"),
    dropdown: [
      {
        title: "Decor Essentials",
        items: mapItems([
          "Home Decor",
          "Lighting & Lamps",
          "Bedroom Decor",
          "Kitchen Essentials",
        ]),
      },
    ],
  },
  { name: "Shop", link: "/shop" },
  { name: "Contact", link: "/contact" },
];
