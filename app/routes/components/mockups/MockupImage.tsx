import styles from "./Mockups.module.css";
import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/routes/lib/types/mockups";

export const MockupImage = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Your Design
        </Text>
        <img src={mockup.design_url} alt="" className={styles.designImg} />
      </BlockStack>
    </Card>
  );
};
