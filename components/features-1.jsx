import { Card, CardContent, CardHeader, CardDecorator } from "@/components/ui/card";
import { Smile, Mic, Heart } from "lucide-react";

export default function Features() {
  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Fitur Unggulan <span className="text-purple-500">hatiVision</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base">Solusi cerdas berbasis AI untuk menemani dan memahami emosimu.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard icon={<Smile className="size-7 text-purple-500 drop-shadow" />} title="Deteksi Ekspresi Wajah" desc="Kenali dan analisis ekspresi wajah untuk mengetahui emosi secara real-time melalui gambar yang diunggah." />
          <FeatureCard icon={<Mic className="size-7 text-green-500 drop-shadow" />} title="Voice AI untuk Dzikir" desc="Mendengarkan dan membimbing dzikir harianmu dengan suara lembut dan tenang melalui kecerdasan buatan." />
          <FeatureCard icon={<Heart className="size-7 text-rose-500 drop-shadow" />} title="Voice AI untuk Curhat" desc="Teman bercerita yang siap mendengarkan tanpa menghakimi, kapan pun kamu butuh tempat untuk mencurahkan isi hati." />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="group relative overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03]">
      <Card className="h-full bg-white/80 dark:bg-zinc-900/60 backdrop-blur-md border border-zinc-200 dark:border-zinc-700 shadow-lg transition duration-300 ease-in-out transform group-hover:ring-2 group-hover:ring-purple-300">
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
