import React from "react";
import { Mail, Phone, MessageCircle, Globe, Users } from "lucide-react";

export default function ContactUs() {
  return (
    <div className=" bg-white px-4 py-12 flex items-center justify-center mt-10 md:mt-0">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800">
            Contact Us
          </h2>
          <p className="text-gray-500 text-sm mt-2">
            We'd love to hear from you. Reach out anytime.
          </p>
        </div>

        
        <div className="flex flex-col md:flex-row flex-wrap gap-8">
          {/* Email */}
          <div className="flex items-start gap-4 group">
            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition">
              <Mail size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Email</p>
              <a
                href="mailto:info@themynt.shop"
                className="text-gray-800 text-sm hover:underline"
              >
                info@themynt.shop
              </a>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-start gap-4 group">
            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition">
              <Phone size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Phone</p>
              <a
                href="tel:+09613160160"
                className="text-gray-800 text-sm hover:underline"
              >
                +09613160160
              </a>
            </div>
          </div>

          {/* International */}
          <div className="flex items-start gap-4 group">
            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition">
              <Globe size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">International</p>
              <a
                href="mailto:imtiazazhz@gmail.com"
                className="text-gray-800 text-sm hover:underline"
              >
                imtiazazhz@gmail.com
              </a>
            </div>
          </div>

          {/* Influencers */}
          <div className="flex items-start gap-4 group">
            <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition">
              <Users size={18} className="text-gray-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Influencers</p>
              <a
                href="mailto:niloygvi@gmail.com"
                className="text-gray-800 text-sm hover:underline"
              >
                niloygvi@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* WhatsApp Button */}
        <div className="flex justify-center mt-12">
          <a
            href="https://wa.me/8801404403965"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 text-white px-8 py-3 rounded-full font-medium hover:bg-green-600 transition"
          >
            <MessageCircle size={18} />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}