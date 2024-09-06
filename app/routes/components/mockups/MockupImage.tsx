import styles from "./Mockups.module.css";
import { BlockStack, Card, Text } from "@shopify/polaris";
import { MockupDocument } from "~/routes/lib/types/mockups";

export const MockupImage = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <Card>
      <BlockStack gap={"400"}>
        <Text as={"h4"} variant="headingMd">
          Your Designs
        </Text>
        {mockup.design_urls.front !== "" && (
          <img
            src={mockup.design_urls.front}
            alt=""
            className={styles.designImg}
            height={200}
            style={{ objectFit: "contain" }}
          />
        )}
        {mockup.design_urls.back !== "" && (
          <img
            src={mockup.design_urls.back}
            alt=""
            height={200}
            className={styles.designImg}
            style={{ objectFit: "contain" }}
          />
        )}

        {mockup.design_urls.sleeve !== "" && (
          <img
            src={mockup.design_urls.sleeve}
            alt=""
            height={200}
            className={styles.designImg}
            style={{ objectFit: "contain" }}
          />
        )}
      </BlockStack>
    </Card>
  );
};
