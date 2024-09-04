import {
  BlockStack,
  Button,
  Card,
  DropZone,
  InlineGrid,
  Text,
} from "@shopify/polaris";
import {
  DeleteIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@shopify/polaris-icons";
import {
  GeneratorStateProps,
  MockupDimensions,
  MockupDocument,
} from "~/routes/lib/types/mockups";
import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";

export const GeneratorMockupImage = ({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const [toUpload, setToUpload] = useState(true);

  const handleDelete = (type: "FRONT" | "BACK" | "SLEEVE") => {
    setMockup({
      ...mockup,
      design_urls: {
        front: type == "FRONT" ? "" : mockup.design_urls.front,
        back: type == "BACK" ? "" : mockup.design_urls.back,
        sleeve: type == "SLEEVE" ? "" : mockup.design_urls.sleeve,
      },
      dimension: {
        original_width_front: 0,
        original_height_front: 0,
        resized_height_front: 0,
        resized_width_front: 0,
        original_width_back: 0,
        original_height_back: 0,
        resized_height_back: 0,
        resized_width_back: 0,
        blank_width: 0,
        blank_height: 0,
      },
      resized_design: "",
      position: {
        top_front: 0,
        left_front: 0,
        top_back: 0,
        left_back: 0,
      },
    });
  };

  return (
    <Card>
      <BlockStack gap="400">
        <InlineGrid gap="200" alignItems="start" columns="2">
          <Text as="h4" variant="headingMd">
            Add {mockup.isFront ? "Font" : "Back"} Design
          </Text>
          {/* <Button
            icon={toUpload ? WandIcon : UploadIcon}
            size="micro"
            onClick={() => setToUpload(!toUpload)}
          >
            {toUpload ? "Generate Image" : "Upload Image"}
          </Button> */}
        </InlineGrid>

        {mockup.design_urls.front && mockup.isFront ? (
          <>
            <img
              src={mockup.design_urls.front}
              alt="Mockup design"
              className={styles.designImg}
            />
            <Button icon={DeleteIcon} onClick={() => handleDelete("FRONT")} />
          </>
        ) : (
          toUpload &&
          mockup.isFront && (
            <UploadImage setMockup={setMockup} mockup={mockup} type={"FRONT"} />
          )
        )}
        {mockup.design_urls.back && !mockup.isFront ? (
          <>
            <img
              src={mockup.design_urls.back}
              alt="Mockup back design"
              className={styles.designImg}
            />
            <Button icon={DeleteIcon} onClick={() => handleDelete("BACK")} />
          </>
        ) : (
          toUpload &&
          !mockup.isFront && (
            <UploadImage setMockup={setMockup} mockup={mockup} type={"BACK"} />
          )
        )}

        {mockup.design_urls.sleeve &&
        mockup.isFront &&
        !mockup.type.includes("hoodie") ? (
          <>
            <InlineGrid gap="200" alignItems="start" columns="2">
              <Text as="h4" variant="headingMd">
                Sleeve Design
              </Text>
              <Button
                icon={
                  mockup.sleeve_side == "LEFT" ? ArrowLeftIcon : ArrowRightIcon
                }
                size="micro"
                onClick={() =>
                  setMockup({
                    ...mockup,
                    sleeve_side:
                      mockup.sleeve_side == "LEFT" ? "RIGHT" : "LEFT",
                  })
                }
              >
                {mockup.sleeve_side == "LEFT" ? "Left Sleeve" : "Right Sleeve"}
              </Button>
            </InlineGrid>
            <img
              src={mockup.design_urls.sleeve}
              alt="Mockup design"
              className={styles.designImg}
            />
            <Button icon={DeleteIcon} onClick={() => handleDelete("SLEEVE")} />
          </>
        ) : (
          toUpload &&
          mockup.isFront &&
          !mockup.type.includes("hoodie") && (
            <>
              <Text as="h4" variant="headingMd">
                Sleeve Design
              </Text>
              <UploadImage
                setMockup={setMockup}
                mockup={mockup}
                type={"SLEEVE"}
              />
            </>
          )
        )}
      </BlockStack>
    </Card>
  );
};

const UploadImage = ({
  mockup,
  setMockup,
  type,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
  type: "FRONT" | "BACK" | "SLEEVE";
}) => {
  const handleDropZoneDrop = useCallback(
    (_dropFiles: File[], acceptedFiles: File[], _rejectedFiles: File[]) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile) {
        const img = new Image();
        const objectUrl = window.URL.createObjectURL(selectedFile);
        img.src = objectUrl;
        img.onload = () => {
          const dimensions = calculateDimensions(img);
          const canvas = document.createElement("canvas");
          canvas.width = dimensions.width;
          canvas.height = dimensions.height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, dimensions.width, dimensions.height);

          const resizedDataUrl = canvas.toDataURL(selectedFile.type);

          setMockup((prevMockup) => ({
            ...prevMockup,
            design_urls: {
              ...prevMockup.design_urls,
              [type.toLowerCase()]: objectUrl,
            },
            dimension: updateDimensions(
              prevMockup.dimension,
              type,
              img,
              dimensions,
            ),
            [`resized_design_${type.toLowerCase()}`]: resizedDataUrl,
            [`original_file_${type.toLowerCase()}`]: selectedFile,
          }));
        };
      }
    },
    [setMockup, mockup],
  );

  const validImageTypes = ["image/gif", "image/jpeg", "image/png"];

  return (
    <BlockStack gap="150">
      <DropZone
        allowMultiple={false}
        onDrop={handleDropZoneDrop}
        accept={validImageTypes.join(",")}
        type="image"
      >
        <DropZone.FileUpload actionHint="Accepts .gif, .jpg, and .png" />
      </DropZone>
    </BlockStack>
  );
};

const calculateDimensions = (img: HTMLImageElement) => {
  const MAX_WIDTH = 300;
  const MAX_HEIGHT = 120;
  let { width, height } = img;

  if (width > height) {
    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }
  } else {
    if (height > MAX_HEIGHT) {
      width = Math.round((width * MAX_HEIGHT) / height);
      height = MAX_HEIGHT;
    }
  }
  if (height > MAX_HEIGHT) {
    width = Math.round((width * MAX_HEIGHT) / height);
    height = MAX_HEIGHT;
  }

  return { width, height };
};

const updateDimensions = (
  prevDimensions: MockupDimensions,
  type: "FRONT" | "BACK" | "SLEEVE",
  img: HTMLImageElement,
  dimensions: { width: number; height: number },
) => {
  const dimensionKeyPrefix = type.toLowerCase();
  return {
    ...prevDimensions,
    [`original_width_${dimensionKeyPrefix}`]: img.width,
    [`original_height_${dimensionKeyPrefix}`]: img.height,
    [`resized_width_${dimensionKeyPrefix}`]: dimensions.width,
    [`resized_height_${dimensionKeyPrefix}`]: dimensions.height,
  };
};
