import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Text,
  TextField,
} from "@shopify/polaris";

import styles from "./Mockups.module.css";
import { useCallback } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
} from "@shopify/polaris-icons";
import {
  GeneratorStateProps,
  MockupDocument,
} from "~/routes/lib/types/mockups";

export const GeneratorDimensions = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const width =
    mockup.type == "hoodie_lane_7"
      ? 200
      : mockup.type == "shirt_gilden"
        ? 225
        : 200;

  const height =
    mockup.type == "hoodie_lane_7"
      ? 200
      : mockup.type == "shirt_gilden"
        ? 200
        : 400;

  const handleWidthChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => {
        const newWidth = Number(value);
        const aspectRatio =
          prevMockup.dimension.resized_height /
          prevMockup.dimension.resized_width;
        const neHeight = Math.round(newWidth * aspectRatio);
        return {
          ...prevMockup,
          dimension: {
            ...prevMockup.dimension,
            resized_width:
              newWidth <= width || neHeight <= height ? newWidth : newWidth,
            resized_height:
              neHeight <= height || newWidth <= width ? neHeight : height,
          },
        };
      });
    },
    [setMockup],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => {
        const newHeight = Number(value);
        const aspectRatio =
          prevMockup.dimension.resized_width /
          prevMockup.dimension.resized_height;
        const newWidth = Math.round(newHeight * aspectRatio);
        return {
          ...prevMockup,
          dimension: {
            ...prevMockup.dimension,
            resized_height:
              newHeight <= height || newHeight <= height ? newHeight : height,
            resized_width:
              newWidth <= width || newHeight <= height ? newWidth : width,
          },
        };
      });
    },
    [setMockup],
  );

  const handleTopChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: { ...prevMockup.position, top: Number(value) },
      }));
    },
    [setMockup],
  );

  const handleLeftChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: { ...prevMockup.position, left: Number(value) },
      }));
    },
    [setMockup],
  );

  const alignLeft = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: { ...prevMockup.position, left: 0 },
    }));
  }, [setMockup]);

  const alignTop = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: { ...prevMockup.position, top: 0 },
    }));
  }, [setMockup]);

  const alignBottom = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        top: height - prevMockup.dimension.resized_height,
      },
    }));
  }, [setMockup]);

  const alignRight = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        left: width - prevMockup.dimension.resized_width,
      },
    }));
  }, [setMockup]);

  const alignMiddleHorizontal = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        left: Math.round((width - prevMockup.dimension.resized_width) / 2),
      },
    }));
  }, [setMockup]);

  const alignMiddleVertical = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        top: Math.round((height - prevMockup.dimension.resized_height) / 2),
      },
    }));
  }, [setMockup]);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h4" variant="headingMd">
          Dimensions
        </Text>

        <div className={styles.sizeWrapper}>
          <DimensionInput
            label="Width"
            value={String(mockup.dimension.resized_width)}
            onChange={handleWidthChange}
          />
          <DimensionInput
            label="Height"
            value={String(mockup.dimension.resized_height)}
            onChange={handleHeightChange}
          />
        </div>

        <div className={styles.sizeWrapper}>
          <DimensionInput
            label="Top"
            value={String(mockup.position.top)}
            onChange={handleTopChange}
          />
          <DimensionInput
            label="Left"
            value={String(mockup.position.left)}
            onChange={handleLeftChange}
          />
        </div>
        <AlignmentButtons
          alignTop={alignTop}
          alignMiddleVertical={alignMiddleVertical}
          alignBottom={alignBottom}
          alignLeft={alignLeft}
          alignMiddleHorizontal={alignMiddleHorizontal}
          alignRight={alignRight}
        />
      </BlockStack>
    </Card>
  );
};

const DimensionInput = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) => (
  <div>
    <Text as="p" variant="bodyXs" tone="disabled">
      {label}
    </Text>
    <TextField
      value={value}
      onChange={onChange}
      label=""
      type="number"
      suffix="px"
      autoComplete="off"
    />
  </div>
);

const AlignmentButtons = ({
  alignTop,
  alignMiddleVertical,
  alignBottom,
  alignLeft,
  alignMiddleHorizontal,
  alignRight,
}: {
  alignTop: () => void;
  alignMiddleVertical: () => void;
  alignBottom: () => void;
  alignLeft: () => void;
  alignMiddleHorizontal: () => void;
  alignRight: () => void;
}) => (
  <div className={styles.sizeWrapper}>
    <ButtonGroup variant="segmented" fullWidth>
      <Button icon={ArrowUpIcon} onClick={alignTop}></Button>
      <Button
        onClick={alignMiddleVertical}
        icon={
          <svg
            fill="#000000"
            width="15px"
            height="15px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 12l-3 3h2v4h2v-4h2l-3-3zm3-7h-2V1H9v4H7l3 3 3-3zm5 5c0-.553-.048-1-.6-1H2.6c-.552 0-.6.447-.6 1 0 .551.048 1 .6 1h14.8c.552 0 .6-.449.6-1z"></path>
          </svg>
        }
      ></Button>
      <Button icon={ArrowDownIcon} onClick={alignBottom}></Button>
    </ButtonGroup>
    <ButtonGroup variant="segmented" fullWidth>
      <Button icon={ArrowLeftIcon} onClick={alignLeft}></Button>
      <Button
        onClick={alignMiddleHorizontal}
        icon={
          <svg
            fill="#000000"
            width="15px"
            height="15px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            transform="rotate(90)"
          >
            <path d="M10 12l-3 3h2v4h2v-4h2l-3-3zm3-7h-2V1H9v4H7l3 3 3-3zm5 5c0-.553-.048-1-.6-1H2.6c-.552 0-.6.447-.6 1 0 .551.048 1 .6 1h14.8c.552 0 .6-.449.6-1z"></path>
          </svg>
        }
      ></Button>
      <Button icon={ArrowRightIcon} onClick={alignRight}></Button>
    </ButtonGroup>
  </div>
);
