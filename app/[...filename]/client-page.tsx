"use client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PageQuery } from "../../tina/__generated__/types";
import Link from "next/link";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: { page: PageQuery["page"] };
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.page.body;
  const buttonLabels = new Set([
    "Learn More",
    "Contact Us Today",
    "See Our Process",
  ]);

  const getText = (children: any): string => {
    if (typeof children === "string") {
      return children;
    }
    if (Array.isArray(children)) {
      return children.map(getText).join("");
    }
    return "";
  };

  const components = {
    // Hero H1
    h1: (props: any) => {
      const { children } = props;
      const text = typeof children === "string" ? children : children?.[0];

      if (text === "Welcome to Evershine Services") {
        return (
          <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden -mt-4 pt-8 pb-16 mb-8">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 leading-tight">
                {children}
              </h1>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
              <svg className="w-full h-12 text-white fill-current" preserveAspectRatio="none" viewBox="0 0 1440 54">
                <path d="M0,22L60,21.3C120,21,240,19,360,18.7C480,18,600,19,720,21.3C840,24,960,27,1080,28C1200,29,1320,27,1380,26L1440,25L1440,54L1380,54C1320,54,1200,54,1080,54C960,54,840,54,720,54C600,54,480,54,360,54C240,54,120,54,60,54L0,54Z"></path>
              </svg>
            </div>
          </section>
        );
      }
      return <h1 className="text-4xl font-bold text-gray-900 mb-6">{children}</h1>;
    },

    // H2 Section Headers
    h2: (props: any) => {
      const { children } = props;
      const text = typeof children === "string" ? children : children?.[0];

      if (text === "Cleaning | Handyman | Gardening") {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-lg md:text-xl text-blue-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧹</span>
                <span className="font-semibold">Cleaning</span>
              </div>
              <span className="text-yellow-300">|</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🔧</span>
                <span className="font-semibold">Handyman</span>
              </div>
              <span className="text-yellow-300">|</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <span className="font-semibold">Gardening</span>
              </div>
            </div>
            <p className="text-xl text-blue-100 text-center mt-6 max-w-4xl mx-auto">
              Adelaide's trusted property services provider with over 10 years of professional experience. We are committed to providing the best service to make your property shine.
            </p>
          </div>
        );
      }

      if (["Evershine Services Provides", "Our Stats", "What Our Clients Say", "Let's See Our Famous Clients", "About Us", "Get In Touch"].includes(text)) {
        return (
          <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-4">{children}</h2>
            </div>
          </div>
        );
      }

      return <h2 className="text-3xl font-bold text-gray-900 mb-4">{children}</h2>;
    },

    // H3 Service Cards
    h3: (props: any) => {
      const { children } = props;
      const text = typeof children === "string" ? children : children?.[0];

      // Service titles
      if (["Cleaning", "Handyman", "Gardening"].includes(text)) {
        const icons = { "Cleaning": "🧹", "Handyman": "🔧", "Gardening": "🌿" };
        const colors = {
          "Cleaning": "from-blue-500 to-blue-600",
          "Handyman": "from-orange-500 to-orange-600",
          "Gardening": "from-green-500 to-green-600"
        };

        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent transform hover:-translate-y-1">
              <div className={`h-2 bg-gradient-to-r ${colors[text as keyof typeof colors]}`}></div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${colors[text as keyof typeof colors]} text-4xl`}>
                    {icons[text as keyof typeof icons]}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{children}</h3>
                </div>
              </div>
            </div>
          </div>
        );
      }

      // Contact info headers
      if (["📍 Address", "📞 Phone", "📧 Email", "🕐 Business Hours"].includes(text?.substring(0, 20))) {
        return <h3 className="text-xl font-bold text-gray-900 mb-2">{children}</h3>;
      }

      // Testimonial authors
      if (text?.includes("D. Johnson") || text?.includes("David K") || text?.includes("Scott O") || text?.includes("Damian") || text?.includes("Peter M.")) {
        return <h3 className="text-lg font-semibold text-blue-600 mt-4">{children}</h3>;
      }

      return <h3 className="text-2xl font-bold text-gray-900 mb-4">{children}</h3>;
    },

    // Paragraphs
    p: (props: any) => {
      const { children } = props;
      const text = typeof children === "string" ? children : "";

      if (text.includes("Complete property services under one roof")) {
        return <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">{children}</p>;
      }

      if (text.includes("Don't just take our word for it")) {
        return <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">{children}</p>;
      }

      if (text.includes("Trusted by leading real estate agencies")) {
        return <p className="text-lg text-gray-600 text-center mb-8">{children}</p>;
      }

      if (text.includes("We have established long-term partnerships")) {
        return <p className="text-center text-gray-600 mt-6">{children}</p>;
      }

      return <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>;
    },

    // Lists
    ul: (props: any) => {
      const childText = props?.children?.[0]?.props?.children || "";

      // Partners grid
      if (typeof childText === "string" && childText.includes("Belle Property")) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {props.children}
            </div>
          </div>
        );
      }

      // Stats grid
      if (typeof childText === "string" && childText.includes("500+")) {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {props.children}
            </div>
          </div>
        );
      }

      return <ul className="space-y-2 mb-6">{props.children}</ul>;
    },

    // List items
    li: (props: any) => {
      const { children } = props;
      const childString = typeof children === "string" ? children : "";

      // Partner cards
      if (["Belle Property", "Harcourts", "Ray White", "LJ Hooker", "Raine & Horne", "Professionals", "Stockwell"].some(p => childString.includes(p)) || childString.includes("DG")) {
        const icons: Record<string, string> = {
          "Belle": "🏠", "Harcourts": "🏢", "DG": "🔷", "Ray White": "⬜",
          "LJ Hooker": "🔴", "Raine & Horne": "🟡", "Professionals": "🔵", "Stockwell": "⭐"
        };
        const icon = Object.keys(icons).find(key => childString.includes(key));
        return (
          <div className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform duration-300">
              {icon ? icons[icon] : "🏢"}
            </div>
            <p className="text-gray-700 font-semibold text-center text-sm">{children}</p>
          </div>
        );
      }

      // Stats cards
      if (childString.includes("500+") || childString.includes("100%") || childString.includes("2000+") || childString.includes("10+")) {
        const stats = [
          { label: "500+", icon: "📊", title: "Leads per Week (AVG)" },
          { label: "100%", icon: "⭐", title: "Satisfaction Rate" },
          { label: "2000+", icon: "👥", title: "Customers Each Year" },
          { label: "10+", icon: "🏆", title: "Years of Experience" }
        ];
        const stat = stats.find(s => childString.includes(s.label));
        if (stat) {
          return (
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 mb-2">{stat.label}</div>
              <p className="text-gray-600 font-medium">{stat.title}</p>
            </div>
          );
        }
      }

      // Regular list items
      return (
        <li className="flex items-start text-gray-700">
          <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>{children}</span>
        </li>
      );
    },

    // Blockquotes for testimonials
    blockquote: (props: any) => {
      return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="relative bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="absolute top-8 left-8 text-8xl text-blue-200 font-serif leading-none">"</div>
            <div className="relative z-10 pl-8 text-gray-800 italic text-xl leading-relaxed">{props.children}</div>
          </div>
        </div>
      );
    },

    // Strong text
    strong: (props: any) => {
      const childText = typeof props?.children === "string" ? props.children : "";

      if (childText === "Our Services:") {
        return <strong className="font-bold text-gray-900 block text-lg mb-3">{props.children}</strong>;
      }

      if (childText === "Why Choose Evershine?") {
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
            <h3 className="text-3xl font-bold text-gray-900">{props.children}</h3>
          </div>
        );
      }

      return <strong className="font-bold text-gray-900">{props.children}</strong>;
    },

    // Links/Buttons
    a: (props: any) => {
      const href = props?.url ?? props?.href ?? "";
      const text = getText(props?.children);
      const isButton = buttonLabels.has(text);
      const className = isButton
        ? "inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg"
        : "text-blue-600 hover:text-blue-700 underline font-medium";

      const isExternal = href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:");

      if (href.startsWith("/")) {
        return (
          <div className="text-center mt-6">
            <Link href={href} className={className}>
              {props.children}
              {isButton && (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              )}
            </Link>
          </div>
        );
      }

      return (
        <a
          href={href}
          className={className}
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {props.children}
        </a>
      );
    },

    // Horizontal rules
    hr: (props: any) => {
      return <hr className="my-16 border-t-2 border-gray-200" />;
    },
  };

  return (
    <div data-tina-field={tinaField(data.page, "body")} className="prose prose-lg max-w-none">
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
