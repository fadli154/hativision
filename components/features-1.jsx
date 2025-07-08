"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Card, CardContent, CardHeader, CardDecorator } from "@/components/ui/card";
import { Smile, Mic, Heart } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Features() {
  const tFeature = useTranslations("Feature");

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            {tFeature("title1")} <span className="text-purple-500">{tFeature("title2")}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">{tFeature("description")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<Smile className="size-7 text-purple-500 drop-shadow" />} title={tFeature("feature1")} desc={tFeature("feature1Des")} delay={0} />
          <FeatureCard icon={<Mic className="size-7 text-green-500 drop-shadow" />} title={tFeature("feature2")} desc={tFeature("feature2Des")} delay={150} />
          <FeatureCard icon={<Heart className="size-7 text-rose-500 drop-shadow" />} title={tFeature("feature3")} desc={tFeature("feature3Des")} delay={300} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc, delay = 0 }) {
  return (
    <div className="group relative overflow-hidden transition-all duration-300 ease-out" data-aos="fade-up" data-aos-delay={delay}>
      <Card className="h-full bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 transition duration-300 ease-in-out transform">
        <CardHeader className="pb-4 text-center">
          <CardDecorator>
            <div className="flex items-center justify-center">{icon}</div>
          </CardDecorator>
          <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
        </CardHeader>

        <CardContent className="text-center">
          <p className="text-sm text-muted-foreground">{desc}</p>
        </CardContent>
      </Card>
    </div>
  );
}
