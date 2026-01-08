import "server-only";
import { createClient } from "tinacms/dist/client";
import { queries } from "./__generated__/types";
import { getTinaApiUrl } from "./client-utils";

const clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const branch = process.env.NEXT_PUBLIC_TINA_BRANCH;
const useLocalEnv = process.env.TINA_LOCAL ?? process.env.NEXT_PUBLIC_TINA_LOCAL;
const useLocal =
  useLocalEnv === "true" ? true : useLocalEnv === "false" ? false : undefined;

const tinaUrl = getTinaApiUrl({ clientId, branch, useLocal });

export const client = createClient({
  url: tinaUrl,
  token: process.env.TINA_TOKEN,
  queries,
});

export default client;
