"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const images = [
  "/bg1.jpg",
  "/bg2.jpg"
];

export default function BackgroundSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-black/60 z-10" />
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={src}
            alt={`Background slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
            quality={90}
          />
        </div>
      ))}
    </div>
  );
}