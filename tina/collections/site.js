/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Site Settings",
  name: "site",
  path: "content/settings",
  format: "json",
  ui: {
    router: () => `/`,
  },
  fields: [
    {
      type: "string",
      name: "brandName",
      label: "Brand Name",
    },
    {
      type: "string",
      name: "footerAbout",
      label: "Footer About",
      ui: { component: "textarea" },
    },
    {
      type: "object",
      name: "navigation",
      label: "Navigation",
      fields: [
        {
          type: "object",
          name: "links",
          label: "Links",
          list: true,
          fields: [
            { type: "string", name: "label", label: "Label" },
            { type: "string", name: "href", label: "Href" },
          ],
        },
        {
          type: "object",
          name: "cta",
          label: "CTA Button",
          fields: [
            { type: "string", name: "label", label: "Label" },
            { type: "string", name: "href", label: "Href" },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "contact",
      label: "Contact",
      fields: [
        { type: "string", name: "address", label: "Address", ui: { component: "textarea" } },
        { type: "string", name: "phone", label: "Phone" },
        { type: "string", name: "email", label: "Email" },
        { type: "string", name: "businessHours", label: "Business Hours", ui: { component: "textarea" } },
      ],
    },
    {
      type: "object",
      name: "social",
      label: "Social Links",
      fields: [
        { type: "string", name: "facebook", label: "Facebook URL" },
        { type: "string", name: "instagram", label: "Instagram URL" },
      ],
    },
    {
      type: "string",
      name: "footerNote",
      label: "Footer Note",
    },
  ],
};
