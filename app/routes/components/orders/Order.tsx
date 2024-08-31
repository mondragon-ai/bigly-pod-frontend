import {
  Badge,
  BlockStack,
  Box,
  Card,
  InlineGrid,
  Link,
  ResourceItem,
  ResourceList,
  Text,
  Thumbnail,
} from "@shopify/polaris";
import {
  LineItem,
  OrderDocument,
  PODLineItemsProps,
} from "~/routes/lib/types/orders";
import styles from "./Orders.module.css";
import { PRODUCT_PLACEHODLER } from "~/routes/lib/constants";
import { formatToMoney } from "~/routes/lib/formatters/numbers";
import { OrderFulfilledIcon, ShippingLabelIcon } from "@shopify/polaris-icons";

export const Order = ({ order }: { order: OrderDocument }) => {
  return (
    <Card padding="400">
      <BlockStack gap="300">
        <div className={styles.orderBadges}>
          <div style={{ marginRight: "0.5rem" }}>
            <Badge tone={"success"} icon={OrderFulfilledIcon}>
              Fulilled
            </Badge>
          </div>
          <Badge tone={"success"} icon={ShippingLabelIcon}>
            Delivered
          </Badge>
        </div>
        <Text as="h4" variant="headingMd">
          Order
        </Text>
        <Text as="p" variant="bodyMd">
          Shipping Profile
          <Text as="p" variant="bodyMd" tone="disabled">
            {order.tracking_number ? (
              <Link url={order.tracking_number} target="_blank">
                {order.tracking_number}{" "}
              </Link>
            ) : (
              <Text as="p" variant="bodyMd" tone="disabled">
                No Tracking
              </Text>
            )}
          </Text>
        </Text>

        <Box borderColor="border" borderWidth="025" borderRadius="100">
          <ResourceList
            resourceName={{ singular: "Line Item", plural: "Line Items" }}
            items={order.pod_line_items}
            renderItem={(items, id, i) =>
              renderLineItem(items, order.merchant_order.line_items, i)
            }
          />
        </Box>
      </BlockStack>
    </Card>
  );
};

const renderLineItem = (
  pod_li: PODLineItemsProps,
  item: LineItem[],
  i: number,
) => {
  const line_item =
    item.filter((li) => {
      console.log(li);
      return li.variant_id === pod_li.merchant_variants_id;
    })[0] || item[0];
  console.log(line_item);
  const { sku, title, variant_title, quantity, price } = line_item;
  const { variant_id, image, cost } = pod_li;

  const media = (
    <Thumbnail source={image || PRODUCT_PLACEHODLER} alt={`${sku}`} />
  );

  return (
    <ResourceItem
      id={String(variant_id)}
      url={"#"}
      media={media}
      accessibilityLabel={`View details for ${title}`}
    >
      <InlineGrid columns={["twoThirds", "oneThird", "oneThird", "oneThird"]}>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {variant_title}
          </Text>
          <Text variant="bodySm" as="h4" tone="subdued">
            {sku}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(cost))}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`x ${quantity}`}
          </Text>
        </div>
        <div>
          <Text variant="bodyMd" fontWeight="bold" as="h3">
            {`$${formatToMoney(Number(price))}`}
          </Text>
        </div>
      </InlineGrid>
    </ResourceItem>
  );
};