export type MockupDocument = {
  is_shirt: boolean;
  front_is_main: boolean;
  external?: "SHOPIFY" | null;
  id: string;
  domain: string;
  brand: MockupBrands;
  access_token: string;
  shop_name: string;
  design_urls: {
    front: string;
    back: string;
    sleeve: string;
  };
  base_sku: string;
  title: string;
  colors: string[];
  sizes: string[];
  blank_image: string;
  type: MockupTypes;
  cost: number;
  state: number;
  created_at: any;
  updated_at: any;
  mockup_urls: { url: string; alt: string }[];
  status: "ACTIVE" | "DEACTIVE";
  product_id: string;
  dimension: MockupDimensions;
  position: MockupPosition;
  resized_design: string;
  original_file: File | null;
};

export type MockupDimensions = {
  original_width_front: number;
  original_height_front: number;
  resized_height_front: number;
  resized_width_front: number;
  original_width_back: number;
  original_height_back: number;
  resized_height_back: number;
  resized_width_back: number;
  blank_width: number;
  blank_height: number;
};

export type MockupPosition = {
  top_front: number;
  left_front: number;
  top_back: number;
  left_back: number;
};

export type MockupTypes = "shirt_gilden" | "hoodie_lane_7";
export type MockupBrands = "GILDEN" | "LANE_7";

// !  Mockup Data Types
// ! ========================================

export type MockupDataProps = {
  name: string;
  type: MockupTypes;
  brand: MockupBrands;
  colors: string[];
  sizes: string[];
  details: string[];
  features: string;
  material: string;
  image: string;
  delivery: string;
  price: string;
  title: string;
  cost: number;
  front: {
    [key: string]: string;
  };
  back: {
    [key: string]: string;
  };
};

export type MockupDataType = {
  [key in MockupTypes]: MockupDataProps;
};

// !  Mockup Generator Types
// ! ========================================

export type MockupResponseType = {
  error: boolean;
  mockups: {
    design_id: string;
    urls: {
      url: string;
      alt: string;
    }[];
  };
  text: string;
};

export type GeneratorStateProps = MockupDocument & {
  original_file: null | File;
  resized_design: string;
  progress: number;
  isFront: boolean;
};

export type MockupRequestBody = {
  design_url: string;
  base_sku: string;
  title: string;
  colors: string[];
  sizes: string[];
  type: MockupTypes;
  cost: number;
  dimension: {
    original_width: number;
    original_height: number;
    resized_height: number;
    resized_width: number;
    blank_width: number;
    blank_height: number;
  };
  position: {
    top: number;
    left: number;
  };
};
