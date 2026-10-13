import type { SanityGalleryItem } from "@/sanity/types";
import styles from "./Gallery.module.scss";
import Image from "next/image";

const Gallery = ({ items }: { items: SanityGalleryItem[] }) => {
  const images = items.filter((item) => item.image?.url);

  return (
    <div className={styles.gallery}>
      <div className={styles["gallery__container"]}>
        {images.map((item) => {
          return (
            <Image
              key={item._id}
              className={styles["gallery__img"]}
              src={item.image?.url || ""}
              alt={item.image?.alt || ""}
              height={318.43}
              width={247.34}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Gallery;
