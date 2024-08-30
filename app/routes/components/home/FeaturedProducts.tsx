import { Badge, BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import styles from "./Home.module.css";
import { useNavigate } from "@remix-run/react";
import { MockupTypes } from "~/routes/lib/types/mockups";
import { mockup_data } from "~/routes/lib/data/mockups";

export const FeaturedProducts = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <Text as="h2" variant="headingSm">
          Featured Products
        </Text>
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
          <ProductCard type="hoodie" bestSeller />
          <ProductCard type="shirt" />
          <ProductCard type="hoodie" bestSeller />
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

interface ProductCardProps {
  type: MockupTypes;
  bestSeller?: boolean;
}

export const ProductCard = ({ type, bestSeller }: ProductCardProps) => {
  const navigate = useNavigate();
  const { image, title, delivery, price } = mockup_data[type];

  return (
    <div
      onClick={() => navigate(`/app/generator/${type}`)}
      className={styles.productCard}
    >
      <div className={styles.mediaContainer}>
        <img src={image} alt={title} height={200} width={200} />
      </div>
      <div className={styles.textContainer}>
        <BlockStack gap={"200"}>
          <Text as="h4" variant="headingSm">
            {title}
          </Text>
          <Text as="p" variant="bodyXs" tone="success">
            {delivery}
          </Text>
          <Text as="p" variant="bodySm" tone="subdued">
            {price}
          </Text>
        </BlockStack>
      </div>
      {bestSeller && (
        <div className={styles.badgeContainer}>
          <Badge tone="success">Best Seller</Badge>
        </div>
      )}
    </div>
  );
};
