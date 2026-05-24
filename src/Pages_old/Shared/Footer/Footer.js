import React from "react";
import Link from "next/link";

const Footer = () => {
  const year = new Date().getFullYear();

  const LinkItem = ({ to, children }) => (
    <Link
      href={to}
      className="text-[12px] leading-6 font-semibold text-white hover:underline"
    >
      {children}
    </Link>
  );

  const FooterTitle = ({ children }) => (
    <h3 className="mb-2 text-[13px] font-bold text-white">{children}</h3>
  );

  const SocialIcon = ({ href, ariaLabel, children }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex h-6 w-6 items-center justify-center text-white transition hover:opacity-70"
    >
      {children}
    </a>
  );

  const UtilityItem = ({ icon, title, subtitle }) => (
    <div className="flex items-start gap-2 text-white">
      <div className="mt-0.5 text-white">{icon}</div>
      <div>
        <p className="text-[11px] font-bold leading-tight">{title}</p>
        <p className="text-[10px] font-semibold leading-tight">{subtitle}</p>
      </div>
    </div>
  );

  return (
    <footer className="bg-black text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        MYNT Beauty and Fragrances Footer
      </h2>

      <div className="mx-auto container px-4 sm:px-6 lg:px-0">
        {/* TOP UTILITY BAR */}
        <div className="grid gap-5 border-b border-white/25 py-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <Link href={"/malls"}>
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
              subtitle=" "
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

          <Link href={"/login"}>
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
              title="Get MYNT Texts"
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
            title="MYNT Credit Card Program"
            subtitle="Want % off your order? DETAILS"
          />
        </div>

        {/* MAIN FOOTER */}
        <div className="grid gap-10 border-b border-white/25 py-7 lg:grid-cols-[1.05fr_0.9fr_0.95fr_0.9fr_1.35fr]">
          {/* About */}
          <nav className="flex flex-col" aria-label="About MYNT">
            <FooterTitle>About MYNT</FooterTitle>
            <LinkItem to="/about">About MYNT</LinkItem>
            <LinkItem to="/">Newsroom</LinkItem>
            <LinkItem to="https://www.linkedin.com/company/gvibd/?originalSubdomain=bd">
              Careers
            </LinkItem>
            <LinkItem to="/">MYNT Values</LinkItem>
            <LinkItem to="/">Supply Chain Transparency</LinkItem>
            <LinkItem to="/">Affiliates</LinkItem>
            <LinkItem to="/">MYNT Events</LinkItem>
            <LinkItem to="/">Gift Cards</LinkItem>
            <LinkItem to="/">MYNT Global Sites</LinkItem>
            <LinkItem to="/">Diversity, Equity & Inclusion</LinkItem>
            <LinkItem to="/">Beauty Re(Purposed)</LinkItem>
            <LinkItem to="/contact">Report a Vulnerability</LinkItem>
          </nav>

          {/* My MYNT */}
          <nav className="flex flex-col" aria-label="My MYNT">
            <FooterTitle>My MYNT</FooterTitle>
            <LinkItem to="/beauty-insider">Beauty Insider</LinkItem>
            <LinkItem to="/customerDashboard">MYNT order Card</LinkItem>
            <LinkItem to="https://www.facebook.com/themynt.shop">
              Community Profile
            </LinkItem>
            <LinkItem to="/customerDashboard">Order Status</LinkItem>
            <LinkItem to="/customerDashboard">Purchase History</LinkItem>
            <LinkItem to="/customerDashboardt">Account Settings</LinkItem>
            <LinkItem to="/malls">Beauty Services & Store Events</LinkItem>
            <LinkItem to="/">Auto-Replenish</LinkItem>
            <LinkItem to="/">Beauty Offers</LinkItem>
            <LinkItem to="/">Rewards Bazaar</LinkItem>
            <LinkItem to="/">Loves</LinkItem>
            <LinkItem to="/malls">Shop Your Store</LinkItem>
            <LinkItem to="/shop">Shop Same-Day Delivery</LinkItem>
          </nav>

          {/* Help */}
          <nav className="flex flex-col" aria-label="Help">
            <FooterTitle>Help</FooterTitle>
            <LinkItem to="https://api.whatsapp.com/send?phone=8801404403596">
              Customer Service
            </LinkItem>
            <LinkItem to="/refund">Returns & Exchanges</LinkItem>
            <LinkItem to="/">Delivery and Pickup Options</LinkItem>
            <LinkItem to="/shippingPolicy">Shipping</LinkItem>
            <LinkItem to="/">Billing</LinkItem>
            <LinkItem to="/">International Shipments</LinkItem>
            <LinkItem to="/">Buying Guides</LinkItem>
            <LinkItem to="/contact">Beauty Services FAQ</LinkItem>
            <LinkItem to="/malls">Store Locations</LinkItem>
            <LinkItem to="/">Flexible Payments</LinkItem>
            <LinkItem to="/">Accessibility</LinkItem>
            <LinkItem to="/">Teen Skincare Resource</LinkItem>
          </nav>

          {/* Region */}
          <div>
            <FooterTitle>Region & Language</FooterTitle>
            <div className="flex flex-col gap-3 text-[12px] font-semibold">
              <p>✓ 🇧🇩 Bangladesh - English</p>
              <p>🇺🇸 United States - English</p>
              <p>🇨🇦 Canada - English</p>
            </div>
          </div>

          {/* Signup */}
          <div className="lg:pl-2">
            <h3 className="max-w-[320px] font-serif text-[24px] font-bold leading-[1.1] text-white sm:text-[28px]">
              We Belong to Something Beautiful
            </h3>

            <form className="mt-20 max-w-[290px] sm:mt-16">
              <label className="mb-2 block text-[12px] font-bold">
                Sign me up for texts from MYNT
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
                Sign up for MYNT Emails
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
        <div className="flex flex-col gap-7 py-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-[11px] font-semibold">
              © {year} MYNT Beauty & Fragrances. All rights reserved.
            </p>

            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-semibold">
              <Link href="/privacyPolicy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:underline">
                Terms of Use
              </Link>
              <Link href="/" className="hover:underline">
                Accessibility
              </Link>
              <Link href="/sitemap" className="hover:underline">
                Sitemap
              </Link>
              <Link href="/" className="hover:underline">
                Your Privacy Choices
              </Link>
            </div>

            <p className="mt-2 text-[11px] font-semibold">+880 1404 403965</p>
          </div>

          <div className="flex flex-wrap items-center gap-5">
            <SocialIcon
              href="https://www.instagram.com/themynt.shop/"
              ariaLabel="Instagram"
            >
              <svg
                viewBox="0 0 448 512"
                width="19"
                height="19"
                fill="currentColor"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6C36.8 358.5 39.4 288.5 39.4 256s-2.6-102.5 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.5-8 132z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.facebook.com/themynt.shop/"
              ariaLabel="Facebook"
            >
              <svg
                viewBox="0 0 320 512"
                width="16"
                height="19"
                fill="currentColor"
              >
                <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06H297V6.26S260.43 0 225.36 0C152.14 0 104.11 44.38 104.11 124.72v70.62H22.89V288h81.22v224h100.34V288z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.youtube.com/@themyntshop"
              ariaLabel="YouTube"
            >
              <svg
                viewBox="0 0 576 512"
                width="21"
                height="19"
                fill="currentColor"
              >
                <path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6C14.9 167 14.9 256.4 14.9 256.4s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.1 337.6V175.2l142.7 81.2-142.7 81.2z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.tiktok.com/@themyntshop"
              ariaLabel="TikTok"
            >
              <svg
                viewBox="0 0 448 512"
                width="17"
                height="19"
                fill="currentColor"
              >
                <path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.2v178.8A132.1 132.1 0 1 1 193.1 217.4v67.1a65 65 0 1 0 45.1 62.1V0h65.4A124.9 124.9 0 0 0 448 147.7z" />
              </svg>
            </SocialIcon>

            {/* X (Twitter) */}
            <SocialIcon href="/" ariaLabel="X (Twitter)">
              <svg
                viewBox="0 0 512 512"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M389.2 48h70.6L305.6 224.2 486.4 464H345.3L231.6 318.6 97.2 464H26.5l164.7-188.3L16 48h145.9l103.6 133.3L389.2 48zm-24.8 373.8h39.1L140.7 86.1h-42l265.7 335.7z" />
              </svg>
            </SocialIcon>

            {/* Pinterest */}
            <SocialIcon href="/" ariaLabel="Pinterest">
              <svg
                viewBox="0 0 496 512"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M248 8C111 8 0 119 0 256c0 100 58 186 142 225-2-19-4-49 1-70 5-19 32-123 32-123s-8-16-8-40c0-38 22-66 49-66 23 0 34 17 34 37 0 23-15 57-23 88-7 26 13 47 39 47 47 0 79-60 79-131 0-54-36-94-101-94-73 0-118 55-118 115 0 21 6 35 15 46 4 5 5 7 3 13-1 4-4 15-5 19-2 6-6 8-11 6-31-13-45-49-45-90 0-67 57-147 168-147 90 0 149 65 149 134 0 92-51 161-126 161-25 0-49-13-57-28l-15 57c-5 20-15 45-23 62 20 6 41 9 63 9 137 0 248-111 248-248S385 8 248 8z" />
              </svg>
            </SocialIcon>

            {/* Snapchat */}
            {/* <SocialIcon
              href="https://www.snapchat.com/add/themyntshop"
              ariaLabel="Snapchat"
            >
              <svg
                viewBox="0 0 448 512"
                width="18"
                height="18"
                fill="currentColor"
              >
                <path d="M224 0c70.7 0 128 57.3 128 128v64c0 23.6 13.6 45.1 34.9 55.4 10.2 4.9 11.5 19.1 1.8 25.9-9.3 6.5-21.6 10.4-35.3 11.6-4.2 28.4-23.7 52.5-50.7 63.4-8.4 3.4-14.7 10.8-17 19.8-2.3 9-10.3 15.3-19.6 15.3h-44.2c-9.3 0-17.3-6.3-19.6-15.3-2.3-9-8.6-16.4-17-19.8-27-10.9-46.5-35-50.7-63.4-13.7-1.2-26-5.1-35.3-11.6-9.7-6.8-8.4-21 1.8-25.9C82.4 237.1 96 215.6 96 192v-64C96 57.3 153.3 0 224 0z" />
              </svg>
            </SocialIcon> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
