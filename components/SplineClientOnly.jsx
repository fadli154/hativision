"use client";

import { useEffect, useState } from "react";

export default function SplineClientOnly() {
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
    <div className="hidden lg:block lg:h-[30vh] w-full bg-transparent dark:bg-transparent">
      {showSpline && (
        <iframe
          className="absolute hidden lg:block opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto lg:-top-22 2xl:-top-30 lg:-right-90 2xl:-right-90 2xl:scale-90 w-full h-full z-1"
          src="https://my.spline.design/greetingrobot-iUu85Ge402EzwmE0W0Dh11WY/"
          allowFullScreen
          style={{
            background: "transparent",
            overflow: "hidden",
            border: "none",
          }}
          {...{ allowtransparency: "true" }}
        />
      )}
    </div>
  );
}
