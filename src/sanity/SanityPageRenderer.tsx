"use client";

import {
  SanityHomePage,
  SanityAboutPage,
  SanityCarePage,
  SanityGalleryPage,
  SanityLegalNoticePage,
} from "./pages";
import type { SanityContent } from "./types";

export default function SanityPageRenderer({
  document,
}: {
  document: SanityContent[number];
}) {
  switch (document._type) {
    case "homePage":
      return <SanityHomePage {...document} />;
    case "aboutPage":
      return <SanityAboutPage {...document} />;
    case "carePage":
      return <SanityCarePage {...document} />;
    case "galleryPage":
      return <SanityGalleryPage {...document} />;
    case "legalNoticePage":
      return <SanityLegalNoticePage {...document} />;
  }
}
