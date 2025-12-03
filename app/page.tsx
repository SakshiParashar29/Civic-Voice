import CTA from "@/components/LandingPage/CTA";
import HeroSection from "@/components/LandingPage/HeroSection";
import Navbar from "@/components/LandingPage/Navbar";
import WhyCivicVoice from "@/components/LandingPage/WhyCivicVoice";
import Working from "@/components/LandingPage/Working";

export default function Home() {
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <WhyCivicVoice/>
      <Working/>
      <CTA/>
    </div>
  );
}
