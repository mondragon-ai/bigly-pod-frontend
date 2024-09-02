import { MockupDataType, MockupDocument } from "../types/mockups";

export const mockup_data: MockupDataType = {
  hoodie_lane_7: {
    name: "Hoodies",
    brand: "LANE_7",
    type: "hoodie_lane_7",
    colors: ["BLUE", "GRAY", "GREEN", "BLACK", "WHITE"],
    sizes: ["SMALL", "MEDIUM", "LARGE", "XL", "2XL", "3XL"],
    details: [
      "Premium Cotton/Poly for Maximum Softness",
      "Classic fit for Max Comfort",
      "Unisex fit for both men & women",
      "Proudly designed, printed, & shipped in the USA",
    ],
    material: `100% Cotton \n Soft and comfortable \n Relaxed fit for a casual look`,
    features: `Classic t-shirt \n Machine wash friendly \n Comfortable for all-day wear`,
    image:
      "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/white_hoodie.png?v=1688134616",
    delivery: "🇺🇸 Estimated Delivery 7 - 10 days",
    price: "$20.00 - $30.50",
    title: "Hoodies",
    cost: 11,
    quarter_turns: {
      ["BLACK"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/black_hoodie.png?v=1688134615",
      ["WHITE"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/white_hoodie.png?v=1688134616",
      ["BLUE"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/navy_hoodie.png?v=1688134616",
      ["GREEN"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/green_hoodie_w_drawstrings.png?v=1688133011",
      ["GRAY"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/hgrey_hoodie.png?v=1688138135",
    },
  },
  shirt_gilden: {
    name: "Shirts",
    brand: "GILDEN",
    type: "shirt_gilden",
    colors: ["BLUE", "GRAY", "GREEN", "BLACK", "WHITE"],
    sizes: ["SMALL", "MEDIUM", "LARGE", "XL", "2XL", "3XL", "4XL", "5XL"],

    details: [
      "100% Cotton for Maximum Softness",
      'Modern fit for Max Comfort, order a size up for a more "loose" fit',
      "Unisex fit for both men & women",
      "Proudly designed, printed, & shipped in the USA",
    ],
    material: `100% Cotton \n Soft and comfortable \n Relaxed fit for a casual look`,
    features: `Classic t-shirt \n Machine wash friendly \n Comfortable for all-day wear`,
    image:
      "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/green_front.png?v=1687985193",
    delivery: "🇺🇸 Estimated Delivery 7 - 10 days",
    price: "$11.00 - $22.75",
    title: "Shirt",
    cost: 20,
    quarter_turns: {
      ["BLACK"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/black_front.png?v=1687985191",
      ["WHITE"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/tshirt.png?v=1687918758",
      ["BLUE"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/blue_front.png?v=1687985192",
      ["GREEN"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/green_front.png?v=1687985193",
      ["GRAY"]:
        "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/gray_front.png?v=1687985193",
    },
  },
};

export const shirt_colors = [
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/black_front.png?v=1687985191",
    color: "BLACK",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/tshirt.png?v=1687918758",
    color: "WHITE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/blue_front.png?v=1687985192",
    color: "BLUE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/green_front.png?v=1687985193",
    color: "GREEN",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/gray_front.png?v=1687985193",
    color: "GRAY",
  },
];

export const hoodie_colors = [
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/black_hoodie.png?v=1688134615",
    color: "BLACK",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/white_hoodie.png?v=1688134616",
    color: "WHITE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/navy_hoodie.png?v=1688134616",
    color: "BLUE",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/green_hoodie_w_drawstrings.png?v=1688133011",
    color: "GREEN",
  },
  {
    url: "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/hgrey_hoodie.png?v=1688138135",
    color: "GRAY",
  },
];

export const mockup_dummy: MockupDocument = {
  design_url: "",
  base_sku: "SKU123456",
  title: "",
  colors: [],
  sizes: ["OSFA"],
  blank_image:
    "https://cdn.shopify.com/s/files/1/0783/4802/6165/files/RetroTruckerCap.webp?v=1722090003",
  type: "shirt_gilden",
  cost: 35.0,
  dimension: {
    original_width: 0,
    original_height: 0,
    resized_height: 0,
    resized_width: 0,
    blank_width: 1200,
    blank_height: 1200,
  },
  position: {
    top: 0,
    left: 0,
  },
  resized_design: "https://example.com/resized_design.png",
  id: "",
  domain: "",
  access_token: "",
  shop_name: "",
  state: 0,
  created_at: undefined,
  updated_at: undefined,
  mockup_urls: [],
  status: "DEACTIVE",
  product_id: "",
  original_file: null,
  brand: "LANE_7",
};
