import Image from "next/image";

export type HomePartner = {
  name: string;
  logo?: string | null;
};

const defaultPartners: HomePartner[] = [
  { name: "Belle Property" },
  { name: "Harcourts" },
  { name: "DG Real Estate" },
  { name: "Ray White" },
  { name: "LJ Hooker" },
  { name: "Raine & Horne" },
  { name: "Professionals" },
  { name: "Stockwell" },
];

export default function HomePartners({
  heading = "Trusted by Leading Agencies",
  subheading = "We have established long-term partnerships with multiple real estate and property management companies",
  bottomText = "Our reputation for quality service has made us the preferred property services provider for Adelaide's leading real estate agencies.",
  partners = defaultPartners,
}: {
  heading?: string;
  subheading?: string;
  bottomText?: string;
  partners?: HomePartner[] | null;
}) {
  const items = partners?.length ? partners : defaultPartners;
  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            {heading}
          </h2>
          <p className="text-xl text-gray-600">
            {subheading}
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((partner, index) => (
            <div
              key={index}
              className="group relative flex items-center justify-center p-6 bg-light-bg rounded-xl hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-primary/20"
            >
              {partner.logo ? (
                <div className="relative w-full h-14">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              ) : (
                <p className="text-gray-700 group-hover:text-dark font-semibold text-center text-sm transition-colors">
                  {partner.name}
                </p>
              )}

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-primary/10 transition-colors" />
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-12">
          <p className="text-gray-600 max-w-3xl mx-auto">
            {bottomText}
          </p>
        </div>
      </div>
    </section>
  );
}
