"use client";
import { useSanityPage } from "@/sanity/ContentProvider";
import SanityPageRenderer from "@/sanity/SanityPageRenderer";

export default function Home() {
  const sanityPage = useSanityPage("homePage");
  return sanityPage ? <SanityPageRenderer document={sanityPage} /> : null;
}
