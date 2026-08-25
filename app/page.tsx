import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
export default function Home() {
  return (
      <>
      <Preloader />
      <Navbar />
      <main id="top" className="min-h-screen bg-washi dark:bg-ink pt-16 md:pt-20">
        {/* Hero, About, etc. */}
      </main>
      <Footer />
    </>
  );
}