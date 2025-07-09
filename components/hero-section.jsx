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
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

export default function HeroSection() {
  const purple_gradiant = "bg-gradient-to-t from-transparent via-purple-800 to-transparent filter blur-[120px]";
  const [droppedImage, setDroppedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const previewRef = useRef(null);
  const dragCounter = useRef(0);
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  const maxSizeMB = 5;
  const tHero = useTranslations("Hero");

  useEffect(() => {
    const handleDragEndOrDrop = () => {
      setIsDragging(false);
      dragCounter.current = 0;
    };

    window.addEventListener("dragend", handleDragEndOrDrop);
    window.addEventListener("drop", handleDragEndOrDrop);

    return () => {
      window.removeEventListener("dragend", handleDragEndOrDrop);
      window.removeEventListener("drop", handleDragEndOrDrop);
    };
  }, []);

  const validateFile = (file) => {
    if (!allowedTypes.includes(file.type)) {
      alert("Hanya file PNG, JPG, atau JPEG yang diperbolehkan.");
      return false;
    }

    const sizeInMB = file.size / (1024 * 1024);
    if (sizeInMB > maxSizeMB) {
      alert(`Ukuran file terlalu besar. Maksimal ${maxSizeMB}MB.`);
      return false;
    }

    return true;
  };

  const handleManualUpload = (file) => {
    if (!file || !validateFile(file)) return;

    const imageUrl = URL.createObjectURL(file);
    setDroppedImage(imageUrl);

    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !validateFile(file)) return;

    const imageUrl = URL.createObjectURL(file);
    setDroppedImage(imageUrl);

    setTimeout(() => {
      previewRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    dragCounter.current--;
    if (dragCounter.current <= 0) {
      setIsDragging(false);
    }
  };

  return (
    <AOSWrapper>
      {isDragging && (
        <div className="fixed  inset-0 !z-[9999] bg-violet-400/30 border-2 border-dashed border-violet-500 flex justify-center items-center text-2xl font-semibold text-violet-700 pointer-events-none transition-all duration-300 ease-in-out animate-fade-in">
          Lepaskan gambar untuk mengunggah...
        </div>
      )}
      <div id="home">
        <HeroHeader />

        <main className="overflow-hidden min-h-dvh !z-3" onDrop={handleDrop} onDragOver={handleDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave}>
          <section>
            <div className="pt-18 lg:pt-30 2xl:pt-44">
              <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
                <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left relative">
                  <div className="w-full flex justify-center items-center lg:justify-start lg:items-start">
                    <h1
                      className="mt-8 max-w-2xl text-slate-700 dark:text-white text-balance text-3xl font-medium  lg:mt-16 xl:text-6xl lg:leading-[75px] md:text-6xl w-full md:w-full text-center lg:text-start"
                      data-aos="fade-up"
                      data-aos-delay="100"
                    >
                      {tHero("title1")} <span className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-500 text-transparent bg-clip-text block"> {tHero("title2")}</span>
                      {tHero("title3")}
                    </h1>
                  </div>

                  <div className="flex justify-center items-center lg:justify-start lg:items-start relative !z-2">
                    <div className="grid grid-cols-2 gap-4 pt-6 w-[calc(100%-0.1rem)]" data-aos="fade-up" data-aos-delay="300">
                      <ImageUploader icon="search-image" className="border-red-500/30 hover:shadow-red-500/30 hover:border-red-500/50 " via="via-red-400/20" onFileChange={handleManualUpload}>
                        {tHero("button1")}
                      </ImageUploader>
                      <ButtonHero icon="robot" className="border-blue-500/30 hover:shadow-blue-500/30 hover:border-blue-500/50 !z-3" via="via-blue-400/20">
                        {tHero("button2")}
                      </ButtonHero>
                    </div>
                  </div>
                  <span className="mt-3 text-xs inline-block text-center text-slate-400 dark:text-slate-300">{tHero("terms")}</span>
                  {/* gradient start */}
                  <div className={`absolute -z-[2] w-[60%] h-[60%] lg:-right-140 -bottom-30 lg:bottom-20 ${purple_gradiant}`} />
                  {/* gradient end */}
                </div>
                <SplineClientOnly isDragging={isDragging} />
                <div className="flex justify-center items-center pt-15 -z-[1]">
                  <Image src="/img/image-mobile.png" alt="hero" className="w-[60%] h-[60%] md:w-[40%] md:h-[40%] lg:hidden" sizes="100vw" width={40} height={40} data-aos="zoom-in" data-aos-delay="500" priority />
                </div>
              </div>
            </div>
          </section>
          <section className="bg-background pb-10 md:pt-0">
            <div className="group relative 2xl:-top-40 top-10 lg:-top-20  m-auto max-w-6xl px-6">
              <div className="flex flex-col items-center justify-center md:flex-row">
                <div className="relative py-6 md:w-[calc(100%-11rem)]">
                  <InfiniteSlider speed={40} speedOnHover={80} gap={80}>
                    <div className="text-sm md:text-base font-semibold text-center">{tHero("infiniteSlider")}</div>
                    <div className="text-sm md:text-base font-semibold text-center">{tHero("infiniteSlider2")}</div>
                    <div className="text-sm md:text-base font-semibold text-center">{tHero("infiniteSlider3")}</div>
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
            <div ref={previewRef} className="mb-10 mt-5 flex justify-center p-4 relative">
              <div className="relative border rounded-lg shadow-lg max-w-sm w-full">
                {/* Tombol X */}
                <button
                  onClick={() => setDroppedImage(null)}
                  className="absolute -top-3 -right-3 w-7 h-7 flex items-center justify-center rounded-full border border-red-300 bg-white text-red-500 
             shadow-sm hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out
             hover:scale-110 active:scale-95 hover:rotate-12 dark:bg-zinc-900 dark:hover:bg-red-600 cursor-pointer"
                  aria-label="Hapus gambar"
                >
                  <X className="text-lg leading-none font-bold w-4 h-4" />
                </button>

                {/* Gambar Preview */}
                <img src={droppedImage} alt="Preview" className="w-full h-auto object-cover" />
                <div className="p-2 text-center text-sm text-slate-600 dark:text-slate-300">Preview Gambar Anda</div>
              </div>
            </div>
          )}
        </main>
      </div>
    </AOSWrapper>
  );
}
