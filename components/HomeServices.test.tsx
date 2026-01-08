import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import HomeServices from "./HomeServices";

describe("HomeServices", () => {
  it("renders CMS-provided headings and service cards", () => {
    render(
      <HomeServices
        eyebrow="EVERSHINE SERVICES PROVIDES"
        heading="Cleaning · Handyman · Gardening"
        subheading="Complete property services under one roof"
        services={[
          {
            title: "Cleaning",
            description: "End of lease cleaning",
            icon: "🧹",
            link: "/cleaning",
          },
        ]}
      />
    );

    expect(screen.getByText("EVERSHINE SERVICES PROVIDES")).toBeInTheDocument();
    expect(screen.getByText("Cleaning · Handyman · Gardening")).toBeInTheDocument();
    expect(screen.getByText("Complete property services under one roof")).toBeInTheDocument();
    expect(screen.getByText("Cleaning")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /learn more/i })).toHaveAttribute(
      "href",
      "/cleaning"
    );
  });
});

