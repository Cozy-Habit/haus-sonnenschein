import { ColorfulText, Gallery } from "@/components";
import { resolveSanityText } from "@/sanity/ContentProvider";
import {useTranslation} from "@/i18n/LanguageProvider";
import type { SanityPage } from "@/sanity/types";

export default function SanityGalleryPage({
  title,
  galleryItems,
}: SanityPage<"galleryPage">) {
  const {lang} = useTranslation();
  const pageTitle = resolveSanityText(title, lang);
  return (
    <>
      <ColorfulText type="h1" text={pageTitle} />
      {galleryItems && <Gallery items={galleryItems} />}
    </>
  );
}
