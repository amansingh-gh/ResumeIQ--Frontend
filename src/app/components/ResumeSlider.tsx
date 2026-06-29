import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const images = [
  "/images/resume1.jpg",
  "/images/resume2.jpg",
  "/images/resume3.jpg",
  "/images/resume4.jpg",
  "/images/resume5.jpg",
  "/images/resume6.jpg",
];

export default function ResumeSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.img
        key={images[current]}
        src={images[current]}
        alt="Resume Preview"
        className="w-full h-full object-cover absolute inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      />
    </AnimatePresence>
  );
}