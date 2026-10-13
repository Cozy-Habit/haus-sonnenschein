import { ColorfulText } from "@/components";
import Image from "next/image";
import {
  resolveSanityLocalizedValue,
  resolveSanityText,
} from "@/sanity/ContentProvider";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { SanityPage } from "@/sanity/types";
import styles from "./SanityCarePage.module.scss";
import BodyRenderer from "@/sanity/components/BodyRenderer";

export default function SanityCarePage({
  title,
  careSections,
}: SanityPage<"carePage">) {
  const { lang } = useTranslation();
  const pageTitle = resolveSanityText(title, lang);
  return (
    <>
      <ColorfulText type="h1" text={pageTitle} />
      {careSections?.map((section) => {
        const images = section.galleryItemsRef;
        const body = resolveSanityLocalizedValue(section.body, lang);
        if (body)
          return (
            <div className={styles.sectionWrapper} key={section._key}>
              <div className={styles.section}>
                <BodyRenderer body={body} key={section._key} />
                <div className={styles.section__images}>
                  {images?.map((galleryItem) => {
                    const image = galleryItem.image;
                    if (image?.url)
                      return (
                        <Image
                          key={galleryItem._id}
                          src={image.url || ""}
                          alt={image?.alt ?? ""}
                          width={image.width ?? 600}
                          height={image.height ?? 400}
                        />
                      );
                  })}
                </div>
              </div>
            </div>
          );
      })}
    </>
  );
}
