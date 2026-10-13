"use client";

import { useSanityPage } from "@/sanity/ContentProvider";
import SanityPageRenderer from "@/sanity/SanityPageRenderer";

export default function Betreuung() {
  const sanityPage = useSanityPage("carePage");
  return sanityPage ? <SanityPageRenderer document={sanityPage} /> : null;
}
