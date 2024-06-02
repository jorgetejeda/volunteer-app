export enum ButtonVariant {
  Contained = "contained",
  Text = "text",
}

export type ButtonLinkProps = {
  to: string;
  label: string;
  variant?: ButtonVariant;
};
