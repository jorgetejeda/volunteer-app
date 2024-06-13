import { ButtonVariant } from "../ButtonLink/types";

export type CardEventProps = {
  image?: {
    src: string;
    alt: string;
  };
  name: string;
  date: string;
  description?: string;
  location: string;
  chip?: {
    label: string;
    color?: string;
    backgroundColor?: string;
  };
  redirect?: {
    variant: ButtonVariant;
    label: string;
    to: string;
  };
};
