import {
  calculateTotalValue,
  formatToMoney,
} from "~/routes/lib/formatters/numbers";
import { InlineGrid } from "@shopify/polaris";
import { AnalyticsCard } from "./AnalyticsCard";
import { LineChartStats, PieChartStats } from "./Charts";
import { DataProps, TopSellerProps } from "~/routes/lib/types/analytics";

type BottomAnalyticsProps = {
  fulfillment: DataProps[];
  types: TopSellerProps[];
  shipping: DataProps[];
};

export const BottomAnalytics = ({
  fulfillment,
  types,
  shipping,
}: BottomAnalyticsProps) => {
  const total_fulfillment = calculateTotalValue(fulfillment);
  const total_shipping = calculateTotalValue(shipping);

  return (
    <InlineGrid gap="400" columns={{ xs: 1, sm: 1, md: 3, lg: 3, xl: 3 }}>
      <AnalyticsCard
        title="Avg. Time To Ship"
        mainValue={String(
          Number(total_fulfillment / fulfillment.length).toFixed(2),
        )}
        subValue="days"
      >
        <LineChartStats data={fulfillment} isMoney={false} />
      </AnalyticsCard>
      <AnalyticsCard title="Type of Hats Sold">
        <PieChartStats data={types} />
      </AnalyticsCard>
      <AnalyticsCard
        title="Avg. Shipping Cost"
        mainValue={`$${formatToMoney(total_shipping / shipping.length)}`}
      >
        <LineChartStats data={shipping} isMoney={true} />
      </AnalyticsCard>
    </InlineGrid>
  );
};
