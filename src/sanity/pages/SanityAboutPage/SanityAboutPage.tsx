import { ColorfulText, Section } from "@/components";
import {
  resolveSanityLocalizedValue,
  resolveSanityText,
} from "@/sanity/ContentProvider";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { SanityPage } from "@/sanity/types";
import BodyRenderer from "@/sanity/components/BodyRenderer";

export default function SanityAboutPage({
  title,
  sections,
}: SanityPage<"aboutPage">) {
  const { lang } = useTranslation();
  const pageTitle = resolveSanityText(title, lang);

  return (
    <>
      <ColorfulText type="h1" text={pageTitle} />
      {sections?.map((section, index) => {
        const body = resolveSanityLocalizedValue(section.body, lang);
        return (
          <Section
            backgroundColor={index % 2 === 0 ? "creme" : "white"}
            title={resolveSanityText(section.heading, lang)}
            text={<BodyRenderer body={body} key={section._key} />}
            src={section.image.url}
            alt={resolveSanityText(section.image.alt, lang)}
            isReverse={index % 2 !== 0}
          />
        );
      })}
    </>
  );
}
