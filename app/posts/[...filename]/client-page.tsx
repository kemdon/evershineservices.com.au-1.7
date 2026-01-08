"use client";
import { tinaField, useTina } from "tinacms/dist/react";
import type { PostQuery } from "../../../tina/__generated__/types";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Image from "next/image";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

export default function Post(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  const content = data.post.body;
  return (
    <article className="section-container section-padding">
      <header className="mb-10 space-y-4">
        <p className="text-sm uppercase tracking-[0.35em] text-gray-500 font-semibold">
          ARTICLES
        </p>
        {data.post.featuredImage ? (
          <div
            data-tina-field={tinaField(data.post, "featuredImage")}
            className="relative w-full h-[320px] md:h-[420px] rounded-2xl overflow-hidden shadow-2xl bg-light-bg"
          >
            <Image
              src={data.post.featuredImage}
              alt={data.post.title || "Blog post"}
              fill
              priority
              className="object-cover"
            />
          </div>
        ) : null}
        <h1
          data-tina-field={tinaField(data.post, "title")}
          className="text-4xl md:text-5xl font-bold text-dark"
        >
          {data.post.title || "Untitled post"}
        </h1>
        {data.post.excerpt ? (
          <p
            data-tina-field={tinaField(data.post, "excerpt")}
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl"
          >
            {data.post.excerpt}
          </p>
        ) : null}
      </header>
      <div data-tina-field={tinaField(data.post, "body")} className="prose prose-lg max-w-none">
        <TinaMarkdown content={content} />
      </div>
    </article>
  );
}
