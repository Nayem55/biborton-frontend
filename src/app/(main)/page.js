import Home from "../../Pages_old/Home/Home";

export const metadata = {
  metadataBase: new URL("https://biborton.shop"),

  title: {
    default: "Biborton | Fashion and Lifestyle Marketplace in Bangladesh",
    template: "%s | Biborton",
  },

  description:
    "Shop all types of men and women dresses, watches, accessories, electronics, jewellery and home decor at Biborton.",

  keywords: [
    "men dresses bd",
    "women dresses bd",
    "watch shop bd",
    "fashion accessories bd",
    "electronics shop bd",
    "jewellery shop bd",
    "home decor bangladesh",
    "online fashion bd",
  ],

  alternates: {
    canonical: "https://biborton.shop",
  },

  openGraph: {
    type: "website",
    url: "https://biborton.shop",
    title: "Biborton - Premium Fashion in Bangladesh",
    description:
      "Shop trend-first fashion, accessories and decor in Bangladesh.",
    siteName: "Biborton",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Biborton Fashion Collection",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Biborton - Fashion Shop BD",
    description: "Buy fashion and lifestyle products in Bangladesh from Biborton.",
    images: ["/og.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Biborton",
    url: "https://biborton.shop",
    logo: "https://i.ibb.co.com/JPJLjPT/592049781-122108480409129391-8011183550180274212-n.jpg",
    sameAs: ["https://www.facebook.com/", "https://www.instagram.com/"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />{" "}
      <Home />
    </>
  );
}
