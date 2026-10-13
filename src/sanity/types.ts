import type {
  AllSanitySchemaTypes,
  PAGE_CONTENT_QUERY_RESULT,
} from "../../sanity.types";

type ExtractTypeName<T> = T extends { _type: infer Type extends string }
  ? Type
  : never;

export type SanitySchemaTypeName = ExtractTypeName<AllSanitySchemaTypes>;
export type SanityContent = PAGE_CONTENT_QUERY_RESULT;
export type SanityPageDocument = SanityContent[number];
export type SanityPageType = SanityPageDocument["_type"];
export type SanityPage<Type extends SanityPageType> = Extract<
  SanityPageDocument,
  { _type: Type }
>;

export type SanityPageSection = NonNullable<
  SanityPage<"homePage" | "aboutPage">["sections"]
>[number];

export type SanityCareSection = NonNullable<
  SanityPage<"carePage">["careSections"]
>[number];

export type SanityGalleryItem = NonNullable<
  SanityPage<"galleryPage">["galleryItems"]
>[number];

export type SanityHomeTestimonial = NonNullable<
  SanityPage<"homePage">["testimonials"]
>[number];
