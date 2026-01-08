type TinaApiUrlOptions = {
  clientId?: string;
  branch?: string;
  useLocal?: boolean;
  nodeEnv?: string;
};

export const getTinaApiUrl = ({
  clientId,
  branch,
  useLocal,
  nodeEnv = process.env.NODE_ENV,
}: TinaApiUrlOptions) => {
  const shouldUseLocal = useLocal ?? nodeEnv !== "production";

  if (shouldUseLocal || !clientId || !branch) {
    return "http://localhost:4001/graphql";
  }

  return `https://content.tinajs.io/content/${clientId}/github/${encodeURIComponent(branch)}`;
};
