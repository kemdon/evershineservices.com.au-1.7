import ClientPage from "./[...filename]/client-page";
import client from "../tina/__generated__/client";

export const dynamic = 'force-static';

export default async function HomePage() {
  // Query the home page content from TinaCMS
  const data = await client.queries.page({
    relativePath: `home.mdx`,
  });

  return <ClientPage {...data} />;
}
