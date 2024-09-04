import styles from "./Mockups.module.css";
import { useCallback, useState } from "react";
import { Button, Card } from "@shopify/polaris";
import { HOODIE_STRING } from "~/routes/lib/constants";
import { mockup_data } from "~/routes/lib/data/mockups";
import { GeneratorStateProps } from "~/routes/lib/types/mockups";
import { DraggableData, Position, ResizableDelta, Rnd } from "react-rnd";

export const GeneratorMockupImageCard = ({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const [strings, toggleStrings] = useState(true);
  return (
    <Card padding="200">
      <div className={styles.mockupContainer}>
        <img
          src={
            mockup.isFront
              ? mockup_data[mockup.type].front["WHITE"]
              : mockup_data[mockup.type].back["WHITE"]
          }
          alt={mockup.title}
          className={styles.mainImg}
          height="500"
          width="500"
          style={{ position: "absolute", top: 0 }}
        />
        <DraggableResizableImage mockup={mockup} setMockup={setMockup} />
        {mockup.isFront && strings && mockup.type.includes("hoodie") && (
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
        <Button
          onClick={() =>
            setMockup((prev) => ({ ...prev, isFront: !mockup.isFront }))
          }
        >
          {mockup.isFront ? "Front" : "Back"}
        </Button>
        {mockup.type.includes("hoodie") && (
          <Button onClick={() => toggleStrings(!strings)}>Toggle String</Button>
        )}
      </div>
      {mockup.design_urls.sleeve !== "" &&
        mockup.isFront &&
        !mockup.type.includes("hoodie") && (
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
            <img
              src={mockup.design_urls.sleeve}
              alt=""
              style={{
                width: 80,
                height: 50,
                maxWidth: 80,
                maxHeight: 50,
                objectFit: "contain",
                transform:
                  mockup.sleeve_side == "LEFT"
                    ? "rotate(25deg)"
                    : "rotate(-25deg)",
                position: "absolute",
                left: mockup.sleeve_side == "LEFT" ? 75 : 450,
                top: mockup.sleeve_side == "LEFT" ? 150 : 150,
                border: "1px solid red",
              }}
            />
          </div>
        )}
    </Card>
  );
};

const DraggableResizableImage = ({
  mockup,
  setMockup,
}: {
  mockup: GeneratorStateProps;
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>;
}) => {
  const { handleDragStop, handleResize } = useMockupHandlers(mockup, setMockup);

  const padding_top = getPaddingTop(mockup);
  const { width, height } = getDimensions(mockup);

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
          width:
            mockup.dimension[
              mockup.isFront ? "resized_width_front" : "resized_width_back"
            ],
          height:
            mockup.dimension[
              mockup.isFront ? "resized_height_front" : "resized_height_back"
            ],
        }}
        position={{
          x: mockup.position[mockup.isFront ? "left_front" : "left_back"],
          y: mockup.position[mockup.isFront ? "top_front" : "top_back"],
        }}
        lockAspectRatio
        onDragStop={handleDragStop}
        maxWidth={width}
        maxHeight={400}
        onResize={handleResize}
      >
        {mockup.design_urls[mockup.isFront ? "front" : "back"] !== "" && (
          <img
            src={mockup.design_urls[mockup.isFront ? "front" : "back"]}
            alt=""
            style={{
              width:
                mockup.dimension[
                  mockup.isFront ? "resized_width_front" : "resized_width_back"
                ],
              height:
                mockup.dimension[
                  mockup.isFront
                    ? "resized_height_front"
                    : "resized_height_back"
                ],
            }}
          />
        )}
      </Rnd>
    </div>
  );
};

/**
 * Custom hook for handling mockup drag and resize events
 * @param mockup Current mockup state
 * @param setMockup Function to update the mockup state
 */
export const useMockupHandlers = (
  mockup: GeneratorStateProps,
  setMockup: React.Dispatch<React.SetStateAction<GeneratorStateProps>>,
) => {
  const handleDragStop = useCallback(
    (e: any, d: DraggableData) => {
      setMockup((prevMockup) => ({
        ...prevMockup,
        position: {
          ...prevMockup.position,
          [mockup.isFront ? "top_front" : "top_back"]: d.y,
          [mockup.isFront ? "left_front" : "left_back"]: d.x,
        },
      }));
    },
    [mockup.isFront, setMockup],
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
          [mockup.isFront ? "resized_height_front" : "resized_height_back"]:
            ref.offsetHeight,
          [mockup.isFront ? "resized_width_front" : "resized_width_back"]:
            ref.offsetWidth,
        },
        position: {
          ...prevMockup.position,
          [mockup.isFront ? "top_front" : "top_back"]: position.y,
          [mockup.isFront ? "left_front" : "left_back"]: position.x,
        },
      }));
    },
    [mockup.isFront, setMockup], // Include `mockup.isFront` in dependencies
  );

  return { handleDragStop, handleResize };
};

/**
 * Utility function to get padding top based on mockup type and orientation
 * @param mockup
 */
const getPaddingTop = (mockup: GeneratorStateProps): string => {
  switch (mockup.type) {
    case "hoodie_lane_7":
      return mockup.isFront ? "-35px" : "-30px";
    case "shirt_gilden":
      return mockup.isFront ? "0px" : "-40px";
    default:
      return "";
  }
};

/**
 * Utility function to get dimensions based on mockup type
 * @param mockup
 */
const getDimensions = (mockup: GeneratorStateProps) => {
  switch (mockup.type) {
    case "hoodie_lane_7":
      return { width: "200px", height: "200px" };
    case "shirt_gilden":
      return { width: "225px", height: "400px" };
    default:
      return { width: "200px", height: "400px" };
  }
};
