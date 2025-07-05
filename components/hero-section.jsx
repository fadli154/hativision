import React from "react";
import { HeroHeader } from "./header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import SplineClientOnly from "@/components/SplineClientOnly";
import ButtonHero from "./ui/button-hero";
import ImageUploader from "./ImageUploader";

export default function HeroSection() {
  const purple_gradiant = "bg-gradient-to-t from-transparent via-purple-800 to-transparent filter blur-[120px]";

  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden min-h-dvh">
        <section>
          <div className="pt-18 lg:pt-30 2xl:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left relative">
                <h1 className="mt-8 max-w-2xl text-slate-700 dark:text-white text-balance text-2xl font-medium md:text-3xl lg:mt-16 xl:text-6xl ">
                  Unggah <span className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-500 text-transparent bg-clip-text">gambar untuk</span> mendeteksi emosi
                </h1>

                <div className="flex justify-center items-center lg:justify-start lg:items-start">
                  <div className="grid grid-cols-2 gap-4 pt-6 w-[calc(100%-0.1rem)] py-4 pb-10 lg:pb-0">
                    <ImageUploader icon="search-image" className="border-red-500/30 hover:shadow-red-500/30 hover:border-red-500/50 " via="via-red-400/20">
                      Unggah Gambar
                    </ImageUploader>
                  </div>
                </div>
                <span className="mt-3 text-xs inline-block text-center text-slate-400 dark:text-slate-300">Dengan mengunggah gambar atau URL, Anda menyetujui kami Ketentuan Penggunaan dan Kebijakan Privasi.</span>
                {/* gradient start */}
                <div className={`absolute z-[0] w-[60%] h-[60%] lg:-right-140 bottom-20 ${purple_gradiant}`} />
                {/* gradient end */}
              </div>
              <SplineClientOnly />
            </div>
          </div>
        </section>
        <section className="bg-background pb-5 pt-20 md:pt-0 ">
          <div className="group relative 2xl:-top-35 top-10 lg:-top-20  m-auto max-w-6xl px-6">
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
      </main>
    </>
  );
}
