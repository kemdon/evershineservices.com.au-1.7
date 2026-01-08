import Link from "next/link";

export type HomeService = {
  title: string;
  description?: string | null;
  icon?: string | null;
  link?: string | null;
};

const defaultServices: HomeService[] = [
  {
    icon: "🧹",
    title: "Cleaning",
    description: "End of lease, commercial, and residential cleaning with attention to detail.",
    link: "/cleaning",
  },
  {
    icon: "🔧",
    title: "Handyman",
    description: "Repairs, installations, and maintenance — no job too small.",
    link: "/handyman",
  },
  {
    icon: "🌿",
    title: "Gardening",
    description: "Lawn care and garden maintenance to keep your property looking its best.",
    link: "/gardening",
  },
];

export default function HomeServices({
  eyebrow = "EVERSHINE SERVICES PROVIDES",
  heading = "Cleaning · Handyman · Gardening",
  subheading = "Complete property services under one roof",
  services = defaultServices,
}: {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  services?: HomeService[] | null;
}) {
  return (
    <section className="section-padding bg-light-bg">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold tracking-[0.35em] text-gray-500 uppercase">
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mt-4 mb-4">
            {heading}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subheading}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {(services?.length ? services : defaultServices).map((service) => (
            <div key={`${service.title}-${service.link}`} className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-md">
                <span className="text-2xl">{service.icon || "•"}</span>
              </div>
              <h3 className="text-xl font-bold text-dark">{service.title}</h3>
              {service.description ? (
                <p className="mt-3 text-gray-600 leading-relaxed">{service.description}</p>
              ) : null}
              {service.link ? (
                <div className="mt-6">
                  <Link href={service.link} className="btn-primary">
                    Learn More
                  </Link>
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
