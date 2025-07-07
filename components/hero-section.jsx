"use client";

import React from "react";
import { HeroHeader } from "./header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import SplineClientOnly from "@/components/SplineClientOnly";
import ButtonHero from "./ui/button-hero";
import ImageUploader from "./ImageUploader";
import Image from "next/image";
import { useState, useRef } from "react";
import AOSWrapper from "@/components/AOSProvider";

export default function HeroSection() {
  const purple_gradiant = "bg-gradient-to-t from-transparent via-purple-800 to-transparent filter blur-[120px]";
  const [droppedImage, setDroppedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);
  const dropRef = useRef();

  const handleManualUpload = (file) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setDroppedImage(imageUrl);

      // Scroll ke preview
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setDroppedImage(imageUrl);

      // Scroll ke preview setelah 300ms (tunggu render)
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <AOSWrapper>
      <>
        <HeroHeader />
        {isDragging && (
          <div className="fixed inset-0 z-50 bg-violet-400/30 border-2 border-dashed border-violet-500 flex justify-center items-center text-2xl font-semibold text-violet-700 pointer-events-none">Lepaskan gambar untuk mengunggah...</div>
        )}

        <main className="overflow-hidden min-h-dvh" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
          <section>
            <div className="pt-18 lg:pt-30 2xl:pt-44">
              <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left relative">
                  <div className="w-full flex justify-center items-center lg:justify-start lg:items-start">
                    <h1
                      className="mt-8 max-w-2xl text-slate-700 dark:text-white text-balance text-3xl font-medium  lg:mt-16 xl:text-6xl lg:leading-[75px] w-full md:w-[50%] lg:w-full text-center lg:text-start"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      Unggah <span className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-500 text-transparent bg-clip-text">gambar untuk</span> mendeteksi emosi
                    </h1>
                  </div>

                  <div className="flex justify-center items-center lg:justify-start lg:items-start">
                    <div className="grid grid-cols-2 gap-4 pt-6 w-[calc(100%-0.1rem)]" data-aos="fade-up" data-aos-delay="300">
                      <ImageUploader icon="search-image" className="border-red-500/30 hover:shadow-red-500/30 hover:border-red-500/50 " via="via-red-400/20" onFileChange={handleManualUpload}>
                        Unggah Gambar
                      </ImageUploader>
                      <ButtonHero icon="robot" className="border-blue-500/30 hover:shadow-blue-500/30 hover:border-blue-500/50" via="via-blue-400/20">
                        Gunakan AI
                      </ButtonHero>
                    </div>
                  </div>
                  <span className="mt-3 text-xs inline-block text-center text-slate-400 dark:text-slate-300">Dengan mengunggah gambar atau URL, Anda menyetujui kami Ketentuan Penggunaan dan Kebijakan Privasi.</span>
                  {/* gradient start */}
                  <div className={`absolute z-[0] w-[60%] h-[60%] lg:-right-140 -bottom-50 lg:bottom-20 ${purple_gradiant}`} />
                  {/* gradient end */}
                </div>
                <SplineClientOnly />
                <div className="flex justify-center items-center pt-15 -z-[1]">
                  <Image src="/img/image-mobile.png" alt="hero" className="w-[60%] h-[60%] lg:hidden" sizes="100vw" width={40} height={40} data-aos="zoom-in" data-aos-delay="500" />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-background pb-10 md:pt-0 ">
            <div className="group relative 2xl:-top-40 top-10 lg:-top-20  m-auto max-w-6xl px-6">
              <div className="flex flex-col items-center justify-center md:flex-row">
                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                  <InfiniteSlider speed={40} speedOnHover={80} gap={80}>
                    <div className="text-sm md:text-base font-semibold text-center">"Dengan mengingat Allah, hati menjadi tenang." (QS. Ar-Ra’d: 28)</div>
                    <div className="text-sm md:text-base font-semibold text-center">"Dzikir adalah cahaya bagi hati yang gelap."</div>
                    <div className="text-sm md:text-base font-semibold text-center">"Perbanyaklah mengingat Allah, karena itu yang terbaik bagi kalian."</div>
                  </InfiniteSlider>

                  <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                  <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                  <ProgressiveBlur className="pointer-events-none absolute left-0 top-0 h-full w-20" direction="left" blurIntensity={1} />
                  <ProgressiveBlur className="pointer-events-none absolute right-0 top-0 h-full w-20" direction="right" blurIntensity={1} />
                </div>
              </div>
            </div>
          </section>
          {droppedImage && (
            <div ref={previewRef} className="mb-10 flex justify-center p-4 relative">
              <div className="relative border rounded-lg overflow-hidden shadow-lg max-w-sm w-full">
                {/* Tombol X */}
                <button onClick={() => setDroppedImage(null)} className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 rounded-full w-7 h-7 flex items-center justify-center shadow-md transition" aria-label="Hapus gambar">
                  ×
                </button>

                {/* Gambar Preview */}
                <img src={droppedImage} alt="Preview" className="w-full h-auto object-cover" />
                <div className="p-2 text-center text-sm text-slate-600 dark:text-slate-300">Preview Gambar Anda</div>
              </div>
            </div>
          )}
        </main>
      </>
    </AOSWrapper>
  );
}
