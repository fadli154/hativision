// components/SplineTest.jsx
"use client";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineTest() {
  return (
    <div style={{ height: "30vh" }}>
      <Spline className="absolute -top-20 -right-90 w-full h-full" scene="https://prod.spline.design/ERHD7o0umVk5ESt6/scene.splinecode" />
    </div>
  );
}
