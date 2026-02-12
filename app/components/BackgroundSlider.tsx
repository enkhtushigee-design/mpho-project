"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Энд та өөрийн зургуудын замыг солих боломжтой
const images = [
  "/backgrounds/bg1.jpg",
  "/backgrounds/bg2.jpg",
  "/backgrounds/bg3.jpg",
  "/backgrounds/bg4.jpg",
  "/backgrounds/bg5.jpg"
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5 секунд тутамд зураг солигдоно

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-900">
      {/* Харанхуйлах давхарга (Overlay) - Текст уншигдахад тусална */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Next.js Image component ашиглаж байна */}
          <Image
            src={src}
            alt={`Background slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={85}
          />
        </div>
      ))}
    </div>
  );
}