import { PassBuilder, type BuilderProps } from "./PassBuilder";

export function PersonalPassBuilder(props: Omit<BuilderProps, "mode">) {
  return <PassBuilder {...props} mode="personal" />;
}
