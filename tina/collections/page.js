/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Page Content",
  name: "page",
  path: "content/page",
  format: "mdx",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      required: true,
    },
    {
      type: "string",
      name: "layout",
      label: "Layout",
      options: [
        { label: "Standard", value: "standard" },
        { label: "Home", value: "home" },
        { label: "Service", value: "service" },
      ],
    },
    {
      type: "object",
      name: "hero",
      label: "Hero",
      fields: [
        {
          type: "image",
          name: "backgroundImage",
          label: "Background Image",
        },
        {
          type: "string",
          name: "eyebrow",
          label: "Eyebrow",
        },
        {
          type: "string",
          name: "heading",
          label: "Heading",
        },
        {
          type: "string",
          name: "subheading",
          label: "Subheading",
          ui: { component: "textarea" },
        },
        {
          type: "string",
          name: "ctaLabel",
          label: "CTA Label",
        },
        {
          type: "string",
          name: "ctaLink",
          label: "CTA Link",
        },
      ],
    },
    {
      type: "object",
      name: "heroSlides",
      label: "Home Hero Slides",
      list: true,
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "subtitle", label: "Subtitle" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Image" },
        { type: "string", name: "ctaText", label: "CTA Text" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      type: "object",
      name: "intro",
      label: "Intro",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "content", label: "Content", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Image" },
        { type: "string", name: "ctaLabel", label: "CTA Label" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      type: "object",
      name: "serviceList",
      label: "Service List",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        { type: "image", name: "backgroundImage", label: "Background Image" },
        {
          type: "string",
          name: "items",
          label: "Items",
          list: true,
        },
        { type: "string", name: "ctaLabel", label: "CTA Label" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      type: "object",
      name: "homeServices",
      label: "Home Services",
      list: true,
      fields: [
        { type: "string", name: "title", label: "Title" },
        { type: "string", name: "description", label: "Description", ui: { component: "textarea" } },
        { type: "string", name: "icon", label: "Icon (emoji or short text)" },
        { type: "string", name: "link", label: "Link" },
      ],
    },
    {
      type: "object",
      name: "homeServicesSection",
      label: "Home Services Section",
      fields: [
        { type: "string", name: "eyebrow", label: "Eyebrow" },
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "stats",
      label: "Stats",
      list: true,
      fields: [
        { type: "string", name: "icon", label: "Icon (emoji)" },
        { type: "number", name: "value", label: "Value" },
        { type: "string", name: "suffix", label: "Suffix" },
        { type: "string", name: "label", label: "Label" },
      ],
    },
    {
      type: "object",
      name: "testimonials",
      label: "Testimonials",
      list: true,
      fields: [
        { type: "string", name: "quote", label: "Quote", ui: { component: "textarea" } },
        { type: "string", name: "author", label: "Author" },
        { type: "string", name: "service", label: "Service" },
      ],
    },
    {
      type: "object",
      name: "testimonialsSection",
      label: "Testimonials Section",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
        { type: "string", name: "ctaLabel", label: "CTA Label" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      type: "object",
      name: "partners",
      label: "Partner Logos",
      list: true,
      fields: [
        { type: "string", name: "name", label: "Name" },
        { type: "image", name: "logo", label: "Logo" },
      ],
    },
    {
      type: "object",
      name: "partnersSection",
      label: "Partners Section",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "subheading", label: "Subheading", ui: { component: "textarea" } },
        { type: "string", name: "bottomText", label: "Bottom Text", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "homeAbout",
      label: "Home About",
      fields: [
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "content", label: "Content", ui: { component: "textarea" } },
        { type: "image", name: "image", label: "Image" },
        { type: "string", name: "ctaLabel", label: "CTA Label" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      type: "boolean",
      name: "showLatestPosts",
      label: "Show Latest Posts",
    },
    {
      type: "object",
      name: "articlesSection",
      label: "Articles Section",
      fields: [
        { type: "string", name: "eyebrow", label: "Eyebrow" },
        { type: "string", name: "heading", label: "Heading" },
        { type: "string", name: "ctaLabel", label: "CTA Label" },
        { type: "string", name: "ctaLink", label: "CTA Link" },
      ],
    },
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") return `/`;
      if (Array.isArray(document?._sys?.breadcrumbs) && document._sys.breadcrumbs.length) {
        return `/${document._sys.breadcrumbs.join("/")}`;
      }
      return `/${document._sys.filename}`;
    },
  },
};
