
export type CardEventProps = {
  image?: {
    src: string;
    alt: string;
  };
  name: string;
  date: string;
  description?: string;
  location: string;
  userEnrolled: number;
  chip?: {
    label: string;
    color?: string;
    backgroundColor?: string;
  };
  redirect?: {
    variant: string;
    label: string;
    to: string;
  };
};
