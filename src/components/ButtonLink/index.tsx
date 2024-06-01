import theme from "@/theme";
import Link from "next/link";

type ButtonLinkProps = {
  to: string;
  label: string;
  variant?: "contained" | "text";
};

export const ButtonLink = ({
  to,
  label,
  variant = "text",
}: ButtonLinkProps) => {
  return (
    <Link
      href={to}
      style={{ fontSize: ".75rem", color: theme.palette.text.accent }}
    >
      {label}
    </Link>
  );
};
