import { Button, Card } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { MockupDocument } from "~/routes/lib/types/mockups";
import { useState } from "react";

export const MockupImageCard = ({
  mockup,
  image,
}: {
  mockup: MockupDocument;
  image: string;
}) => {
  const [is_front, setFront] = useState(true);
  const front =
    mockup.mockup_urls.front.length > 0 ? mockup.mockup_urls.front : [];

  const back =
    mockup.mockup_urls.back.length > 0 ? mockup.mockup_urls.back : [];

  const palceholder =
    (mockup.mockup_urls &&
      (is_front ? front : back)[0] &&
      (is_front ? front : back)[0].url) ||
    "";

  const mockup_img = (is_front ? front : back).filter((i) => {
    return i.alt.toLocaleUpperCase() == image.toLocaleUpperCase();
  })[0];

  return (
    <Card padding={"200"}>
      <div className={styles.mockupContainer}>
        <img
          src={mockup_img ? mockup_img.url : palceholder}
          alt={mockup.title}
          className={styles.mainImg}
          height="500"
          width="500"
        />
        <div
          style={{
            position: "absolute",
            zIndex: 100,
            top: "10px",
            width: "97%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button onClick={() => setFront(!is_front)}>
            {is_front ? "Front" : "Back"}
          </Button>
        </div>
      </div>
    </Card>
  );
};
