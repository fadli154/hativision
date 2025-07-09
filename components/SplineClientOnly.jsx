"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// ⬇️ Import default langsung, TANPA .then()
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="text-center py-10">Loading 3D...</div>,
});

export default function SplineClientOnly() {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setShowSpline(window.innerWidth >= 1024); // Tailwind breakpoint lg
      };

      handleResize();
      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="hidden lg:block lg:h-[30vh]  w-full">
      {showSpline && (
        <Spline
          className="absolute hidden lg:block opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:-top-22 2xl:-top-30 lg:-right-90 2xl:-right-90 2xl:scale-90 w-full h-full z-1"
          scene="https://prod.spline.design/nzJuMtRDzNHlcZqO/scene.splinecode"
        />
      )}
    </div>
  );
}
