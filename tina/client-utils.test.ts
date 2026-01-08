import { describe, expect, it } from "vitest";
import { getTinaApiUrl } from "./client-utils";

describe("getTinaApiUrl", () => {
  it("uses localhost when useLocal is true", () => {
    const url = getTinaApiUrl({
      clientId: "abc",
      branch: "main",
      useLocal: true,
    });

    expect(url).toBe("http://localhost:4001/graphql");
  });

  it("defaults to localhost in non-production when useLocal is unset", () => {
    const url = getTinaApiUrl({
      clientId: "abc",
      branch: "main",
      nodeEnv: "development",
    });

    expect(url).toBe("http://localhost:4001/graphql");
  });

  it("uses localhost when clientId or branch is missing", () => {
    expect(getTinaApiUrl({ branch: "main" })).toBe("http://localhost:4001/graphql");
    expect(getTinaApiUrl({ clientId: "abc" })).toBe("http://localhost:4001/graphql");
  });

  it("encodes branch names for the content API", () => {
    const url = getTinaApiUrl({
      clientId: "abc",
      branch: "feature/test",
      useLocal: false,
      nodeEnv: "production",
    });

    expect(url).toBe("https://content.tinajs.io/content/abc/github/feature%2Ftest");
  });
});
