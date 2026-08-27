import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AllProjectsGrid from "@/components/project/AllProjectsGrid";

export const metadata = {
  title: "All Projects | Shazmina Oudeen",
  description: "Browse all projects.",
};

export default function AllProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-washi dark:bg-ink pt-16 md:pt-20 transition-colors">
        <AllProjectsGrid />
      </main>
      <Footer />
    </>
  );
}