import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/lib/theme";



const archivoBlack = Archivo_Black({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

const plexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Shazmina Oudeen | Portfolio",
  description: "Frontend developer portfolio",
  other: {
    "color-scheme": "light dark",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", archivoBlack.variable, plexSans.variable)}
    >
      <head>
        {/* Tells mobile browsers (Samsung Internet, some Chrome versions)
            that this site explicitly handles both light and dark mode
            itself - without this, some browsers auto-force-invert colors
            based on the phone's system theme, ignoring the site's own
            toggle entirely. */}
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="min-h-full flex flex-col font-body">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}