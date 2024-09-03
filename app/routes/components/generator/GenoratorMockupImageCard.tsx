import {
  GeneratorStateProps,
  MockupDocument,
} from "~/routes/lib/types/mockups";
import { useCallback, useState } from "react";
import { Button, Card } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { mockup_data } from "~/routes/lib/data/mockups";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";
import { HOODIE_STRING } from "~/routes/lib/constants";

export const GeneratorMockupImageCard = ({
  mockup,
  setMockup,
  isFront,
  setFront,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
  isFront: boolean;
  setFront: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [strings, toggleStrings] = useState(true);
  return (
    <Card padding="200">
      <div className={styles.mockupContainer}>
        <img
          src={
            isFront
              ? mockup_data[mockup.type].front["WHITE"]
              : mockup_data[mockup.type].back["WHITE"]
          }
          alt={mockup.title}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: 0 }}
        />
        <DraggableResizableImage
          mockup={mockup}
          setMockup={setMockup}
          front={isFront}
        />
        {isFront && strings && mockup.type.includes("hoodie") && (
          <img
            src={HOODIE_STRING}
            alt={mockup.title}
            className={styles.mainImg}
            height="500"
            width="500"
            style={{ position: "absolute", top: 0 }}
          />
        )}
      </div>
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
        <Button onClick={() => setFront(!isFront)}>
          {isFront ? "Front" : "Back"}
        </Button>
        {mockup.type.includes("hoodie") && (
          <Button onClick={() => toggleStrings(!strings)}>Toggle String</Button>
        )}
      </div>
    </Card>
  );
};

const DraggableResizableImage = ({
  mockup,
  setMockup,
  front,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
  front: boolean;
}) => {
  const padding_top =
    mockup.type == "hoodie_lane_7" && front
      ? "-35px"
      : mockup.type == "shirt_gilden" && front
        ? "0px"
        : mockup.type == "hoodie_lane_7" && !front
          ? "-30px"
          : mockup.type == "shirt_gilden" && !front
            ? "-40px"
            : "";

  const width =
    mockup.type == "hoodie_lane_7"
      ? "200px"
      : mockup.type == "shirt_gilden"
        ? "225px"
        : "200px";

  const height =
    mockup.type == "hoodie_lane_7"
      ? "200px"
      : mockup.type == "shirt_gilden"
        ? "400px"
        : "400px";
  const handleDragStop = useCallback(
    (e: any, d: DraggableData) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: {
          top: d.y,
          left: d.x,
        },
      }));
    },
    [setMockup],
  );

  const handleResize = useCallback(
    (
      e: MouseEvent | TouchEvent,
      direction: any,
      ref: HTMLElement,
      delta: ResizableDelta,
      position: Position,
    ) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        dimension: {
          ...prevMockup.dimension,
          resized_height: ref.offsetHeight,
          resized_width: ref.offsetWidth,
        },
        position: {
          top: position.y,
          left: position.x,
        },
      }));
    },
    [setMockup],
  );

  return (
    <div
      className={styles.mockupWrapper}
      style={{
        top: padding_top,
        width: width,
        maxWidth: width,
        minWidth: width,
        height: height,
        maxHeight: height,
        minHeight: height,
      }}
    >
      <Rnd
        bounds="parent"
        size={{
          width: mockup.dimension.resized_width,
          height: mockup.dimension.resized_height,
        }}
        position={{ x: mockup.position.left, y: mockup.position.top }}
        lockAspectRatio
        onDragStop={handleDragStop}
        maxWidth={width}
        maxHeight={400}
        onResize={handleResize}
      >
        <img
          src={mockup.resized_design}
          alt=""
          style={{
            width: mockup.dimension.resized_width,
            height: mockup.dimension.resized_height,
          }}
        />
      </Rnd>
    </div>
  );
};
