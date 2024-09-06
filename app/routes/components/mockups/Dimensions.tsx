import styles from "./Mockups.module.css";
import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/routes/lib/types/mockups";

interface DimensionProps {
  value: number;
  label: string;
}

export const Dimensions = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card>
      <BlockStack gap="400">
        {mockup.mockup_urls.front.length > 0 && (
          <BlockStack gap="400">
            <Text as="h4" variant="headingMd">
              Front Dimensions
            </Text>
            <div className={styles.sizeWrapper}>
              <DimensionField
                label="Width"
                value={mockup.dimension.original_width_front || 0}
              />
              <DimensionField
                label="Height"
                value={mockup.dimension.resized_height_front || 0}
              />
            </div>
            <div className={styles.sizeWrapper}>
              <DimensionField
                label="Top"
                value={mockup.position.top_front || 0}
              />
              <DimensionField
                label="Left"
                value={mockup.position.left_front || 0}
              />
            </div>
          </BlockStack>
        )}
        {mockup.mockup_urls.back.length > 0 && (
          <BlockStack gap="400">
            <Text as="h4" variant="headingMd">
              Back Dimensions
            </Text>
            <div className={styles.sizeWrapper}>
              <DimensionField
                label="Width"
                value={mockup.dimension.resized_width_back || 0}
              />
              <DimensionField
                label="Height"
                value={mockup.dimension.resized_height_back || 0}
              />
            </div>
            <div className={styles.sizeWrapper}>
              <DimensionField
                label="Top"
                value={mockup.position.top_back || 0}
              />
              <DimensionField
                label="Left"
                value={mockup.position.left_back || 0}
              />
            </div>
          </BlockStack>
        )}
      </BlockStack>
    </Card>
  );
};

const DimensionField = ({ label, value }: DimensionProps) => {
  return (
    <div>
      <Text as="p" variant="bodyXs" tone="disabled">
        {label}
      </Text>
      <div className={styles.txtField}>
        <Text as="p" variant="bodyXs" tone="disabled">
          {value}
        </Text>
        <div>
          <Text as="p" variant="bodyXs" tone="disabled">
            px
          </Text>
        </div>
      </div>
    </div>
  );
};
