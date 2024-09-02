export type MockupDocument = {
  id: string;
  domain: string;
  brand: MockupBrands;
  access_token: string;
  shop_name: string;
  design_url: string;
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
  original_width: number;
  original_height: number;
  resized_height: number;
  resized_width: number;
  blank_width: number;
  blank_height: number;
};

export type MockupPosition = {
  top: number;
  left: number;
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
  quarter_turns: {
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
