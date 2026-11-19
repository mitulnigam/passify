import { PassBuilder, type BuilderProps } from "./PassBuilder";

export function OrganizationPassBuilder(props: Omit<BuilderProps, "mode">) {
  return <PassBuilder {...props} mode="organization" />;
}
