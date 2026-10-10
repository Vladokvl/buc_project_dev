import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import ProjectsGrid from "@/components/home/ProjectsGrid";
import FlagshipDrop from "@/components/home/FlagshipDrop";
import AboutManifesto from "@/components/home/AboutManifesto";

export default function HomePage() {
  return (
    <div className="min-h-dvh flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectsGrid />
        <FlagshipDrop />
        <AboutManifesto />
      </main>
      <Footer />
    </div>
  );
}
