import ClientPage from "./[...filename]/client-page";
import client from "../tina/client";

export const dynamic = 'force-static';

export default async function HomePage() {
  // Query the home page content from TinaCMS
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  const posts = await client.queries.postConnection({ first: 3 });
  const latestPosts =
    posts.data.postConnection.edges
      ?.map((edge) => edge?.node)
      .filter(Boolean)
      .map((post) => ({
        slug: post!._sys.filename,
        title: post!.title || post!._sys.filename,
        excerpt: post!.excerpt,
        image: post!.featuredImage,
      })) ?? [];

  return <ClientPage {...data} latestPosts={latestPosts} />;
}
