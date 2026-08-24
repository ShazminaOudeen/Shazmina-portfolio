import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/layout/Navbar";
export default function Home() {
  return (
     <>
      <Preloader />
      <Navbar />
      <main id="top" className="min-h-screen bg-washi dark:bg-ink pt-16 md:pt-20">
        {/* Hero, About, etc. go here - each section needs a matching id, 
            e.g. <section id="about">, <section id="projects"> etc. 
            so the nav links actually scroll to them */}
      </main>
    </>
  );
}