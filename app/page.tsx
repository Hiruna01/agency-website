import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Services } from "@/components/sections/Services";
import { Benefits } from "@/components/sections/Benefits";
import { Portfolio } from "@/components/sections/Portfolio";
import { Process } from "@/components/sections/Process";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <SocialProofBar />
      <Services />
      <Benefits />
      <Portfolio />
      <Process />
      <Pricing />
      <FAQ />
      <FinalCTA />
    </main>
  );
}
