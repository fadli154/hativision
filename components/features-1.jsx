"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Card, CardContent, CardHeader, CardDecorator } from "@/components/ui/card";
import { Smile, Mic, Heart } from "lucide-react";

export default function Features() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8" data-aos="fade-up">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Fitur Unggulan <span className="text-purple-500">hatiVision</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">Solusi cerdas berbasis AI untuk menemani dan memahami emosimu.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Smile className="size-7 text-purple-500 drop-shadow" />}
            title="Deteksi Ekspresi Wajah"
            desc="Kenali dan analisis ekspresi wajah untuk mengetahui emosi secara real-time melalui gambar yang diunggah."
            delay={0}
          />
          <FeatureCard icon={<Mic className="size-7 text-green-500 drop-shadow" />} title="Voice AI untuk Dzikir" desc="Mendengarkan dan membimbing dzikir harianmu dengan suara lembut dan tenang melalui kecerdasan buatan." delay={150} />
          <FeatureCard
            icon={<Heart className="size-7 text-rose-500 drop-shadow" />}
            title="Voice AI untuk Curhat"
            desc="Teman bercerita yang siap mendengarkan tanpa menghakimi, kapan pun kamu butuh tempat untuk mencurahkan isi hati."
            delay={300}
          />
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
