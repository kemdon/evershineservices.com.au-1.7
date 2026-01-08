import Image from "next/image";
import Link from "next/link";

export type HomeArticle = {
  slug: string;
  title: string;
  excerpt?: string | null;
  image?: string | null;
};

export default function HomeArticles({
  eyebrow = "ARTICLES",
  heading = "Latest updates from Evershine",
  articles = [],
  cta = { label: "View All", href: "/posts" },
}: {
  eyebrow?: string;
  heading?: string;
  articles?: HomeArticle[];
  cta?: { label: string; href: string };
}) {
  if (!articles.length) return null;

  return (
    <section className="section-padding bg-white">
      <div className="section-container">
        <div className="text-center mb-12">
          <p className="text-sm font-bold tracking-[0.35em] text-gray-500 uppercase">
            {eyebrow}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mt-4 mb-4">
            {heading}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              href={`/posts/${article.slug}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-48 bg-light-bg">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                {article.excerpt ? (
                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                ) : null}
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                  Read more <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          {cta?.href && cta?.label ? (
            <Link href={cta.href} className="btn-primary">
              {cta.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
