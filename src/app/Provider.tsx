"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { MotionConfig } from "framer-motion";
import { SanityContentProvider } from "@/sanity/ContentProvider";
import type { SanityContent } from "@/sanity/types";

export default function Provider({
  children,
  content,
}: Readonly<{
  children: React.ReactNode;
  content: SanityContent;
}>) {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <SanityContentProvider content={content}>
          {children}
        </SanityContentProvider>
      </LanguageProvider>
    </MotionConfig>
  );
}
