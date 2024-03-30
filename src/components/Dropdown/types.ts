export type Option = { label: string | JSX.Element; value: any };
export type Options = Array<Option>;
export type RenderSelected = (option: Option) => string | JSX.Element;
export type RenderOption = (
  option: Option,
  onClick: (option: Option) => void
) => string | JSX.Element;

export type CustomSearchFunction = (
  query: string,
  setOptions: React.Dispatch<React.SetStateAction<Option[]>>,
  setIsLoading: (isLoading: boolean) => void
) => void;

export interface CustomDropdownProps {
  options: Option[];
  onSelect?: (option: Option | null) => void;
  customSearchFunction?: CustomSearchFunction;
  renderSelectedOption?: RenderSelected;
  renderOption?: RenderOption;
}
