import { client } from "./client";
import { defineQuery } from "groq";
import type { SanityContent } from "./types";

const PAGE_CONTENT_QUERY = defineQuery(`
	*[_type match "*Page"]{
		_id,
		_type,
		"legacyLanguage": language,
		title,
		heroSubtitle,
		submitLabel,
		successMessage,
		addressHeading,
		contactName,
		jobTitle,
		address,
		phone,
		email,
        careSections[]{
            _key,
            body,
			"galleryItemsRef": galleryItemsRef[]->{
                _id,
                displayOrder,
                "image": image{alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}
            }
        },
		sections[]{
			_key,
			heading,
			body,
			"image": image{alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height},
			callToActionLabel,
			callToActionUrl
		},
		"testimonials": testimonials[]->{
			_id,
			authorName,
			quote,
			"imageUrl": portrait.asset->url
		},
		"galleryItems": items[]->{
			_id,
			displayOrder,
			"image": image{alt, "url": asset->url, "width": asset->metadata.dimensions.width, "height": asset->metadata.dimensions.height}
		}
	}
`);

export async function fetchSanityContent(): Promise<SanityContent> {
  try {
    return await client
      .withConfig({ useCdn: false })
      .fetch<SanityContent>(PAGE_CONTENT_QUERY);
  } catch (error) {
    console.error(
      "Unable to fetch published Sanity content during build.",
      error,
    );
    return [];
  }
}
