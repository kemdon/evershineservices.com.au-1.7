import ClientPage from "./client-page";
import client from "../../tina/client";

export async function generateStaticParams() {
  const pages = await client.queries.pageConnection();
  const paths = pages.data?.pageConnection?.edges?.map((edge) => {
    const filename = edge?.node?._sys.filename;
    // Don't include home in the dynamic routes - it's handled by app/page.tsx
    if (filename === 'home') return null;
    return {
      filename: edge?.node?._sys.breadcrumbs || [],
    };
  }).filter(Boolean);

  return paths || [];
}

export default async function Page({
  params,
}: {
  params: { filename: string[] };
}) {
  const data = await client.queries.page({
    relativePath: `${params.filename.join('/') || 'home'}.mdx`,
  });

  return <ClientPage {...data} />;
}
