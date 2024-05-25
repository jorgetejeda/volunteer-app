import Image from "next/image";
import { FC } from "react";

interface MyImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export const Img: FC<MyImageProps> = ({ src, alt, width, height }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      layout="responsive"
      priority
    />
  );
};
