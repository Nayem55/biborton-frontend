"use client";

import { Toaster } from "react-hot-toast";

export default function ClientToaster() {
  return (
    <div>
      <Toaster
      position="top-center"
      containerStyle={{
        top: 20,
        left: "65%",   // 50% থেকে একটু বাড়ালেই right এ যাবে
      }}
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(30, 41, 59, 0.9)", // dark glass effect
          color: "#fff",
          padding: "8px 18px",
          fontSize: "14px",
          backdropFilter: "blur(10px)",
        },
        success: {
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        error: {
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
      }}
    />
    </div>
  );
}