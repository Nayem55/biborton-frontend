import React from "react";
import img from "../Images/location.png";

const Malls = () => {
  const mallData = [
    {
      name: "Bashundhara City",
      address: "Shop# 46 , Level 03 , Block - B , Panthapath",
      phone: "01965-006000",
      link: "https://www.google.com/maps/search/Flormar+near+Bashundhara+City+Parking+Entrance,+Dhaka/@23.776121,90.3499735,13z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "Bashundhara City",
      address: "Shop# 93 , Block C , Level 1 , Panthapath",
      phone: "01404-403380",
      link: "",
    },
    {
      name: "Bashundhara City",
      address: "Shop# 19 , Block C , Level 1 , Panthapath",
      phone: "",
      link: "",
    },
    {
      name: "SHIMANTO SQUARE",
      address: "Shop 101-102 , 1st Floor , Dhanmondi - 2",
      phone: "01404-403713",
      link: "https://www.google.com/maps/search/Flormar+near+Shimanto+Shambhar+Mosque,+Dhaka/@23.7475722,90.3724548,15z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "SHAPTAK SQUARE",
      address: "Shop 05 , Ground Floor , Road# 27 , Dhanmondi",
      phone: "01404-403868",
      link: "https://www.google.com/maps/search/Flormar+near+Shaptak+Marjan,+Dhaka/@23.7476108,90.3724548,15z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "TAJMAHAL RD, MOHAMMADPUR",
      address: "Shop 15 , Mohammadpur Girls School Market",
      phone: "01404-403864",
      link: "https://www.google.com/maps/search/Flormar+near+Tajmahal+Road,+Dhaka/@23.7476494,90.3724548,15z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "ADABOR MOHAMMADPUR",
      address: "Shop 28 , Shahbuddin Plaza , Adabor , Mohammadpur",
      phone: "01404-403862",
      link: "https://www.google.com/maps/place/Flormar+(+Adabor+)/@23.7693284,90.3533158,17z/data=!3m2!4b1!5s0x3755c0a22cf2fc31:0x2af35ea46df7de4d!4m6!3m5!1s0x3755c1180bba23b7:0x668cf92a1cb09900!8m2!3d23.7693236!4d90.3581867!16s%2Fg%2F11slg0jyh8?entry=ttu",
    },
    {
      name: "WARI",
      address: "15/2 Rankin Street Wari Dhaka",
      phone: "01404403374",
      link: "",
    },
    {
      name: "BAILY ROAD",
      address: "Shop 19, 1st Floor, Capital Siraj Center, Dhaka.",
      phone: "01404-403733",
      link: "https://www.google.com/maps/place/Flormar+(+Baily+Road+)/@23.7417084,90.4079589,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b93afd555a1d:0x2e894faf12017e1c!8m2!3d23.7417035!4d90.4105338!16s%2Fg%2F11q56xqv65?entry=ttu",
    },
    {
      name: "KHILGAON",
      address: "Block C, House 929, Taltola",
      phone: "01404-403929",
      link: "https://www.google.com/maps/search/Flormar+near+Khilgaon,+Dhaka/@23.776121,90.3499735,13z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "BANANI",
      address: "House 70/D , Block - D , Road# 11 , Banani",
      phone: "01941-007000",
      link: "https://www.google.com/maps/search/Flormar+near+Banani,+Dhaka/@23.7858951,90.4057574,16z/data=!3m1!4b1?entry=ttu",
    },
    {
      name: "GULSHAN PINK CITY",
      address: "Shop# 1/1 , Ground Floor , Gulshan - 2",
      phone: "019430-04000",
      link: "https://www.google.com/maps/place/FLORMAR/@23.7923868,90.4132569,17z/data=!3m2!4b1!5s0x3755cc78b2afa60d:0x403f978d6e797938!4m6!3m5!1s0x3755c7d8c0fd5351:0xc5f9cac1a785af9b!8m2!3d23.7923819!4d90.4158318!16s%2Fg%2F11j2c9v8_l?entry=ttu",
    },
    {
      name: "JAMUNA FUTURE PARK (JFP)",
      address: "Shop GA-045B , Ground Floor , Near West Court",
      phone: "01404-403796",
      link: "https://www.google.com/maps/place/Flormar+(+Jamuna+Future+Park+)/@23.8133749,90.4192885,17z/data=!3m2!4b1!5s0x3755c64d15cb6a85:0x62398e338e585efb!4m6!3m5!1s0x3755c767129df207:0x96167402b51abc1e!8m2!3d23.8133701!4d90.4241594!16s%2Fg%2F11rvjnsq4z?entry=ttu",
    },
    {
      name: "UTTARA",
      address: "Nigar Plaza, Shop G-12 , Sector 03 , Rd 02 , Uttara",
      phone: "01404403329",
      link: "https://www.google.com/maps/place/Flormar+(Uttara)/@23.8068681,90.3087722,12z/data=!4m10!1m2!2m1!1sFlormar+near+Uttara,+Dhaka!3m6!1s0x3755c512ccd71b3b:0xd031d2ddf2038cc0!8m2!3d23.8641578!4d90.3993211!15sChpGbG9ybWFyIG5lYXIgVXR0YXJhLCBEaGFrYSIDiAEBWhsiGWZsb3JtYXIgbmVhciB1dHRhcmEgZGhha2GSAQ9jb3NtZXRpY3Nfc3RvcmXgAQA!16s%2Fg%2F11l5f48j53?entry=ttu",
    },
    {
      name: "MIRPUR",
      address:
        "Nur Islam Mollah Avenue, Shop# 05, Ground Floor, Sujat Nagar, Mirpur-12",
      phone: "01404403332",
      link: "https://www.google.com/maps/place/Flormar+(Mirpur+12)/@23.8279667,90.361291,17z/data=!3m1!4b1!4m6!3m5!1s0x3755c1c4139c2f95:0xd7e34cab407268ac!8m2!3d23.8279618!4d90.3638659!16s%2Fg%2F11vqll_sm8?entry=ttu",
    },
    {
      name: "MIRPUR-2",
      address: "Mirpur Shoping Center, Shop#141, Ground Floor",
      phone: "01404403686",
      link: "",
    },
    {
      name: "CHATTOGRAM",
      address: "Shop 204, Level 02, 2 No Gate, 5 CDA Avenue, Finlay Square",
      phone: "01928-005000",
      link: "https://www.google.com/maps/place/Flormar+CTG+Mono+Outlet/@22.3617542,91.8116471,17z/data=!3m1!4b1!4m6!3m5!1s0x30acd9cc359755c1:0x4bd857ab4b6cfa87!8m2!3d22.3617493!4d91.816518!16s%2Fg%2F11k2b2qwh1?entry=ttu",
    },
    {
      name: "CHATTOGRAM",
      address: "Shop# 227, 2nd floor, Kohinoor City, 344 Mohammad Ali Road, Dampara, Chattogram-4000",
      phone: "01404403361",
      link: "",
    },
    {
      name: "NARAYANGANJ",
      address: "Shop 111, Ground Floor, Almas Point Shopping Complex",
      phone: "01404-403681",
      link: "https://www.google.com/maps/place/Almas+Point+Shopping+Complex/@23.6151926,90.498892,17z/data=!3m1!4b1!4m6!3m5!1s0x3755b1007f89c655:0xfef1712dce798eb4!8m2!3d23.6151877!4d90.5014669!16s%2Fg%2F11lz3fxj_t?entry=ttu",
    },
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <div className="bg-[#F7F7F7]">
        <div className="mx-auto w-[92%] sm:w-[85%] lg:w-[75%] 2xl:w-[65%] py-10 sm:py-16">
          <p className="text-center text-2xl sm:text-5xl font-bold tracking-tight text-black">
            Our Shop Locations
          </p>
          <p className="mt-3 text-center text-sm sm:text-base text-black/60">
            Find your nearest outlet and get directions instantly.
          </p>
        </div>
      </div>

      {/* GRID */}
      <div className="mx-auto w-[92%] sm:w-[85%] lg:w-[75%] 2xl:w-[65%] py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-6">
          {mallData.map((mall, index) => {
            const hasLink = Boolean(mall.link);

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-black/5 bg-black shadow-[0_10px_24px_rgba(0,0,0,0.10)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(0,0,0,0.16)]"
              >
                {/* subtle premium glow */}
                <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-white/[0.06] blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="p-5 sm:p-7">
                  <p className="text-xs font-semibold tracking-[0.28em] text-white/60 uppercase">
                    Outlet
                  </p>

                  <p className="mt-2 text-lg sm:text-xl font-bold tracking-tight text-white">
                    {mall.name}
                  </p>

                  <p className="mt-2 text-sm leading-relaxed text-white/75">
                    {mall.address}
                  </p>

                  {mall.phone ? (
                    <a
                      href={`tel:${mall.phone.replace(/\s/g, "")}`}
                      className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 transition hover:bg-white hover:text-black"
                    >
                      <span className="text-white/60 group-hover:text-black/60">
                        Call
                      </span>
                      <span className="tracking-wide">{mall.phone}</span>
                    </a>
                  ) : (
                    <p className="mt-4 text-sm text-white/40">Phone not available</p>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <a
                      href={hasLink ? mall.link : undefined}
                      target={hasLink ? "_blank" : undefined}
                      rel={hasLink ? "noreferrer" : undefined}
                      className={[
                        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] font-semibold tracking-[0.24em] transition",
                        hasLink
                          ? "bg-primary text-black hover:opacity-90"
                          : "bg-white/10 text-white/40 cursor-not-allowed",
                      ].join(" ")}
                      aria-disabled={!hasLink}
                      onClick={(e) => {
                        if (!hasLink) e.preventDefault();
                      }}
                    >
                      <span>MAP</span>
                    </a>

                    <button
                      type="button"
                      className={[
                        "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
                        hasLink
                          ? "border-white/15 bg-white/5 hover:bg-white hover:border-white/30"
                          : "border-white/10 bg-white/5 opacity-40 cursor-not-allowed",
                      ].join(" ")}
                      onClick={() => {
                        if (hasLink) window.open(mall.link, "_blank", "noopener,noreferrer");
                      }}
                      disabled={!hasLink}
                      aria-label="Open in Google Maps"
                    >
                      <img src={img} alt="Location" className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* bottom accent line */}
                <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Malls;
