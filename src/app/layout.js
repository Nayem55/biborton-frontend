import "../index.css";
import dynamic from "next/dynamic";
import ProvidersServer from "../Components/ProvidersServer";
import Script from "next/script";
// import { Playfair_Display, Manrope } from 'next/font/google';
import { Figtree } from "next/font/google";
import ClientToaster from "../Components/ClientToaster";

// Self-hosted Google Fonts for better performance
const FigtreeFont = Figtree({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-Figtree",
});

export const metadata = {
  metadataBase: new URL("https://biborton.shop/"),

  title: "Biborton | Fashion, Accessories and Lifestyle in Bangladesh",

  description:
    "Shop men and women fashion, watches, jewellery, electronics, accessories and home decor in Bangladesh. Discover trend-first collections from Biborton.",

  keywords: [
    "fashion bd",
    "online fashion bangladesh",
    "men fashion bd",
    "women fashion bd",
    "watches bd",
    "jewellery bd",
    "home decor bd",
    "electronics bd",
  ],

  alternates: {
    canonical: "https://biborton.shop",
  },

  manifest: "/manifest.json",

  icons: {
    icon: [{ url: "/favicon.png" }],
    apple: [{ url: "/favicon.png" }],
  },

  openGraph: {
    type: "website",
    url: "https://biborton.shop/",
    title: {
      default: "Biborton | Fashion and Lifestyle in Bangladesh",
      template: "%s | Biborton",
    },
    description:
      "Explore premium fashion categories for men, women and home at Biborton.",
    siteName: "Biborton",
    // images: [
    //   {
    //     url: "/og.png",
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Biborton Fashion",
    description:
      "Shop fashion, accessories and lifestyle collections in Bangladesh.",
    // images: ["/og.png"],
  },
};

export const viewport = {
  themeColor: "#b82332",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    // <html lang="en" data-theme="mytheme" className={`${playfairDisplay.variable} ${manrope.variable}`}>
    <html lang="en" data-theme="mytheme" className={`${FigtreeFont.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Biborton",
              url: "https://biborton.shop",
              logo: "https://i.ibb.co.com/JPJLjPT/592049781-122108480409129391-8011183550180274212-n.jpg",
            }),
          }}
        />
        {/* Removed external font CDNs - now using self-hosted fonts */}

        {/* DNS Prefetch for external domains */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />

        {/* Preconnect to critical domains */}
        <link rel="preconnect" href="https://luvit.com.bd" />
        <link rel="preconnect" href="http://localhost:3200" />
      </head>

      <body>
        {/* GA4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-FKMEMND3MX`}
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FKMEMND3MX', { page_path: window.location.pathname });
          `}
        </Script>

        {/* Meta Pixel */}
        {/* <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){
              if(f.fbq) return;
              n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq) f._fbq=n;
              n.push=n; n.loaded=!0; n.version='2.0'; n.queue=[];
              t=b.createElement(e); t.async=!0; t.src=v;
              s=b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t,s)
            }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script> */}

        {/* Service Worker Registration */}
        <Script id="sw-register" strategy="lazyOnload">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful');
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>

        {/* <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            alt=""
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript> */}

        {/* Providers + children */}
        <ProvidersServer>
          {children}
          <ClientToaster></ClientToaster>
        </ProvidersServer>
      </body>
    </html>
  );
}
