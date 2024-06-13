import Link from "next/link";
import { ButtonLinkProps, ButtonVariant } from "./types";
import { LinkButtonStyled } from "./styles";

export const ButtonLink = ({
  to,
  label,
  variant = ButtonVariant.Text,
}: ButtonLinkProps) => {
  const variantStyles = LinkButtonStyled(variant as ButtonVariant);
  return (
    <Link href={to} style={variantStyles}>
      {label}
    </Link>
  );
};
