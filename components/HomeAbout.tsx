import Image from "next/image";
import Link from "next/link";

export default function HomeAbout({
  heading = "About Us",
  content = "With over 10 years servicing the local area, we are Adelaide's trusted property services provider. We have streamlined our systems to deliver fast quotes, quick turnaround, and consistent quality across cleaning, handyman, and gardening services.",
  image,
  cta = { label: "Learn More", href: "/about" },
}: {
  heading?: string;
  content?: string;
  image?: string | null;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-dark mb-6">{heading}</h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              {content
                .split(/\n\s*\n/)
                .filter(Boolean)
                .map((paragraph) => (
                  <p key={paragraph} className="text-lg">
                    {paragraph}
                  </p>
                ))}
            </div>

            <div className="mt-8">
              <Link href={cta.href} className="btn-primary">
                {cta.label}
              </Link>
            </div>
          </div>

          {/* Right Column - Media */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-darker">
              {image ? (
                <div className="relative h-[360px] md:h-[460px] w-full">
                  <Image
                    src={image}
                    alt={heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              ) : (
                <div className="flex h-[360px] md:h-[460px] items-center justify-center text-white/80">
                  Add an image in CMS
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
