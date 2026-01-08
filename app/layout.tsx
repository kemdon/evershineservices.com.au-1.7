import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import client from "@/tina/client";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Evershine Services | Professional Property Services Adelaide",
    template: "%s | Evershine Services"
  },
  description: "Adelaide's trusted property services provider with over 10 years of professional experience in cleaning, handyman, and gardening services.",
  keywords: ["cleaning services Adelaide", "handyman Adelaide", "gardening services Adelaide", "property services", "end of lease cleaning", "commercial cleaning", "lawn mowing Adelaide"],
  authors: [{ name: "Evershine Services" }],
  openGraph: {
    title: "Evershine Services - Adelaide Property Services",
    description: "Professional cleaning, handyman, and gardening services in Adelaide",
    type: "website",
    locale: "en_AU",
    siteName: "Evershine Services"
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const defaultSiteSettings = {
  brandName: "Evershine Services",
  footerAbout:
    "Adelaide's most trusted property services provider. With over 10 years of professional experience, we offer quality cleaning, handyman, and gardening services.",
  navigation: {
    links: [
      { label: "Home", href: "/" },
      { label: "Why Us", href: "/about" },
      { label: "Cleaning", href: "/cleaning" },
      { label: "Handyman", href: "/handyman" },
      { label: "Gardening", href: "/gardening" },
      { label: "Blog", href: "/posts" },
    ],
    cta: { label: "Contact Us", href: "/about" },
  },
  contact: {
    address: "239A Wright Street, Adelaide SA 5000",
    phone: "1300 525 598",
    email: "info@evershineservices.com.au",
    businessHours: "Mon - Sat: 7:00 AM - 6:00 PM\nSunday: Closed",
  },
  social: {
    facebook: "https://www.facebook.com/EvershineServicesADL/",
    instagram: "https://www.instagram.com/evershineservicesadl/",
  },
  footerNote: "",
};

async function getSiteSettings() {
  try {
    const result = await client.queries.site({ relativePath: "site.json" });
    return result.data.site;
  } catch {
    return null;
  }
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const rawSite: any = (await getSiteSettings()) ?? defaultSiteSettings;
  const brandName =
    String(rawSite.brandName || "").trim() || defaultSiteSettings.brandName;
  const footerAbout =
    String(rawSite.footerAbout || "").trim() || defaultSiteSettings.footerAbout;
  const links = (rawSite.navigation?.links ?? defaultSiteSettings.navigation.links)
    .map((link: any) => ({
      label: typeof link?.label === "string" ? link.label : "",
      href: typeof link?.href === "string" ? link.href : "",
    }))
    .filter((link: { label: string; href: string }) => link.label && link.href);

  const cta =
    rawSite.navigation?.cta?.label && rawSite.navigation?.cta?.href
      ? { label: String(rawSite.navigation.cta.label), href: String(rawSite.navigation.cta.href) }
      : defaultSiteSettings.navigation.cta;

  const contact = {
    address: rawSite.contact?.address ?? defaultSiteSettings.contact.address,
    phone: rawSite.contact?.phone ?? defaultSiteSettings.contact.phone,
    email: rawSite.contact?.email ?? defaultSiteSettings.contact.email,
    businessHours: rawSite.contact?.businessHours ?? defaultSiteSettings.contact.businessHours,
  };

  const social = {
    facebook: rawSite.social?.facebook ?? defaultSiteSettings.social.facebook,
    instagram: rawSite.social?.instagram ?? defaultSiteSettings.social.instagram,
  };

  const footerNote =
    String(rawSite.footerNote || "").trim() ||
    `© ${new Date().getFullYear()} Evershine Services. All rights reserved.`;

  return (
    <html lang="en">
      <body className={`${roboto.variable} antialiased`}>
        <Navbar brandName={brandName} links={links} cta={cta} />
        <main className="pt-16">{children}</main>
        <Footer
          brandName={brandName}
          about={footerAbout}
          contact={contact}
          social={social}
          footerNote={footerNote}
        />
      </body>
    </html>
  );
}
