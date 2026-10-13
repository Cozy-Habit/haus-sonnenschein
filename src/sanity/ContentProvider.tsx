"use client";

import { createContext, useContext } from "react";
import { useTranslation } from "@/i18n/LanguageProvider";
import type {
  SanityContent,
  SanityPage as SanityPageResult,
  SanityPageType,
} from "./types";
import {
  InternationalizedArrayString,
  InternationalizedArrayText,
} from "../../sanity.types";

const SanityContentContext = createContext<SanityContent>([]);

export function SanityContentProvider({
  children,
  content,
}: Readonly<{
  children: React.ReactNode;
  content: SanityContent;
}>) {
  return (
    <SanityContentContext.Provider value={content}>
      {children}
    </SanityContentContext.Provider>
  );
}

export function useSanityPage<Type extends SanityPageType>(
  type: Type,
): SanityPageResult<Type> | undefined {
  const content = useContext(SanityContentContext);
  return content.find((item) => item._type === type) as
    SanityPageResult<Type> | undefined;
}

export function useSanityLocalizedValue<T>(
  localizedArray: Array<{ language?: string; value?: T }> | null | undefined,
): T | undefined {
  const { lang } = useTranslation();
  return resolveSanityLocalizedValue(localizedArray, lang);
}

export function resolveSanityLocalizedValue<T>(
  localizedArray: Array<{ language?: string; value?: T }> | null | undefined,
  language: string,
): T | undefined {
  return localizedArray?.find((entry) => entry.language === language)?.value;
}

export function resolveSanityText(
  i18nArray:
    | InternationalizedArrayText
    | InternationalizedArrayString
    | null
    | undefined,
  language: string,
) {
  const NO_CONTENT_FOUND = "No content found";
  if (!i18nArray) return NO_CONTENT_FOUND;
  return resolveSanityLocalizedValue(i18nArray, language) ?? NO_CONTENT_FOUND;
}
