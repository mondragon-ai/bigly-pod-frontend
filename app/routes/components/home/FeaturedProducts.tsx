import { Badge, BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import styles from "./Home.module.css";
import { useNavigate } from "@remix-run/react";
import { MockupTypes } from "~/routes/lib/types/mockups";
import { mockup_data } from "~/routes/lib/data/mockups";
import { getRandomURL } from "~/routes/lib/util/mockups";

export const FeaturedProducts = () => {
  return (
    <Card roundedAbove="sm">
      <BlockStack gap="500">
        <Text as="h2" variant="headingSm">
          Featured Products
        </Text>
        <InlineGrid gap="400" columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}>
          <ProductCard type="hoodie_lane_7" badge={"MOST"} />
          <ProductCard type="shirt_gilden" />
          <ProductCard type="hoodie_lane_7" badge={"BEST"} />
          <ProductCard type="shirt_gilden" badge={"MOST"} />
        </InlineGrid>
      </BlockStack>
    </Card>
  );
};

interface ProductCardProps {
  type: MockupTypes;
  badge?: "BEST" | "MOST";
}

export const ProductCard = ({ type, badge }: ProductCardProps) => {
  const navigate = useNavigate();
  const { quarter_turns, title, delivery, price } = mockup_data[type];
  const url = getRandomURL(quarter_turns);

  return (
    <div
      onClick={() => navigate(`/app/generator/${type}`)}
      className={styles.productCard}
    >
      <div className={styles.mediaContainer}>
        <img
          src={url}
          alt={title}
          height={200}
          width={200}
          style={{ objectFit: "contain", padding: "1rem" }}
        />
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
      {badge && (
        <div className={styles.badgeContainer}>
          <Badge tone="success">
            {badge == "BEST" ? "Best Seller" : "Most Popular"}
          </Badge>
        </div>
      )}
    </div>
  );
};
