import {
  GeneratorStateProps,
  MockupDocument,
} from "~/routes/lib/types/mockups";
import { useCallback } from "react";
import { Card } from "@shopify/polaris";
import styles from "./Mockups.module.css";
import { mockup_data } from "~/routes/lib/data/mockups";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";

export const GeneratorMockupImageCard = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  return (
    <Card padding="200">
      <div className={styles.mockupContainer}>
        <img
          src={mockup_data[mockup.type].image}
          alt={mockup.title}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: 0 }}
        />
        <DraggableResizableImage mockup={mockup} setMockup={setMockup} />
      </div>
    </Card>
  );
};

const DraggableResizableImage = ({
  mockup,
  setMockup,
}: {
  mockup: MockupDocument;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const padding_top =
    mockup.type == "hoodie_lane_7"
      ? "0px"
      : mockup.type == "shirt_gilden"
        ? "0px"
        : "-50px";
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
    <div className={styles.mockupWrapper} style={{ top: padding_top }}>
      <Rnd
        bounds="parent"
        size={{
          width: mockup.dimension.resized_width,
          height: mockup.dimension.resized_height,
        }}
        position={{ x: mockup.position.left, y: mockup.position.top }}
        lockAspectRatio
        onDragStop={handleDragStop}
        maxWidth={225}
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
