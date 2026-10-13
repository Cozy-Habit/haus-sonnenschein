"use client";

import Image from "next/image";
import Typography from "../Typography/Typography";
import styles from "./Testimonials.module.scss";
import ColorfulText from "../ColorfulText/ColorfulText";
import { MutableRefObject, useEffect, useRef, useState } from "react";
import ButtonPrimary from "../ButtonPrimary/ButtonPrimary";
import clsx from "clsx";

type TestimonialItem = {
  _id: string;
  authorName: string | null;
  quote: string;
  imageUrl: string | null;
};

function getMap(ref: MutableRefObject<null | any>) {
  if (!ref.current) ref.current = new Map();
  return ref.current;
}

export default function Testimonials({
  title,
  items,
}: {
  title: string;
  items: TestimonialItem[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [firstRender, setFirstRender] = useState(true);
  const ref = useRef(null);
  const isLast = items.length - 1 === currentIndex;
  const isFirst = currentIndex === 0;
  function next() {
    if (isLast) return setCurrentIndex(0);
    setCurrentIndex(currentIndex + 1);
  }

  function prev() {
    if (isFirst) return setCurrentIndex(items.length - 1);
    setCurrentIndex(currentIndex - 1);
  }

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    if (ref === null) return;

    const refMap = getMap(ref);
    const item = refMap.get(currentIndex);
    if (!item) return;

    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentIndex, firstRender]);

  if (!items.length) return null;

  return (
    <div className={styles.testimonials}>
      <ColorfulText text={title} type="h1" as="h2" />
      <ul className={styles.testimonials__list}>
        {items.map(({ _id, quote, imageUrl, authorName }, index) => {
          const refMap = getMap(ref);
          return (
            <li
              key={_id}
              ref={(node) => refMap.set(index, node)}
              className={styles.testimonials__item}
            >
              <Image
                className={styles.testimonials__image}
                src={imageUrl || "/assets/testimonials/01.png"}
                height={100}
                width={100}
                alt=""
              />
              <div>
                <Typography type="body-semibold" fontFamily="lilita">
                  {authorName}
                </Typography>
                <Typography type="body-semibold">{quote}</Typography>
              </div>
            </li>
          );
        })}
      </ul>
      <div className={styles.testimonials__controls}>
        <ButtonPrimary onClick={prev}>{"<"}</ButtonPrimary>
        <div className={styles.testimonials__dotList}>
          {items.map((_, index) => {
            return (
              <div
                key={index}
                className={clsx(styles.testimonials__dotItem, {
                  [styles["testimonials__dotItem--active"]]:
                    index === currentIndex,
                })}
              ></div>
            );
          })}
        </div>
        <ButtonPrimary onClick={next}>{">"}</ButtonPrimary>
      </div>
    </div>
  );
}
