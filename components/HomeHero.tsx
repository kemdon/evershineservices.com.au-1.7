"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export type HomeHeroSlide = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  image: string;
  cta?: { text: string; url: string } | null;
};

const defaultSlides: HomeHeroSlide[] = [
  {
    id: "cleaning",
    title: "Professional Cleaning Services",
    subtitle: "Spotless Results Every Time",
    description:
      "End of lease, commercial, and residential cleaning with over 10 years of experience",
    image: "/uploads/hero-cleaning.png",
    cta: { text: "Learn More", url: "/cleaning" },
  },
  {
    id: "handyman",
    title: "Expert Handyman Services",
    subtitle: "Your Trusted Property Partner",
    description:
      "Professional repairs, installations, and maintenance for all your property needs",
    image: "/uploads/hero-handyman.png",
    cta: { text: "Learn More", url: "/handyman" },
  },
  {
    id: "gardening",
    title: "Premium Gardening Services",
    subtitle: "Beautiful Gardens, Perfect Lawns",
    description:
      "Professional lawn care and garden maintenance to keep your property pristine",
    image: "/uploads/hero-gardening.png",
    cta: { text: "Learn More", url: "/gardening" },
  },
];

export default function HomeHero({
  slides: slidesProp,
}: {
  slides?: HomeHeroSlide[] | null;
}) {
  const slides = useMemo(
    () => (slidesProp && slidesProp.length ? slidesProp : defaultSlides),
    [slidesProp]
  );
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
        >
          {/* Background Image with Overlay */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide.image})`,
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h1>

                {/* Subtitle */}
                {slide.subtitle ? (
                  <p className="text-xl md:text-2xl text-primary font-semibold mb-6">
                    {slide.subtitle}
                  </p>
                ) : null}

                {/* Description */}
                {slide.description ? (
                  <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
                    {slide.description}
                  </p>
                ) : null}

                {/* CTA Button */}
                {slide.cta ? (
                  <Link
                    href={slide.cta.url}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-[#0080e0] transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  >
                    {slide.cta.text}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${index === currentSlide
                ? "w-12 h-3 bg-primary"
                : "w-3 h-3 bg-white/50 hover:bg-white/75"
              } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
