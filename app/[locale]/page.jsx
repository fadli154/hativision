import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team";
import VoiceAI from "@/components/VoiceAI";
import ChatVoiceAI from "@/components/ChatVoiceAI";
import VoiceConversation from "@/components/VoiceConversation";

// ✅ Tambahkan ini
export async function generateStaticParams() {
  return [{ locale: "en" }, { locale: "id" }];
}

// ✅ Akses param `locale` jika diperlukan
export default function Home({ params }) {
  // contoh kalau mau akses locale
  const { locale } = params;

  return (
    <>
      <HeroSection />
      <section id="voiceai" className="py-20 mt-5 sm:mt-10 bg-zinc-50 dark:bg-violet-950/20">
        <VoiceAI />
      </section>
      <section id="conversation">
        <VoiceConversation />
      </section>
      <section id="chat">
        <ChatVoiceAI />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="team">
        <TeamSection />
      </section>
      <FooterSection />
    </>
  );
}
