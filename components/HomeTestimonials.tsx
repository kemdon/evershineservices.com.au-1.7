"use client";

import { useState } from "react";
import Link from "next/link";

export type HomeTestimonial = {
  quote: string;
  author: string;
  service?: string | null;
};

const defaultTestimonials: HomeTestimonial[] = [
  {
    quote:
      "I hired Evershine do my carpet, they finished within 4 hours and they did a very good job.",
    author: "D. Johnson",
    service: "Carpet Cleaning",
  },
  {
    quote:
      "Just before my partner and I move to Melb, we have Evershine to do end of lease cleaning for our rental property. Moreover, we got our fully bond back just a week after! Thank you Evershine Services!",
    author: "David K",
    service: "End of Lease Cleaning",
  },
  {
    quote:
      "Evershine SAVED MY LIFE!!! Chose Evershine was the best choice I've ever made!",
    author: "Scott O",
    service: "End of Lease Cleaning",
  },
  {
    quote: "Absolutely great work, thank you Evershine.",
    author: "Damian J. J",
    service: "Office Cleaning",
  },
  {
    quote:
      "My old man was like, 'Your garden now finally part of your house, son!' Thank you Evershine.",
    author: "Peter M.",
    service: "Gardening",
  },
];

export default function HomeTestimonials({
  heading = "What Our Clients Say",
  subheading = "Don't just take our word for it",
  testimonials = defaultTestimonials,
  cta = { label: "See Our Process", href: "/about" },
}: {
  heading?: string;
  subheading?: string;
  testimonials?: HomeTestimonial[] | null;
  cta?: { label: string; href: string };
}) {
  const items = testimonials?.length ? testimonials : defaultTestimonials;
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <section className="py-20 bg-darker text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {heading}
          </h2>
          <p className="text-xl text-gray-400">
            {subheading}
          </p>
        </div>

        {/* Testimonials Display */}
        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/10">
            {/* Quote Icon */}
            <div className="absolute top-8 left-8 text-8xl text-primary/20 font-serif leading-none">
              &ldquo;
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              <p className="text-xl md:text-2xl text-white italic leading-relaxed mb-8 pl-8 min-h-[120px]">
                {items[currentIndex].quote}
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-4 pl-8">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-[#0080e0] flex items-center justify-center text-white text-2xl font-bold">
                  {items[currentIndex].author.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-white text-lg">
                    {items[currentIndex].author}
                  </p>
                  {items[currentIndex].service ? (
                    <p className="text-primary">{items[currentIndex].service}</p>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {items.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all ${index === currentIndex
                      ? "w-8 h-3 bg-primary"
                      : "w-3 h-3 bg-white/30 hover:bg-white/50"
                    } rounded-full`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <Link
              href={cta.href}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-[#0080e0] transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {cta.label}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
