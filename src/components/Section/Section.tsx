import SectionProps from "./Section.types";
import styles from "./Section.module.scss";
import clsx from "clsx";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import Icon from "../Icon/Icon";
import Typography from "../Typography/Typography";
import Reveal from "../Reveal/Reveal";
import ColorfulText from "../ColorfulText/ColorfulText";
import Image from "next/image";
const Section = ({
  backgroundColor,
  headline,
  src,
  alt,
  text,
  title,
  buttonText,
  buttonHref,
  isReverse = false,
}: SectionProps) => {
  console.log("SRC", src);
  return (
    <div
      className={clsx(
        styles.sectionWrapper,
        styles[`sectionWrapper--${backgroundColor}`],
      )}
    >
      <div className={styles.section}>
        {headline && <ColorfulText text={headline} type="h1" as="h2" />}
        <div className={styles.section__content}>
          <Reveal
            className={clsx(styles.section__text, {
              [styles["section--isReverse"]]: isReverse,
            })}
            delay={0.04}
          >
            {title && (
              <Typography type="h2" fontFamily="lilita">
                {title}
              </Typography>
            )}
            {text}
            {buttonText && (
              <ButtonPrimary
                variant="link"
                href={buttonHref ?? ""}
                iconLeft={<Icon icon="arrow_right" />}
              >
                {buttonText}
              </ButtonPrimary>
            )}
          </Reveal>

          {src !== null && (
            <Reveal className={styles["section__img"]} delay={0.16}>
              <Image src={src} alt={alt} width={284} height={365.64} />
            </Reveal>
          )}
        </div>
      </div>
    </div>
  );
};

export default Section;
