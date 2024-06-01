type CardEventProps = {
  image?: {
    src: string;
    alt: string;
  };
  name: string;
  date: string;
  description?: string;
  location: string;
  redirect?: {
    label: string;
    to: string;
  };
};
