import React from "react";
import { HeroHeader } from "./header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import SplineClientOnly from "@/components/SplineClientOnly";
import ButtonHero from "./ui/button-hero";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden min-h-dvh">
        <section>
          <div className="pt-18 lg:pt-30 2xl:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium md:text-6xl lg:mt-16 xl:text-7xl">HatiVision</h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg">Deteksi Emosi, Temukan Dzikir yang Menenangkan.</p>

                <div className="flex justify-center items-center lg:justify-start lg:items-start">
                  <div className="grid grid-cols-2 gap-4 pt-6 w-[calc(100%-2rem)] lg:w-[calc(80%-1rem)] py-4 pb-10 lg:pb-0">
                    <ButtonHero color="green" icon="mosque">
                      Dzikir Sholat
                    </ButtonHero>
                    <ButtonHero color="red" icon="shield">
                      Ruqyah
                    </ButtonHero>
                    <ButtonHero color="yellow" icon="sun">
                      Dzikir Pagi
                    </ButtonHero>
                    <ButtonHero color="blue" icon="moon">
                      Dzikir Malam
                    </ButtonHero>
                  </div>
                </div>
                <SplineClientOnly />
              </div>
            </div>
          </div>
        </section>
        <section className="bg-background pb-5 pt-20 md:pt-0 md:pb-10">
          <div className="group relative lg:-top-20 m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Powering the best teams</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <img className="mx-auto h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nvidia.svg" alt="Nvidia Logo" height="20" width="auto" />
                  </div>

                  <div className="flex">
                    <img className="mx-auto h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/column.svg" alt="Column Logo" height="16" width="auto" />
                  </div>
                  <div className="flex">
                    <img className="mx-auto h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/github.svg" alt="GitHub Logo" height="16" width="auto" />
                  </div>
                  <div className="flex">
                    <img className="mx-auto h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/nike.svg" alt="Nike Logo" height="20" width="auto" />
                  </div>
                  <div className="flex">
                    <img className="mx-auto h-5 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/lemonsqueezy.svg" alt="Lemon Squeezy Logo" height="20" width="auto" />
                  </div>
                  <div className="flex">
                    <img className="mx-auto h-4 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/laravel.svg" alt="Laravel Logo" height="16" width="auto" />
                  </div>
                  <div className="flex">
                    <img className="mx-auto h-7 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/lilly.svg" alt="Lilly Logo" height="28" width="auto" />
                  </div>

                  <div className="flex">
                    <img className="mx-auto h-6 w-fit dark:invert" src="https://html.tailus.io/blocks/customers/openai.svg" alt="OpenAI Logo" height="24" width="auto" />
                  </div>
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
