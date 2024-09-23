import {
  Await,
  FetcherWithComponents,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { OrderDocument } from "./lib/types/orders";
import { Footer } from "./components/layout/Footer";
import { DeleteIcon, MoneyIcon } from "@shopify/polaris-icons";
import { chargeOrderCallback, deleteOrderCallback } from "./services/orders";
import { LoadingSkeleton } from "./components/skeleton";
import { useAppBridge } from "@shopify/app-bridge-react";
import { formatDateLong } from "./lib/formatters/numbers";
import { orderAction, orderLoader } from "./models/orders.server";
import { ErrorStateProps, ResponseProp } from "./lib/types/shared";
import { Suspense, useCallback, useEffect, useState } from "react";
import { Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { Customer, Order, OrderDetail, Price } from "./components/orders/index";

export const loader = orderLoader;
export const action = orderAction;

export type FetcherProp = FetcherWithComponents<ResponseProp>;

export default function OrdersPage() {
  const shopify = useAppBridge();
  const data = useLoaderData<typeof orderLoader>();
  const fetcher = useFetcher<typeof orderAction>() as FetcherProp;
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorStateProps>(null);

  const response = fetcher.data;

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const handleDelete = useCallback(async () => {
    await deleteOrderCallback(fetcher, setLoading);
  }, [fetcher]);

  const handleCharge = useCallback(async () => {
    await chargeOrderCallback(fetcher, setLoading);
  }, [fetcher]);

  useEffect(() => {
    if (response) {
      handleMockupResponse(response, shopify, setError, setLoading);
    }
  }, [shopify, response]);

  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <Await resolve={data}>
        {(loadedData) => {
          const order = loadedData.order as OrderDocument | null;
          if (!order) {
            return <LoadingSkeleton />; // TODO: Edit loading
          }
          return (
            <Page
              backAction={{ content: "Order", url: "/app/orders" }}
              title={`#${String(order.merchant_order.order_number)}`}
              subtitle={formatDateLong(
                Number(order.created_at?._seconds) * 1000,
              )}
              primaryAction={{
                content: "Delete Order",
                disabled: isLoading || loading,
                loading: isLoading || loading,
                icon: DeleteIcon,
                destructive: true,
                onAction: handleDelete,
              }}
              secondaryActions={[
                {
                  content: "Charge & Fulfill",
                  disabled:
                    order.fulfillment_status !== "BILLING" ||
                    isLoading ||
                    loading,
                  loading: isLoading || loading,
                  icon: MoneyIcon,
                  onAction: handleCharge,
                },
              ]}
            >
              <Layout>
                <Layout.Section>
                  {error && (
                    <Banner
                      title={error.title}
                      tone={error.type}
                      onDismiss={() => setError(null)}
                    >
                      <p>{error.message}</p>
                    </Banner>
                  )}
                </Layout.Section>
                <Layout.Section>
                  <BlockStack gap={"500"}>
                    <Order order={order} />
                    <Price order={order} />
                  </BlockStack>
                </Layout.Section>

                <Layout.Section variant="oneThird">
                  <BlockStack gap={"500"}>
                    <Customer order={order} />
                    <OrderDetail order={order} />
                  </BlockStack>
                </Layout.Section>
              </Layout>
              <Layout>
                <Layout.Section>
                  <Footer />
                </Layout.Section>
              </Layout>
            </Page>
          );
        }}
      </Await>
    </Suspense>
  );
}

/**
 * Handle the response from the order API.
 * @param {ResponseProp} response - The response from the API.
 * @param {any} shopify - The Shopify app bridge instance.
 * @param {Function} setError - The function to set the error state.
 * @param {Function} setLoading - The function to set the loading state.
 */
function handleMockupResponse(
  response: ResponseProp,
  shopify: any,
  setError: Function,
  setLoading: Function,
) {
  console.log(response.type);
  if (response.error) {
    setError({
      title: response.type === "delete" ? "Deleting Order" : "Charging Error",
      message: response.error,
      type: "critical",
    });
  } else {
    switch (response.type) {
      case "charge":
        shopify.toast.show("Order Charged & Fulfilled");
        break;
      case "delete":
        shopify.toast.show("Order Deleted");
        break;

      default:
        break;
    }
  }
  setLoading(false);
}
