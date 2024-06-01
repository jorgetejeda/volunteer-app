import theme from "@/theme";
import Link from "next/link";

type ButtonLinkProps = { to: string; label: string };

export const ButtonLink = ({ to, label }: ButtonLinkProps) => {
  return (
    <Link
      href={to}
      style={{ fontSize: ".75rem", color: theme.palette.text.accent }}
    >
      {label}
    </Link>
  );
};
