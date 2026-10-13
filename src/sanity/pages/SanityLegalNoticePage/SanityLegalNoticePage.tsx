import { ColorfulText, Typography } from "@/components";
import { useTranslation } from "@/i18n/LanguageProvider";
import { resolveSanityText } from "@/sanity/ContentProvider";
import type { SanityPage } from "@/sanity/types";
import styles from "./SanityLegalNoticePage.module.scss";

export default function SanityLegalNoticePage({
  title,
  address,
  addressHeading,
  email,
  jobTitle,
  phone,
  contactName,
}: SanityPage<"legalNoticePage">) {
  const { lang } = useTranslation();

  return (
    <div className={styles.impressum}>
      <ColorfulText type="h1" text={resolveSanityText(title, lang)} />
      <div className={styles["impressum__container"]}>
        <Typography type="h2">
          {resolveSanityText(addressHeading, lang)}
        </Typography>
        <Typography type="body-semibold">{contactName}</Typography>
        <Typography type="body-semibold">{address}</Typography>
        <Typography type="body-semibold">{phone}</Typography>
        <Typography type="body-semibold">{email}</Typography>
        <Typography type="body-semibold">
          {resolveSanityText(jobTitle, lang)}
        </Typography>
      </div>
    </div>
  );
}
