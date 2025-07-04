// components/SplineTest.jsx
"use client";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), { ssr: false });

export default function SplineTest() {
  return (
    <div className="h-[25vh] lg:h-[35vh]">
      <Spline className="absolute lg:-top-20 lg:-right-90 2xl:-right-120 w-full h-full" scene="https://prod.spline.design/nzJuMtRDzNHlcZqO/scene.splinecode" />
    </div>
  );
}
