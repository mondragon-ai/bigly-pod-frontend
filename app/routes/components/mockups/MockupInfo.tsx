import { mockup_data } from "~/routes/lib/data/mockups";
import { DescriptionList, Text } from "@shopify/polaris";
import { MockupDocument } from "~/routes/lib/types/mockups";

export const MockupInfo = ({ mockup }: { mockup: MockupDocument }) => {
  return (
    <DescriptionList
      gap="tight"
      items={[
        {
          term: "Details",
          description: mockup_data[mockup.type].details,
        },
        {
          term: "Features",
          description: (
            <Text as="p" variant="bodyMd">
              {mockup_data[mockup.type].features}
            </Text>
          ),
        },
        {
          term: "Materials",
          description: mockup_data[mockup.type].material,
        },
      ]}
    />
  );
};
