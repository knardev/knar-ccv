import { BaseSelect, BaseSelectorProps } from "./base-select";

interface FormSelectorProps extends BaseSelectorProps {}

export function FormSelector(props: FormSelectorProps) {
  return <BaseSelect {...props} />;
}
