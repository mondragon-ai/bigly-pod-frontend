import { Layout, Page } from "@shopify/polaris";
import { MockupTypes } from "./lib/types/mockups";
import { CatalogCard } from "./components/mockups";
import { Footer } from "./components/layout/Footer";

export default function GeneratorPage() {
  return (
    <Page title={`Catalog`} subtitle={"Select a style and start creating"}>
      <Layout>
        {MockupTypeList.map((t) => (
          <Layout.Section key={t}>
            <CatalogCard type={t as MockupTypes} />
          </Layout.Section>
        ))}
        <Layout.Section>
          <Footer />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

export const MockupTypeList = ["shirt_gilden", "hoodie_lane_7"];
