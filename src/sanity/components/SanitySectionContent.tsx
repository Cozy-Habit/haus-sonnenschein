import { Section } from "@/components";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import {
  resolveSanityLocalizedValue,
  resolveSanityText,
} from "@/sanity/ContentProvider";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { SanityPageSection } from "@/sanity/types";
import BodyRenderer from "./BodyRenderer";

export default function SanitySectionContent({
  section,
  index,
}: {
  section: SanityPageSection;
  index: number;
}) {
  const { lang } = useTranslation();
  const body = resolveSanityLocalizedValue(section.body, lang);

  return (
    <Section
      backgroundColor={index % 2 === 0 ? "creme" : "white"}
      title={resolveSanityText(section.heading, lang)}
      text={<BodyRenderer body={body} key={section._key} />}
      image={
        section.image?.url ? (
          <Image
            src={section.image.url}
            alt={resolveSanityText(section.image.alt, lang)}
            width={section.image.width || 600}
            height={section.image.height || 400}
          />
        ) : undefined
      }
      buttonText={resolveSanityText(section.callToActionLabel, lang)}
      buttonHref={section.callToActionUrl ?? undefined}
      isReverse={index % 2 !== 0}
    />
  );
}
