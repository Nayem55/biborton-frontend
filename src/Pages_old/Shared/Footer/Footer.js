import React from "react";
import Link from "next/link";
import { FASHION_MENU_CONFIG } from "../../../lib/fashionMenuConfig";

const Footer = () => {
  const year = new Date().getFullYear();

  const LinkItem = ({ to, children }) => (
    <Link
      href={to}
      className="text-[12px] leading-6 font-semibold text-white/85 transition hover:text-white hover:underline"
    >
      {children}
    </Link>
  );

  const FooterTitle = ({ children }) => (
    <h3 className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white">
      {children}
    </h3>
  );

  const SocialIcon = ({ href, ariaLabel, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition hover:border-white hover:bg-white hover:text-black"
    >
      {children}
    </a>
  );

  const UtilityItem = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-3 text-white">
      <div className="mt-0.5">{icon}</div>

      <div>
        <p className="text-[12px] font-bold leading-tight">{title}</p>
        <p className="text-[11px] text-white/70">{subtitle}</p>
      </div>
    </div>
  );

  const categoryHref = (label) =>
    `/product-category/${encodeURIComponent(label.toLowerCase())}`;

  const footerCategoryGroups = [
    {
      title: "Men",
      items: [
        "Men's T-Shirts",
        "Men's Shirts",
        "Men's Polo",
        "Men's Jeans",
        "Men's Panjabi & Kurta",
        "Men's Jackets",
      ],
    },
    {
      title: "Women",
      items: [
        "Women's Saree",
        "Women's Dresses",
        "Women's Kurti & Tops",
        "Women's Hijab & Abaya",
        "Women's Winter Collection",
      ],
    },
    {
      title: "Accessories",
      items: ["Watches", "Sunglasses", "Wallets", "Belts", "Jewellery"],
    },
    {
      title: "Electronics & Home",
      items: [
        "Electronics",
        "Mobile Accessories",
        "Home Decor",
        "Kitchen Essentials",
        "Gift Items",
      ],
    },
  ];

  return (
    <footer className="bg-black text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Biborton Fashion Worlds Footer
      </h2>

      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        {/* TOP UTILITY BAR */}
        <div className="grid gap-5 border-b border-white/15 py-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <Link href="/malls">
            <UtilityItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-5.1 7-12a7 7 0 1 0-14 0c0 6.9 7 12 7 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
              title="Find a Store"
              subtitle="Choose Your Store"
            />
          </Link>

          <a
            href="https://api.whatsapp.com/send?phone=8801404403596"
            target="_blank"
            rel="noopener noreferrer"
          >
            <UtilityItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
              }
              title="Customer Service Chat"
              subtitle="24/7 Live Support"
            />
          </a>

          <UtilityItem
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="3"
                  y="4"
                  width="18"
                  height="16"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M7 8h10M7 12h10M7 16h6"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            }
            title="Get the App"
            subtitle="Download Now"
          />

          <Link href="/login">
            <UtilityItem
              icon={
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 2h8v20H8V2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <path d="M11 18h2" stroke="currentColor" strokeWidth="2" />
                </svg>
              }
              title="Get Biborton Texts"
              subtitle="Sign up Now"
            />
          </Link>

          <UtilityItem
            icon={
              <svg width="20" height="18" viewBox="0 0 24 24" fill="none">
                <rect
                  x="2"
                  y="5"
                  width="20"
                  height="14"
                  rx="2"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M2 10h20M6 15h5"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            }
            title="Secure Payments"
            subtitle="100% Safe Checkout"
          />
        </div>

        {/* MAIN FOOTER */}
        <div className="grid gap-10 border-b border-white/25 py-7 lg:grid-cols-[1.05fr_0.9fr_0.95fr_0.9fr_1.35fr]">
          {/* Shop Men */}
          <nav className="flex flex-col" aria-label="Shop Men">
            <FooterTitle>Shop Men</FooterTitle>

            <LinkItem to={categoryHref("Men's T-Shirts")}>
              Men's T-Shirts
            </LinkItem>

            <LinkItem to={categoryHref("Men's Shirts")}>Men's Shirts</LinkItem>

            <LinkItem to={categoryHref("Men's Polo")}>Men's Polo</LinkItem>

            <LinkItem to={categoryHref("Men's Jeans")}>Men's Jeans</LinkItem>

            <LinkItem to={categoryHref("Men's Pants & Trousers")}>
              Men's Pants & Trousers
            </LinkItem>

            <LinkItem to={categoryHref("Men's Panjabi & Kurta")}>
              Men's Panjabi & Kurta
            </LinkItem>

            <LinkItem to={categoryHref("Men's Jackets")}>
              Men's Jackets
            </LinkItem>

            <LinkItem to={categoryHref("Men's Hoodies & Sweatshirts")}>
              Men's Hoodies & Sweatshirts
            </LinkItem>

            <LinkItem to={categoryHref("Footwear")}>Footwear</LinkItem>
          </nav>

          {/* Shop Women */}
          <nav className="flex flex-col" aria-label="Shop Women">
            <FooterTitle>Shop Women</FooterTitle>

            <LinkItem to={categoryHref("Women's Saree")}>
              Women's Saree
            </LinkItem>

            <LinkItem to={categoryHref("Women's Salwar Kameez")}>
              Women's Salwar Kameez
            </LinkItem>

            <LinkItem to={categoryHref("Women's Kurti & Tops")}>
              Women's Kurti & Tops
            </LinkItem>

            <LinkItem to={categoryHref("Women's Dresses")}>
              Women's Dresses
            </LinkItem>

            <LinkItem to={categoryHref("Women's Gown")}>Women's Gown</LinkItem>

            <LinkItem to={categoryHref("Women's Jeans & Pants")}>
              Women's Jeans & Pants
            </LinkItem>

            <LinkItem to={categoryHref("Women's Skirts")}>
              Women's Skirts
            </LinkItem>

            <LinkItem to={categoryHref("Women's Hijab & Abaya")}>
              Women's Hijab & Abaya
            </LinkItem>

            <LinkItem to={categoryHref("Women's Winter Collection")}>
              Women's Winter Collection
            </LinkItem>
          </nav>

          {/* Accessories & Electronics */}
          <nav className="flex flex-col" aria-label="Accessories">
            <FooterTitle>Accessories</FooterTitle>

            <LinkItem to={categoryHref("Watches")}>Watches</LinkItem>

            <LinkItem to={categoryHref("Sunglasses")}>Sunglasses</LinkItem>

            <LinkItem to={categoryHref("Wallets")}>Wallets</LinkItem>

            <LinkItem to={categoryHref("Belts")}>Belts</LinkItem>

            <LinkItem to={categoryHref("Bags & Backpacks")}>
              Bags & Backpacks
            </LinkItem>

            <LinkItem to={categoryHref("Jewellery")}>Jewellery</LinkItem>

            <LinkItem to={categoryHref("Electronics")}>Electronics</LinkItem>

            <LinkItem to={categoryHref("Mobile Accessories")}>
              Mobile Accessories
            </LinkItem>

            <LinkItem to={categoryHref("Smart Gadgets")}>
              Smart Gadgets
            </LinkItem>
          </nav>

          {/* Help */}
          <nav className="flex flex-col" aria-label="Help">
            <FooterTitle>Help</FooterTitle>

            <LinkItem to="/contact">Contact Us</LinkItem>

            <LinkItem to="/refund">Returns & Exchanges</LinkItem>

            <LinkItem to="/shippingPolicy">Shipping Policy</LinkItem>

            <LinkItem to="/terms">Terms & Conditions</LinkItem>

            <LinkItem to="/privacyPolicy">Privacy Policy</LinkItem>

            <LinkItem to="/customerDashboard">Order Tracking</LinkItem>

            <LinkItem to="/malls">Store Locations</LinkItem>

            <LinkItem to="/shop">New Arrivals</LinkItem>

            <LinkItem to="/shop">Best Sellers</LinkItem>
          </nav>

          {/* Signup */}
          <div className="lg:pl-2">
            <h3 className="max-w-[320px] font-serif text-[24px] font-bold leading-[1.1] text-white sm:text-[28px]">
              We Belong to Something Beautiful
            </h3>

            <form className="mt-20 max-w-[290px] sm:mt-16">
              <label className="mb-2 block text-[12px] font-bold">
                Sign me up for texts from Biborton
              </label>

              <div className="flex gap-3">
                <input
                  type="tel"
                  placeholder="Mobile Phone Number"
                  className="h-8 flex-1 rounded-sm bg-white px-3 text-[12px] text-black outline-none"
                />

                <button
                  type="button"
                  className="h-8 rounded-full border border-white px-5 text-[12px] font-bold text-white transition hover:bg-white hover:text-black"
                >
                  Continue
                </button>
              </div>
            </form>

            <form className="mt-6 max-w-[290px]">
              <label className="mb-2 block text-[12px] font-bold">
                Sign up for Biborton Emails
              </label>

              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="h-8 flex-1 rounded-sm bg-white px-3 text-[12px] text-black outline-none"
                />

                <button
                  type="button"
                  className="h-8 rounded-full border border-white px-5 text-[12px] font-bold text-white transition hover:bg-white hover:text-black"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col gap-8 py-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold text-white/80">
              © {year} Biborton Fashion World. All rights reserved.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold text-white/80">
              <Link href="/privacyPolicy" className="hover:text-white">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-white">
                Terms of Use
              </Link>

              <Link href="/sitemap" className="hover:text-white">
                Sitemap
              </Link>

              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>

            <p className="mt-3 text-[11px] font-semibold text-white/80">
              +880 1404 403965
            </p>
          </div>

          {/* SOCIALS */}
          <div className="flex flex-wrap items-center gap-3">
            <SocialIcon
              href="https://www.instagram.com/biborton.shop/"
              ariaLabel="Instagram"
            >
              <svg
                viewBox="0 0 448 512"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6C36.8 358.5 39.4 288.5 39.4 256s-2.6-102.5 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.5-8 132z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.facebook.com/biborton.shop/"
              ariaLabel="Facebook"
            >
              <svg
                viewBox="0 0 320 512"
                width="16"
                height="18"
                fill="currentColor"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0C152.14 0 104.11 44.38 104.11 124.72v70.62H22.89V288h81.22v224h100.34V288z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.youtube.com/@bibortonshop"
              ariaLabel="YouTube"
            >
              <svg
                viewBox="0 0 576 512"
                width="20"
                height="18"
                fill="currentColor"
              >
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.1 337.6V175.2l142.7 81.2-142.7 81.2z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.tiktok.com/@bibortonshop"
              ariaLabel="TikTok"
            >
              <svg
                viewBox="0 0 448 512"
                width="17"
                height="17"
                fill="currentColor"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.8A132.1 132.1 0 1 1 193.1 217.4v67.1a65 65 0 1 0 45.1 62.1V0h65.4A124.9 124.9 0 0 0 448 147.7z" />
              </svg>
            </SocialIcon>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
