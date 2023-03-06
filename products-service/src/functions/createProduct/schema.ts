export default {
  type: "object",
  properties: {
    price: { type: "number" },
    title: { type: "string" },
    description: { type: "string" },
  },
  required: ["description", "price", "title"],
} as const;
