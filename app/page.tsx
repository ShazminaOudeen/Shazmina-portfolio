import Preloader from "@/components/sections/Preloader";
import ThemeToggle from "@/components/layout/ThemeToggle";
export default function Home() {
  return (
     <>
      <Preloader />
      <main className="min-h-screen bg-washi dark:bg-ink">
        {/* sections go here */}
      </main>
    </>
  );
}