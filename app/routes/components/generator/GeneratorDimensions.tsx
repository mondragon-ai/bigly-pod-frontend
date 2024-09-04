import {
  BlockStack,
  Button,
  ButtonGroup,
  Card,
  Text,
  TextField,
} from "@shopify/polaris";
import { useCallback } from "react";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowLeftIcon,
} from "@shopify/polaris-icons";
import styles from "./Mockups.module.css";
import { GeneratorStateProps } from "~/routes/lib/types/mockups";
import { MOCKUP_DIMENSIONS } from "~/routes/lib/constants";

export const calculateAspectRatio = (width: number, height: number) =>
  width / (height || 1);

export const GeneratorDimensions = ({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const { width, height } =
    MOCKUP_DIMENSIONS[mockup.type] || MOCKUP_DIMENSIONS.default;

  const currentHeightKey = mockup.isFront
    ? "resized_height_front"
    : "resized_height_back";
  const currentWidthKey = mockup.isFront
    ? "resized_width_front"
    : "resized_width_back";

  const currentTopKey = mockup.isFront ? "top_front" : "top_back";
  const currentLeftKey = mockup.isFront ? "left_front" : "left_back";

  const handleWidthChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => {
        const newWidth = Number(value);

        const aspectRatio = calculateAspectRatio(
          prevMockup.dimension[currentWidthKey],
          prevMockup.dimension[currentHeightKey],
        );
        const neHeight = Math.round(newWidth * aspectRatio);
        return {
          ...prevMockup,
          dimension: {
            ...prevMockup.dimension,
            [currentWidthKey]:
              newWidth <= width || neHeight <= height ? newWidth : newWidth,
            [currentHeightKey]:
              neHeight <= height || newWidth <= width ? neHeight : height,
          },
        };
      });
    },
    [mockup, setMockup],
  );

  const handleHeightChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => {
        const newHeight = Number(value);

        const aspectRatio = calculateAspectRatio(
          prevMockup.dimension[currentWidthKey],
          prevMockup.dimension[currentHeightKey],
        );

        const newWidth = Math.round(newHeight * aspectRatio);
        return {
          ...prevMockup,
          dimension: {
            ...prevMockup.dimension,
            [currentHeightKey]:
              newHeight <= height || newHeight <= height ? newHeight : height,
            [currentWidthKey]:
              newWidth <= width || newHeight <= height ? newWidth : width,
          },
        };
      });
    },
    [mockup, setMockup],
  );

  const handleTopChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: {
          ...prevMockup.position,
          [currentTopKey]: Number(value),
        },
      }));
    },
    [mockup, setMockup],
  );

  const handleLeftChange = useCallback(
    (value: string) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: {
          ...prevMockup.position,
          [currentLeftKey]: Number(value),
        },
      }));
    },
    [mockup, setMockup],
  );

  const alignLeft = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentLeftKey]: 0,
      },
    }));
  }, [mockup, setMockup]);

  const alignTop = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentTopKey]: 0,
      },
    }));
  }, [mockup, setMockup]);

  const alignBottom = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentTopKey]: height - prevMockup.dimension[currentHeightKey],
      },
    }));
  }, [mockup, setMockup]);

  const alignRight = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentLeftKey]: width - prevMockup.dimension[currentWidthKey],
      },
    }));
  }, [mockup, setMockup]);

  const alignMiddleHorizontal = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentLeftKey]: Math.round(
          (width - prevMockup.dimension[currentWidthKey]) / 2,
        ),
      },
    }));
  }, [mockup, setMockup]);

  const alignMiddleVertical = useCallback(() => {
    setMockup((prevMockup) => ({
      ...prevMockup,
      position: {
        ...prevMockup.position,
        [currentTopKey]: Math.round(
          (height - prevMockup.dimension[currentHeightKey]) / 2,
        ),
      },
    }));
  }, [mockup, setMockup]);

  return (
    <Card>
      <BlockStack gap="400">
        <Text as="h4" variant="headingMd">
          Dimensions
        </Text>

        <div className={styles.sizeWrapper}>
          <DimensionInput
            label="Width"
            value={String(mockup.dimension[currentWidthKey])}
            onChange={handleWidthChange}
          />
          <DimensionInput
            label="Height"
            value={String(mockup.dimension[currentHeightKey])}
            onChange={handleHeightChange}
          />
        </div>

        <div className={styles.sizeWrapper}>
          <DimensionInput
            label="Top"
            value={String(mockup.position[currentTopKey])}
            onChange={handleTopChange}
          />
          <DimensionInput
            label="Left"
            value={String(mockup.position[currentLeftKey])}
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
