import { Hero, Section, Testimonials } from "@/components";
import {
  resolveSanityLocalizedValue,
  resolveSanityText,
} from "@/sanity/ContentProvider";
import { useTranslation } from "@/i18n/LanguageProvider";
import type { SanityPage } from "@/sanity/types";
import BodyRenderer from "@/sanity/components/BodyRenderer";

export default function SanityHomePage({
  heroSubtitle,
  testimonials,
  sections,
  title,
}: SanityPage<"homePage">) {
  const { lang } = useTranslation();
  return (
    <>
      <Hero subtitle={resolveSanityText(heroSubtitle, lang)} />
      {testimonials && (
        <Testimonials
          title={resolveSanityText(title, lang)}
          items={testimonials.map((item) => ({
            _id: item._id,
            authorName: item.authorName,
            imageUrl: item.imageUrl,
            quote: resolveSanityLocalizedValue(item.quote, lang) ?? "",
          }))}
        />
      )}
      {sections?.map((section, index) => {
        const body = resolveSanityLocalizedValue(section.body, lang);
        const headline = resolveSanityText(section.heading, lang);
        return (
          <Section
            key={section._key}
            backgroundColor={index % 2 === 0 ? "creme" : "white"}
            headline={headline}
            text={<BodyRenderer body={body} />}
            src={section.image?.url}
            alt={resolveSanityText(section.image?.alt, lang)}
            buttonText={resolveSanityText(section.callToActionLabel, lang)}
            buttonHref={section.callToActionUrl ?? undefined}
            isReverse={index % 2 !== 0}
          />
        );
      })}
    </>
  );
}
