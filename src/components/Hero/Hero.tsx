"use client";
import Image from "next/image";
import Typography from "../Typography/Typography";
import styles from "./Hero.module.scss";
import { useTranslation } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";
import { useWindowSize } from "@/hooks";

const Hero = ({ subtitle }: { subtitle?: string }) => {
  const { t } = useTranslation();
  const [width] = useWindowSize();
  const isSmallScreen = width < 635;
  return (
    <motion.div
      className={styles.hero}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay: 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Image
        width={500}
        height={250}
        src="/assets/home/hero.svg"
        alt="Haus Sonnenschein Überschrift und Logo"
        className={styles["hero__img0"]}
        priority
      />
      <Typography type="h2" as="h1" className={styles.hero__title}>
        {subtitle || t("home.hero.subtitle")}
      </Typography>
      {!isSmallScreen && (
        <div className={styles["hero__images"]}>
          <Image
            alt="Haus Sonnenschein"
            width={260.24}
            height={346.99}
            className={styles["hero__img1"]}
            src="/assets/home/hero_01.png"
            priority
          />
          <Image
            alt=""
            width={270.38}
            height={415.72}
            className={styles["hero__img2"]}
            src="/assets/home/hero_02.png"
            priority
          />
          <Image
            alt=""
            width={306.36}
            height={394.42}
            className={styles["hero__img3"]}
            src="/assets/home/hero_03.png"
            priority
          />
          <Image
            alt=""
            width={270.12}
            height={360.16}
            className={styles["hero__img4"]}
            src="/assets/home/hero_04.png"
            priority
          />
        </div>
      )}
    </motion.div>
  );
};

export default Hero;
