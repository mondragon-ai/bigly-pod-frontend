import {
  NavigateFunction,
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "@remix-run/react";
import { mockup_dummy } from "./lib/data/mockups";
import { uploadToServer } from "./lib/util/images";
import { Footer } from "./components/layout/Footer";
import { ErrorStateProps } from "./lib/types/shared";
import { ProductAddIcon } from "@shopify/polaris-icons";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useCallback, useEffect, useState } from "react";
import { generateRandomString } from "./lib/util/mockups";
import { Banner, BlockStack, Layout, Page } from "@shopify/polaris";
import { convertToMockupRequestBody } from "./lib/payloads/mockups";
import { GeneratorStateProps, MockupTypes } from "./lib/types/mockups";
import { generatorAction, generatorLoader } from "./models/generator.server";
import {
  GeneratorColors,
  GeneratorDimensions,
  GeneratorMockupDetail,
  GeneratorMockupImage,
  GeneratorMockupImageCard,
} from "./components/generator";
import { MockupInfo } from "./components/mockups";

export const loader = generatorLoader;
export const action = generatorAction;

export default function GeneratorPage() {
  const fetcher = useFetcher<typeof action>();
  const { shop } = useLoaderData<typeof loader>();
  const shopify = useAppBridge();
  const location = useLocation();
  const navigate = useNavigate();
  const [isFront, setFront] = useState(true);
  const slug = location.pathname.split("/").pop() as MockupTypes;
  const [error, setError] = useState<ErrorStateProps>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [mockup, setMockup] = useState<GeneratorStateProps>({
    ...mockup_dummy,
    base_sku: generateRandomString(5, slug),
    type: slug.replaceAll("-", "_") as MockupTypes,
    original_file: null,
    progress: 0,
  });

  const isLoading =
    ["loading", "submitting"].includes(fetcher.state) &&
    fetcher.formMethod === "POST";

  const repsonse = fetcher.data;

  useEffect(() => {
    if (shop) {
      setMockup((prev) => ({ ...prev, domain: shop }));
    }
    if (repsonse) {
      handleResponse(repsonse, shopify, setError, setLoading, navigate);
    }
  }, [shop, repsonse]);

  const handleSubmit = useCallback(async () => {
    if (validateMockup(mockup, setError)) {
      setLoading(true);
      try {
        const design_url = await uploadToServer(
          mockup.original_file,
          setMockup,
          mockup,
        );
        const formData = new FormData();
        const payload = convertToMockupRequestBody(mockup, design_url);
        formData.append("mockup", JSON.stringify(payload));
        fetcher.submit(formData, { method: "POST" });
      } catch (error) {
        console.error("Error uploading design:", error);
        setLoading(false);
      }
    }
  }, [mockup, fetcher]);

  return (
    <Page
      backAction={{ content: "Order", url: "/app/catalog" }}
      title={mockup.title !== "" ? mockup.title : "Create Name"}
      subtitle={"Design and Generate Your Mockup"}
      primaryAction={{
        content: "Create Mockup",
        disabled: !!mockup.product_id,
        icon: ProductAddIcon,
        loading: isLoading || loading,
        onAction: handleSubmit,
      }}
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
          <BlockStack gap="500">
            <GeneratorMockupImageCard
              mockup={mockup}
              setMockup={setMockup}
              isFront={isFront}
              setFront={setFront}
            />
            <MockupInfo mockup={mockup} />
          </BlockStack>
        </Layout.Section>

        <Layout.Section variant="oneThird">
          <BlockStack gap="500">
            <GeneratorColors mockup={mockup} setMockup={setMockup} />
            <GeneratorMockupImage
              mockup={mockup}
              setMockup={setMockup}
              isFront={isFront}
              setFront={setFront}
            />
            <GeneratorDimensions
              mockup={mockup}
              setMockup={setMockup}
              isFront={isFront}
              setFront={setFront}
            />
            <GeneratorMockupDetail mockup={mockup} setMockup={setMockup} />
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
}

/**
 * Handle the response from the mockup generate API.
 * @param {ResponseProp} response - The response from the API.
 * @param {any} shopify - The Shopify app bridge instance
 * @param {Function} setError - The function to set the error state.
 * @param {Function} setLoading - The function to set the loading state.
 */
const handleResponse = (
  response: any,
  shopify: any,
  setError: React.Dispatch<React.SetStateAction<ErrorStateProps>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
) => {
  if (response?.error) {
    setError({
      title: "Generating Mockup",
      message: response.error,
      type: "critical",
    });
    setLoading(false);
  } else {
    shopify.toast.show("Mockup Created");
    setLoading(false);
    navigate(`/app/mockup/${response.mockup?.mockups.design_id}`);
  }
  setLoading(false);
};

/**
 * Validate the mockup data before submission.
 * @param {GeneratorStateProps} mockup - The mockup data to validate.
 * @param {Function} setError - The function to set the error state.
 * @returns {boolean} - Whether the mockup data is valid.
 */
const validateMockup = (
  mockup: GeneratorStateProps,
  setError: React.Dispatch<React.SetStateAction<ErrorStateProps>>,
) => {
  if (mockup.title.length < 4) {
    setError({
      title: "Mockup Title",
      message: "Please add a title or make it greater than 3 characters",
      type: "warning",
    });
    return false;
  }
  if (!mockup.design_urls.front) {
    setError({
      title: "Mockup Design",
      message: "Please upload a design image.",
      type: "warning",
    });
    return false;
  }
  if (!mockup.colors?.length) {
    setError({
      title: "Mockup Colors",
      message: "Please select at least one color for the mockup.",
      type: "warning",
    });
    return false;
  }
  return true;
};
