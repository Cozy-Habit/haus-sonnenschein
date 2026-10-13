"use client";

import { useSanityPage } from "@/sanity/ContentProvider";
import SanityPageRenderer from "@/sanity/SanityPageRenderer";

export default function Impressum() {
  const sanityPage = useSanityPage("legalNoticePage");
  return sanityPage ? <SanityPageRenderer document={sanityPage} /> : null;
}
