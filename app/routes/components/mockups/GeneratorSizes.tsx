import styles from "./Mockups.module.css";
import { Tag, Text, Card, BlockStack, InlineStack } from "@shopify/polaris";
import { MockupDocument } from "~/routes/lib/types/mockups";

export function CardSizes({ mockup }: { mockup: MockupDocument }) {
  const tagMarkup = mockup.sizes.map((option) => (
    <Tag key={option}>{option}</Tag>
  ));

  return (
    <Card>
      <BlockStack gap="500">
        <div className={styles.info}>
          <Text as="h2" variant="headingMd">
            Sizes
          </Text>
        </div>

        <InlineStack gap={"100"}>{tagMarkup}</InlineStack>
      </BlockStack>
    </Card>
  );
}
