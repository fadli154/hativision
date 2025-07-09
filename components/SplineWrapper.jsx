"use client";
import { useRef, useEffect } from "react";

// ⛔ Hindari dynamic import dari `@splinetool/react-spline` langsung
export default function SplineWrapper({ scene, className }) {
  const ref = useRef();

  useEffect(() => {
    (async () => {
      const mod = await import("@splinetool/react-spline/dist/react-spline.js");
      const Spline = mod.default || mod; // Aman untuk ESModule
      if (ref.current) {
        const el = document.createElement("div");
        el.className = className;
        ref.current.appendChild(el);
        const App = () => <Spline scene={scene} />;
        const { createRoot } = await import("react-dom/client");
        createRoot(el).render(<App />);
      }
    })();
  }, [scene, className]);

  return <div ref={ref}></div>;
}
