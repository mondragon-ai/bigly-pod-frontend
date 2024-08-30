import {
  FeaturedProducts,
  HighlightStats,
  HowTo,
  OrderSummary,
  ProFroma,
  RecommendedApps,
  VideoCard,
} from "./components/home";
import { Suspense } from "react";
import { indexLoader } from "./models/home";
import { Page, Layout } from "@shopify/polaris";
import { Await, useNavigate } from "@remix-run/react";
import { AnalyticsProps } from "./lib/types/analytics";
import { capitalizeEachWord } from "./lib/formatters/text";
import { LoadingSkeleton } from "./components/skeleton";
import { Footer } from "./components/layout/Footer";

export const loader = indexLoader;

interface MerchantLoaderData {
  shop: string;
  analytics: AnalyticsProps[];
}

export default function Index() {
  // const data = useLoaderData<MerchantLoaderData>();
  const navigate = useNavigate();

  return (
    <Page
      title={`Welcome Back, ${capitalizeEachWord(String("").split(".")[0])}`}
      subtitle="Dashboard"
      primaryAction={{
        content: "Create Mockup",
        disabled: false,
        onAction: () => navigate("/app/catalog"),
      }}
    >
      <Suspense fallback={<LoadingSkeleton />}>
        <Await resolve={[]}>
          {(loadedData) => {
            // const analytics = handleAnalytics(loadedData.analytics as any[]);
            // const { awaiting, fulfilled } = calculateOrderHighlights(
            //   loadedData.analytics as any[],
            // );

            return (
              <Layout>
                <Layout.Section>
                  <OrderSummary
                    orders={false}
                    awaiting={0}
                    fulfilled={0}
                    failed={0}
                  />
                </Layout.Section>
                <Layout.Section>
                  <HighlightStats sold={0} revenue={0} analytics={false} />
                </Layout.Section>
                <Layout.Section>
                  <HowTo />
                </Layout.Section>
                <Layout.Section>
                  <FeaturedProducts />
                </Layout.Section>
                <Layout.Section>
                  <ProFroma />
                </Layout.Section>
                <Layout.Section>
                  <VideoCard />
                </Layout.Section>
                <Layout.Section>
                  <RecommendedApps />
                </Layout.Section>
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            );
          }}
        </Await>
      </Suspense>
    </Page>
  );
}
