import styles from "./Mockups.module.css";
import { useNavigate } from "@remix-run/react";
import { MockupTypes } from "~/routes/lib/types/mockups";
import { mockup_data } from "~/routes/lib/data/mockups";
import { capitalizeEachWord } from "~/routes/lib/formatters/text";
import { Badge, BlockStack, Card, InlineGrid, Text } from "@shopify/polaris";
import { getRandomURL } from "~/routes/lib/util/mockups";

export const CatalogCard = ({
  type = "hoodie_lane_7",
}: {
  type: MockupTypes;
}) => {
  const navigate = useNavigate();
  const mockup = mockup_data[type as MockupTypes];
  const url = getRandomURL(mockup.quarter_turns);

  const renderColorSwatch = (color: string) => {
    if (color.includes("/")) {
      const [color1, color2] = color.split("/");
      return (
        <div className={styles.colorCatalog} key={color}>
          <div className={styles.dualColorSwatchCatalog}>
            <div
              style={{ background: color1 }}
              className={styles.dualColorHalfCatalog}
            ></div>
            <div
              style={{ background: color2 }}
              className={styles.dualColorHalfCatalog}
            ></div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.colorCatalog} key={color}>
        <div
          className={styles.singleColorSwatchCatalog}
          style={{ background: color == "Royal" ? "#3F66D9" : color }}
        ></div>
      </div>
    );
  };

  return (
    <Card padding="0">
      <div
        className={styles.catalogCardWrapper}
        onClick={() =>
          navigate(
            `/app/generator/${type.split("_")[0]}-${type.split("_").slice(1).join("-")}`,
          )
        }
      >
        <div style={{ position: "absolute", top: 10, left: 10, zIndex: 100 }}>
          <Badge tone="success">{capitalizeEachWord(mockup.brand)}</Badge>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "row",
          }}
        >
          <img
            src={url}
            alt={mockup.name}
            height={200}
            width={200}
            style={{
              minWidth: 200,
              minHeight: 200,
              objectFit: "scale-down",
              padding: "1rem",
            }}
          />
          <div className={styles.cardContent}>
            <InlineGrid
              gap="400"
              columns={{ xs: 2, sm: 2, md: 5, lg: 5, xl: 5 }}
              alignItems="start"
            >
              <CatalogInfo title="Price" content={mockup.price} />
              <CatalogInfo
                title="Shipping"
                content="From $3.99"
                subContent="Depends on the shipping address price may vary"
                magic
              />
              <CatalogInfo
                title="Avg. Production Time"
                content="🇺🇸 7 - 10 days"
                subContent="🌎 10 - 18 days"
              />
              {/* <CatalogInfo title="Sizes" content="One Size" /> */}
              <div
                className={styles.catalogInfo}
                style={{ paddingRight: "1rem" }}
              >
                <BlockStack gap="400">
                  <Text as="h6" variant="headingXs" tone="subdued">
                    Sizes
                  </Text>
                  <div className={styles.colorGridCatalog}>
                    {mockup.sizes.map((s, i) => (
                      <Text as="h6" variant="headingXs" tone="subdued">
                        {`${s.toLocaleLowerCase()}${i == mockup.sizes.length - 1 ? "" : ","}`}
                      </Text>
                    ))}
                  </div>
                </BlockStack>
              </div>
              <div
                className={styles.catalogInfo}
                style={{ paddingRight: "1rem" }}
              >
                <BlockStack gap="400">
                  <Text as="h6" variant="headingXs" tone="subdued">
                    Colors - {mockup.colors.length}
                  </Text>
                  <div className={styles.colorGridCatalog}>
                    {mockup.colors.map(renderColorSwatch)}
                  </div>
                </BlockStack>
              </div>
            </InlineGrid>
            <Text
              as="h4"
              variant="headingXs"
              fontWeight="regular"
              tone="magic-subdued"
            >
              {mockup.name}
            </Text>
          </div>
        </div>
      </div>
    </Card>
  );
};

const CatalogInfo = ({
  title,
  content,
  subContent,
  magic,
}: {
  title: string;
  content: string;
  subContent?: string;
  magic?: boolean;
}) => (
  <div className={styles.catalogInfo}>
    <BlockStack gap="400">
      <Text as="h6" variant="headingXs" tone="subdued">
        {title}
      </Text>
      <Text as="p" variant="bodyMd" tone="base">
        {content}
        {subContent && (
          <Text
            as="p"
            variant={magic ? "bodyXs" : "bodyMd"}
            tone={magic ? "magic-subdued" : "base"}
          >
            {subContent}
          </Text>
        )}
      </Text>
    </BlockStack>
  </div>
);
