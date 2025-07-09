"use client";

import { useEffect, useState } from "react";

export default function SplineClientOnly({ isDragging }) {
  const [showSpline, setShowSpline] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setShowSpline(window.innerWidth >= 1024);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div className="hidden lg:block lg:h-[30vh] w-full bg-transparent dark:bg-transparent !z-1">
      {showSpline && (
        <iframe
          className={`absolute hidden lg:block lg:opacity-100 lg:-top-22 2xl:-top-30 lg:-right-90 2xl:-right-90 2xl:scale-90 w-full h-full z-1 transition-all duration-200 ${
            isDragging ? "pointer-events-none opacity-50" : "pointer-events-auto"
          }`}
          src="https://my.spline.design/greetingrobot-iUu85Ge402EzwmE0W0Dh11WY/"
          allowFullScreen
          style={{
            background: "transparent",
            overflow: "hidden",
            border: "none",
          }}
          allowtransparency="true"
        />
      )}
    </div>
  );
}
