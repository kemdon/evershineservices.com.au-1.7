import Link from "next/link";

type FooterContact = {
  address?: string;
  phone?: string;
  email?: string;
  businessHours?: string;
};

type FooterSocial = {
  facebook?: string;
  instagram?: string;
};

const defaultContact: FooterContact = {
  address: "239A Wright Street, Adelaide SA 5000",
  phone: "1300 525 598",
  email: "info@evershineservices.com.au",
  businessHours: "Mon - Sat: 7:00 AM - 6:00 PM\nSunday: Closed",
};

const defaultSocial: FooterSocial = {
  facebook: "https://www.facebook.com/EvershineServicesADL/",
  instagram: "https://www.instagram.com/evershineservicesadl/",
};

const defaultBrandName = "Evershine Services";
const defaultAbout =
  "Adelaide's most trusted property services provider. With over 10 years of professional experience,\nwe offer quality cleaning, handyman, and gardening services.";

export default function Footer({
  brandName = defaultBrandName,
  about = defaultAbout,
  contact = defaultContact,
  social = defaultSocial,
  footerNote,
}: {
  brandName?: string;
  about?: string;
  contact?: FooterContact;
  social?: FooterSocial;
  footerNote?: string;
}) {
  const resolvedFooterNote =
    String(footerNote || "").trim() ||
    `© ${new Date().getFullYear()} ${brandName}. All rights reserved.`;

  return (
    <footer className="bg-darker text-white">
      {/* Social Media Bar */}
      <div className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-6">
            <a
              href={social.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors p-2"
              aria-label="Facebook"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href={social.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors p-2"
              aria-label="Instagram"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {brandName}
            </h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              {about}
            </p>
            <div className="space-y-2 text-gray-400">
              <p>
                <strong className="text-white">Address:</strong><br />
                {contact.address}
              </p>
              <p>
                <strong className="text-white">Phone:</strong>{' '}
                <a
                  href={contact.phone ? `tel:${contact.phone.replace(/\s+/g, "")}` : "#"}
                  className="text-primary hover:text-secondary transition-colors font-semibold"
                >
                  {contact.phone}
                </a>
              </p>
              <p>
                <strong className="text-white">Email:</strong>{' '}
                <a
                  href={contact.email ? `mailto:${contact.email}` : "#"}
                  className="text-primary hover:text-secondary transition-colors"
                >
                  {contact.email}
                </a>
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Our Services</h4>
            <ul className="space-y-2">
              {[
                { label: "Cleaning Services", href: "/cleaning" },
                { label: "Handyman Services", href: "/handyman" },
                { label: "Gardening Services", href: "/gardening" }
              ].map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary">→</span>
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Why Us", href: "/about" },
                { label: "Blog", href: "/posts" }
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2"
                  >
                    <span className="text-primary">→</span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>{resolvedFooterNote}</p>
        </div>
      </div>
    </footer>
  );
}
