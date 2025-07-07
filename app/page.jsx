import ContentSection from "@/components/content-1";
import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team";
import VoiceAI from "@/components/VoiceAI";
import ChatVoiceAI from "@/components/ChatVoiceAI";
import VoiceConversation from "@/components/VoiceConversation";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="my-12">
        <VoiceAI />
      </section>
      <section className="my-12">
        <VoiceConversation />
      </section>
      <section className="my-12">
        <ChatVoiceAI />
      </section>
      <Features />
      <TeamSection />
      <FooterSection />
    </>
  );
}
