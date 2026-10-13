"use client";

import { useSanityPage } from "@/sanity/ContentProvider";
import SanityPageRenderer from "@/sanity/SanityPageRenderer";

export default function Tagesmutter() {
  const sanityPage = useSanityPage("aboutPage");
  return sanityPage ? <SanityPageRenderer document={sanityPage} /> : null;
}
