"use client";

import { useSanityPage } from "@/sanity/ContentProvider";
import SanityPageRenderer from "@/sanity/SanityPageRenderer";

export default function Raeumlichkeiten() {
  const sanityPage = useSanityPage("galleryPage");
  return sanityPage ? <SanityPageRenderer document={sanityPage} /> : null;
}
