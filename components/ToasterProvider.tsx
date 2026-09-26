"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 2800,
        style: {
          background: "#161616",
          color: "#fff",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: "14px",
        },
        success: {
          iconTheme: {
            primary: "#ccff00",
            secondary: "#111111",
          },
        },
        error: {
          iconTheme: {
            primary: "#ff5c5c",
            secondary: "#111111",
          },
        },
      }}
    />
  );
}
