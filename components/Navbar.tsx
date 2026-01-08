"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

type NavLink = { label: string; href: string };
type NavCta = { label: string; href: string };

const defaultLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Why Us" },
  { href: "/cleaning", label: "Cleaning" },
  { href: "/handyman", label: "Handyman" },
  { href: "/gardening", label: "Gardening" },
  { href: "/posts", label: "Blog" },
];

const defaultCta: NavCta = { href: "/about", label: "Contact Us" };
const defaultBrandName = "Evershine Services";

export default function Navbar({
  brandName = defaultBrandName,
  links = defaultLinks,
  cta = defaultCta,
}: {
  brandName?: string;
  links?: NavLink[];
  cta?: NavCta;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled
          ? "bg-white shadow-lg"
          : "bg-white/95 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-[#0080e0] bg-clip-text text-transparent">
                {brandName}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-semibold transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href={cta.href}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-[#0080e0] transition-colors shadow-md hover:shadow-lg"
            >
              {cta.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-label="Toggle menu"
            >
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-primary hover:bg-gray-50 block px-3 py-2 rounded-md text-base font-medium transition-colors"
              onClick={() => setIsOpen(false)}
            >
                {item.label}
              </Link>
            ))}
            <Link
              href={cta.href}
              className="bg-primary text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-[#0080e0] transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {cta.label}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
