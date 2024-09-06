import {
  MockupDocument,
  MockupRequestBody,
  MockupTypes,
} from "../types/mockups";
import { mockup_data } from "../data/mockups";

export function convertToMockupRequestBody(
  mockupDocument: MockupDocument,
  front: string,
  back: string,
  sleeve: string,
): MockupRequestBody {
  const has_front = front !== "";
  const has_back = back !== "";
  return {
    design_urls: {
      front: front,
      back: back,
      sleeve: sleeve,
    },
    cost: mockup_data[mockupDocument.type as MockupTypes].cost,
    base_sku: mockupDocument.base_sku,
    title: mockupDocument.title,
    colors: mockupDocument.colors,
    sizes: mockupDocument.sizes,
    type: mockupDocument.type as MockupTypes,
    dimension: {
      original_width_front: mockupDocument.dimension.original_width_front,
      original_height_front: mockupDocument.dimension.original_height_front,
      resized_height_front: mockupDocument.dimension.resized_height_front,
      resized_width_front: mockupDocument.dimension.resized_width_front,
      original_width_back: mockupDocument.dimension.original_width_back,
      original_height_back: mockupDocument.dimension.original_height_back,
      resized_height_back: mockupDocument.dimension.resized_height_back,
      resized_width_back: mockupDocument.dimension.resized_width_back,
      original_width_sleeve: mockupDocument.dimension.original_width_sleeve,
      original_height_sleeve: mockupDocument.dimension.original_height_sleeve,
      resized_height_sleeve: mockupDocument.dimension.resized_height_sleeve,
      resized_width_sleeve: mockupDocument.dimension.resized_width_sleeve,
      blank_width: 1200,
      blank_height: 1200,
    },
    position: {
      top_front: mockupDocument.position.top_front,
      left_front: mockupDocument.position.left_front,
      top_back: mockupDocument.position.top_back,
      left_back: mockupDocument.position.left_back,
    },
    is_shirt: mockupDocument.type.includes("shirt"),
    front_is_main: (has_front && !has_back) || (has_front && has_back),
    sides:
      has_front && !has_back
        ? ["FRONT"]
        : has_front && has_back
          ? ["FRONT", "BACK"]
          : !has_front && has_back
            ? ["BACK"]
            : [],
    sleeve_side: mockupDocument.sleeve_side,
  };
}
