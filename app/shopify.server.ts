import {
  ApiVersion,
  AppDistribution,
  BillingInterval,
  DeliveryMethod,
  shopifyApp,
} from "@shopify/shopify-app-remix/server";
import prisma from "./db.server";
import "@shopify/shopify-app-remix/adapters/node";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";

export const USAGE_PLAN = "Pay As You Go";

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  billing: {
    [USAGE_PLAN]: {
      lineItems: [
        {
          amount: 5000,
          currencyCode: "USD",
          interval: BillingInterval.Usage,
          terms:
            "Usage charges apply per item sold that is generated using the mockup from the app, starting at $11.",
        },
      ],
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  webhooks: {
    APP_SUBSCRIPTIONS_UPDATE: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "webhooks",
    },
    FULFILLMENT_ORDERS_CANCELLATION_REQUEST_SUBMITTED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "webhooks",
    },
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = ApiVersion.July24;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;
