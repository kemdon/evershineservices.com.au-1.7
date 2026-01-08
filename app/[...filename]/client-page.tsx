"use client";
import Image from "next/image";
import Link from "next/link";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import HomeAbout from "@/components/HomeAbout";
import HomeArticles, { type HomeArticle } from "@/components/HomeArticles";
import HomeHero from "@/components/HomeHero";
import HomePartners from "@/components/HomePartners";
import HomeServices from "@/components/HomeServices";
import HomeStats from "@/components/HomeStats";
import HomeTestimonials from "@/components/HomeTestimonials";
import type { PageQuery } from "../../tina/__generated__/types";

type ClientPageProps = {
  query: string;
  variables: { relativePath: string };
  data: { page: PageQuery["page"] };
  latestPosts?: HomeArticle[];
};

function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

const markdownComponents = {
  a: (props: any) => {
    const href = props?.url ?? props?.href ?? "";
    const isExternal =
      typeof href === "string" &&
      (href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:"));

    if (typeof href === "string" && isInternalHref(href)) {
      return (
        <Link href={href} className="text-primary underline font-medium">
          {props.children}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className="text-primary underline font-medium"
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {props.children}
      </a>
    );
  },
};

function PageHero({
  title,
  eyebrow,
  subtitle,
  image,
  cta,
}: {
  title: string;
  eyebrow?: string | null;
  subtitle?: string | null;
  image?: string | null;
  cta?: { label: string; link: string } | null;
}) {
  return (
    <section className="relative h-[520px] md:h-[620px] overflow-hidden">
      {image ? (
        <Image src={image} alt={title} fill priority className="object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-[#0080e0]" />
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 h-full flex items-center justify-center text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {eyebrow ? (
            <p className="text-sm md:text-base tracking-[0.35em] uppercase text-white/90 font-semibold mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          {subtitle ? (
            <p className="text-lg md:text-2xl text-white/90 mt-6 leading-relaxed">
              {subtitle}
            </p>
          ) : null}
          {cta?.label && cta.link ? (
            <div className="mt-10">
              <Link href={cta.link} className="btn-primary">
                {cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function ServiceListSection({
  heading,
  description,
  backgroundImage,
  items,
  cta,
}: {
  heading?: string | null;
  description?: string | null;
  backgroundImage?: string | null;
  items?: Array<string | null> | null;
  cta?: { label: string; link: string } | null;
}) {
  if (!heading && !items?.length) return null;

  return (
    <section className="relative py-20">
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt={heading || "Service list"}
          fill
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-light-bg" />
      )}
      <div className="absolute inset-0 bg-black/35" />
      <div className="relative z-10 section-container">
        <div className="max-w-3xl mx-auto bg-primary/80 backdrop-blur-sm text-white rounded-2xl shadow-2xl p-10">
          {heading ? (
            <h2 className="text-3xl md:text-4xl font-bold text-center">{heading}</h2>
          ) : null}
          {description ? (
            <p className="text-white/90 text-center mt-4 leading-relaxed">{description}</p>
          ) : null}

          {items?.length ? (
            <ul className="mt-8 space-y-2 text-center">
              {items.filter(Boolean).map((item) => (
                <li key={item as string} className="text-white/95">
                  {item}
                </li>
              ))}
            </ul>
          ) : null}

          {cta?.label && cta.link ? (
            <div className="text-center mt-10">
              <Link href={cta.link} className="btn-secondary">
                {cta.label}
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default function ClientPage(props: ClientPageProps) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const page: any = data.page;
  const layout = page.layout || (page?._sys?.filename === "home" ? "home" : "standard");
  const body = page.body;

  if (layout === "home") {
    const heroSlides = Array.isArray(page.heroSlides) ? page.heroSlides : [];
    const slides = heroSlides
      .filter(Boolean)
      .map((s: any, idx: number) => ({
        id: `${idx}-${s.title || "slide"}`,
        title: s.title,
        subtitle: s.subtitle,
        description: s.description,
        image: s.image,
        cta: s.ctaText && s.ctaLink ? { text: s.ctaText, url: s.ctaLink } : null,
      }));

    return (
      <div>
        {slides.length ? (
          <HomeHero slides={slides} />
        ) : (
          <PageHero
            title={page.hero?.heading || page.title}
            eyebrow={page.hero?.eyebrow}
            subtitle={page.hero?.subheading}
            image={page.hero?.backgroundImage}
            cta={
              page.hero?.ctaLabel && page.hero?.ctaLink
                ? { label: page.hero.ctaLabel, link: page.hero.ctaLink }
                : null
            }
          />
        )}

        <HomeServices
          eyebrow={page.homeServicesSection?.eyebrow}
          heading={page.homeServicesSection?.heading}
          subheading={page.homeServicesSection?.subheading}
          services={page.homeServices}
        />
        <HomeStats stats={page.stats} />
        <HomeTestimonials
          heading={page.testimonialsSection?.heading}
          subheading={page.testimonialsSection?.subheading}
          cta={
            page.testimonialsSection?.ctaLabel && page.testimonialsSection?.ctaLink
              ? {
                  label: page.testimonialsSection.ctaLabel,
                  href: page.testimonialsSection.ctaLink,
                }
              : undefined
          }
          testimonials={page.testimonials}
        />
        <HomePartners
          heading={page.partnersSection?.heading}
          subheading={page.partnersSection?.subheading}
          bottomText={page.partnersSection?.bottomText}
          partners={page.partners}
        />
        <HomeAbout
          heading={page.homeAbout?.heading || "About Us"}
          content={page.homeAbout?.content || ""}
          image={page.homeAbout?.image}
          cta={{
            label: page.homeAbout?.ctaLabel || "Learn More",
            href: page.homeAbout?.ctaLink || "/about",
          }}
        />
        {page.showLatestPosts && props.latestPosts?.length ? (
          <HomeArticles
            eyebrow={page.articlesSection?.eyebrow}
            heading={page.articlesSection?.heading}
            cta={
              page.articlesSection?.ctaLabel && page.articlesSection?.ctaLink
                ? {
                    label: page.articlesSection.ctaLabel,
                    href: page.articlesSection.ctaLink,
                  }
                : undefined
            }
            articles={props.latestPosts}
          />
        ) : null}

        {body ? (
          <section className="section-padding bg-white">
            <div className="section-container">
              <div
                data-tina-field={tinaField(page, "body")}
                className="prose prose-lg max-w-none"
              >
                <TinaMarkdown content={body} components={markdownComponents} />
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  if (layout === "service") {
    return (
      <div>
        <PageHero
          title={page.hero?.heading || page.title}
          eyebrow={page.hero?.eyebrow}
          subtitle={page.hero?.subheading}
          image={page.hero?.backgroundImage}
          cta={
            page.hero?.ctaLabel && page.hero?.ctaLink
              ? { label: page.hero.ctaLabel, link: page.hero.ctaLink }
              : null
          }
        />

        {(page.intro?.heading || page.intro?.content || page.intro?.image) ? (
          <section className="section-padding bg-white">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  {page.intro?.heading ? (
                    <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                      {page.intro.heading}
                    </h2>
                  ) : null}
                  {page.intro?.content ? (
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {page.intro.content}
                    </p>
                  ) : null}
                  <div className="mt-8">
                    <Link href={page.intro?.ctaLink || "/about"} className="btn-primary">
                      {page.intro?.ctaLabel || "Contact Us"}
                    </Link>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-[320px] md:h-[420px] w-full rounded-2xl overflow-hidden shadow-2xl bg-light-bg">
                    {page.intro?.image ? (
                      <Image
                        src={page.intro.image}
                        alt={page.intro.heading || page.title}
                        fill
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null}

        <ServiceListSection
          heading={page.serviceList?.heading}
          description={page.serviceList?.description}
          backgroundImage={page.serviceList?.backgroundImage}
          items={page.serviceList?.items}
          cta={
            page.serviceList?.ctaLabel && page.serviceList?.ctaLink
              ? { label: page.serviceList.ctaLabel, link: page.serviceList.ctaLink }
              : null
          }
        />

        {body ? (
          <section className="section-padding bg-white">
            <div className="section-container">
              <div
                data-tina-field={tinaField(page, "body")}
                className="prose prose-lg max-w-none"
              >
                <TinaMarkdown content={body} components={markdownComponents} />
              </div>
            </div>
          </section>
        ) : null}
      </div>
    );
  }

  return (
    <div>
      <PageHero
        title={page.hero?.heading || page.title}
        eyebrow={page.hero?.eyebrow}
        subtitle={page.hero?.subheading}
        image={page.hero?.backgroundImage}
        cta={
          page.hero?.ctaLabel && page.hero?.ctaLink
            ? { label: page.hero.ctaLabel, link: page.hero.ctaLink }
            : null
        }
      />
      <section className="section-padding bg-white">
        <div className="section-container">
          <div data-tina-field={tinaField(page, "body")} className="prose prose-lg max-w-none">
            <TinaMarkdown content={body} components={markdownComponents} />
          </div>
        </div>
      </section>
    </div>
  );
}
