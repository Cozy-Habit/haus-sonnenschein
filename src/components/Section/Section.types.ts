import { ReactElement } from "react";

export default interface SectionProps {
  headline?: string;
  title?: string;
  backgroundColor: "white" | "creme";
  text: string | ReactElement;
  src?: string | null;
  alt?: string;
  buttonText?: string;
  buttonHref?: string;
  isReverse?: boolean;
}
