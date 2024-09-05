export const SERVER_BASE_URL = true
  ? "http://127.0.0.1:5001/pod-bigly/us-central1"
  : "https://us-central1-only-caps.cloudfunctions.net";

export const PRODUCT_PLACEHODLER =
  "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/black_hoodie.png?v=1688134615";

export const HOODIE_STRING =
  "https://cdn.shopify.com/s/files/1/0731/7048/5544/files/draw_v3.png?v=1688067867";

export const MOCKUP_DIMENSIONS = {
  hoodie_lane_7: { width: 200, height: 200 },
  shirt_gilden: { width: 225, height: 400 },
  default: { width: 200, height: 400 },
};

export const MAX_WIDTH = 300;
export const MAX_HEIGHT = 120;
