import { defineLive } from "next-sanity/live";
// import your local configured client
import { client } from "./client";
// set your viewer token
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("Missing SANITY_API_READ_TOKEN");
}
// export the sanityFetch helper and the SanityLive component
export const { sanityFetch, SanityLive } = defineLive({
  client: client.withConfig({
    stega: {
      enabled: true,
      // Point this to where your Sanity Studio is hosted (e.g., '/studio' if embedded, or a local/production URL)
      studioUrl:
        process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || "http://localhost:3333",
    },
  }),
  serverToken: token,
  browserToken: token,
});
