import { Layout, Page } from "@shopify/polaris";
import { MockupTypes } from "./lib/types/mockups";
import { CatalogCard } from "./components/mockups";
import { Footer } from "./components/layout/Footer";
import { VideoCard } from "./components/home";

export default function GeneratorPage() {
  return (
    <Page title={`Catalog`} subtitle={"Select a style and start creating"}>
      <Layout>
        <Layout.Section>
          <VideoCard url="https://player.vimeo.com/video/1007458461?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" />
        </Layout.Section>
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
