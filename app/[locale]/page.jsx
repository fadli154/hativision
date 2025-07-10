import Features from "@/components/features-1";
import FooterSection from "@/components/footer";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team";
import VoiceAI from "@/components/VoiceAI";
import ChatVoiceAI from "@/components/ChatVoiceAI";
import VoiceConversation from "@/components/VoiceConversation";
import ChatbotUI from "@/components/ChatBotUI";

export default function Home({ params }) {
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
      <ChatbotUI />
      <FooterSection />
    </>
  );
}
