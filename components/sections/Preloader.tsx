 "use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const BOX_COUNT = 5;
const BOX_FILL_DURATION = 0.35;
const BOX_START_DELAY = 0.9;

// Reads the sessionStorage flag once, synchronously, during the initial
// render (not inside useEffect). This avoids a React Strict Mode race in
// development, where effects run twice on mount: if the "should I play?"
// check and the "mark as played" write both lived inside the same effect,
// the first invocation would write the flag, and the second invocation
// (immediately after, part of the same Strict Mode double-run) would then
// read that just-written flag and wrongly decide not to play at all.
function shouldPlayPreloader() {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem("portfolio-preloader-played");
}

export default function Preloader() {
  const [shouldRender] = useState(shouldPlayPreloader);
  const [loading, setLoading] = useState(true);
  const [filledBoxes, setFilledBoxes] = useState(0);
  const [eyesOpen, setEyesOpen] = useState(true);

  useEffect(() => {
    if (!shouldRender) return;

    // Safe to call even if this effect runs twice (Strict Mode) - writing
    // the same value twice has no side effect, unlike the old approach.
    sessionStorage.setItem("portfolio-preloader-played", "true");

    const fillTimers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 0; i < BOX_COUNT; i++) {
      fillTimers.push(
        setTimeout(() => {
          setFilledBoxes(i + 1);
        }, BOX_START_DELAY * 1000 + i * BOX_FILL_DURATION * 1000)
      );
    }
    const exitTimer = setTimeout(() => {
      setLoading(false);
    }, BOX_START_DELAY * 1000 + BOX_COUNT * BOX_FILL_DURATION * 1000 + 500);
    fillTimers.push(exitTimer);

    const closeTimer = setTimeout(() => setEyesOpen(false), 900);
    const openTimer = setTimeout(() => setEyesOpen(true), 1000);

    return () => {
      fillTimers.forEach(clearTimeout);
      clearTimeout(closeTimer);
      clearTimeout(openTimer);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-999 bg-black flex items-center justify-center px-4"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
        >
          <div className="flex flex-col items-center -mt-16 md:-mt-20">
            <motion.div
              className="relative w-80 h-57.5 sm:w-100 sm:h-70 md:w-120 md:h-85 overflow-hidden shrink-0"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <Image
                src="/images/Cat.png"
                alt="Cat mark - eyes open"
                fill
                sizes="(max-width: 768px) 320px, 480px"
                className="object-contain absolute inset-0"
                style={{ opacity: eyesOpen ? 1 : 0, transition: "opacity 0.06s ease" }}
                priority
              />
              <Image
                src="/images/Cat2.png"
                alt="Cat mark - eyes closed"
                fill
                sizes="(max-width: 768px) 320px, 480px"
                className="object-contain absolute inset-0"
                style={{ opacity: eyesOpen ? 0 : 1, transition: "opacity 0.06s ease" }}
                priority
              />
            </motion.div>

            <p className="font-heading text-washi text-lg sm:text-xl md:text-2xl tracking-[0.35em] uppercase text-center -mt-10 md:-mt-12">
              Loading
            </p>

            <div className="flex gap-3 md:gap-4 mt-4">
              {Array.from({ length: BOX_COUNT }).map((_, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 border-2"
                  style={{
                    borderColor: "#C81E3A",
                    backgroundColor: i < filledBoxes ? "#C81E3A" : "#000000",
                  }}
                  animate={{ scale: i < filledBoxes ? [1, 1.15, 1] : 1 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}