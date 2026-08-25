import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
      <>
      <Preloader />
      <Navbar />
      <main id="top" className="bg-washi dark:bg-ink pt-16 md:pt-20">
        <Hero />
        <About />
        <Skills />
        <Timeline />
        {/* About, Skills, Timeline, Projects, Blog, Contact go here */}
      </main>
      <Footer />
    </>
  );
}