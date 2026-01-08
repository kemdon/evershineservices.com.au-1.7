import Link from "next/link";
import Image from "next/image";
import type { PostConnectionQuery } from "../../tina/__generated__/types";

type PostListProps = {
  data: PostConnectionQuery;
};

export default function PostList({ data }: PostListProps) {
  return (
    <section className="section-container section-padding">
      <div className="flex flex-col gap-3 mb-10">
        <p className="text-sm uppercase tracking-[0.3em] text-secondary font-semibold">
          Insights
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
          Latest Posts
        </h1>
        <p className="text-slate-600 max-w-2xl">
          Practical tips, service updates, and property care advice from the
          Evershine team.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.postConnection.edges?.map((post) =>
          !post?.node ? null : (
            <Link
              key={post.node.id}
              href={`/posts/${post.node._sys.filename}`}
              className="group rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative h-44 bg-light-bg">
                {post.node.featuredImage ? (
                  <Image
                    src={post.node.featuredImage}
                    alt={post.node.title || post.node._sys.filename}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-primary/20 to-secondary/20" />
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                  {post.node.title || post.node._sys.filename}
                </h2>
                {post.node.excerpt ? (
                  <p className="text-gray-600 mt-3 leading-relaxed">{post.node.excerpt}</p>
                ) : null}
                <div className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
                  Read more <span aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          )
        )}
      </div>
    </section>
  );
}
