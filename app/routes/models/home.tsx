import { authenticate } from "~/shopify.server";
// import { SERVER_BASE_URL } from "../lib/constants";
import { LoaderFunctionArgs } from "@remix-run/node";
import { AnalyticsProps } from "../lib/types/analytics";

/**
 * Fetches the analytics data for the shop and returns it along with the shop name.
 * @param {LoaderFunctionArgs} args - The arguments for the loader function.
 * @returns {Promise<{ shop: string; analytics: AnalyticsProps[] }>} The shop name and analytics data.
 */
export async function indexLoader({
  request,
}: LoaderFunctionArgs): Promise<{ shop: string; analytics: AnalyticsProps[] }> {
  const admin = await authenticate.admin(request);

  // TODO: Fetch timezone

  try {
    // const response = await fetch(
    //   `${SERVER_BASE_URL}/store/${admin.session.shop}/analytics?time_frame=thirty_days&timezone=America/New_York`,
    // );

    return {
      shop: admin.session.shop,
      analytics: [],
    };

    // const data = (await response.json()) as {
    //   text: string;
    //   analytics: AnalyticsProps[];
    // };
    // return {
    //   shop: admin.session.shop,
    //   analytics: data.analytics,
    // };
  } catch (error) {
    console.error("Error fetching analytics data:", error);
    throw new Response("Failed to load data", { status: 500 });
  }
}
