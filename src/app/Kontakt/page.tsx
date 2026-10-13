"use client";

import { ColorfulText, MultiStepForm } from "@/components";
import { useTranslation } from "@/i18n/LanguageProvider";

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      <ColorfulText type="h1" text={t("contact.title")} />
      <MultiStepForm />
    </>
  );
};

export default Page;
