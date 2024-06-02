import { SvgIconComponent } from "@mui/icons-material";

export type InformationLabelProps = {
  icon: {
    component: SvgIconComponent;
    color?: string;
    size?: "small" | "medium" | "large";
  };
  label: string;
};
