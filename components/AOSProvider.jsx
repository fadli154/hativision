"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AOSWrapper({ children }) {
  useEffect(() => {
    AOS.init({
      once: true, // animasi hanya terjadi satu kali
      duration: 800,
      easing: "ease-out-cubic",
    });
  }, []);

  return <>{children}</>;
}
