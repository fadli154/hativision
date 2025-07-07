"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineTest() {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    // Jalankan hanya di client
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setShowSpline(window.innerWidth >= 1024); // Tailwind breakpoint lg = 1024px
      };

      handleResize(); // Cek pertama kali
      window.addEventListener("resize", handleResize); // Update saat resize

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="hidden lg:block lg:h-[30vh]  w-full">
      {showSpline && (
        <Spline
          className="absolute hidden lg:block opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:-top-22 2xl:-top-30 lg:-right-90 2xl:-right-90 2xl:scale-90 w-full h-full !-z-1"
          scene="https://prod.spline.design/nzJuMtRDzNHlcZqO/scene.splinecode"
        />
      )}
    </div>
  );
}
