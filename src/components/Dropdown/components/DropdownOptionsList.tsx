import { uuid } from "uuidv4";
import { Option, Options, RenderOption, RenderSelected } from "../types";
import { DropdownOption } from "./DropdownOption";

export const DropdownOptionsList: React.FC<{
  handleOptionClick: (option: Option) => void;
  options: Options;
  isLoading: boolean;
  selectedOption: Option | null;
  renderSelected?: RenderSelected;
  renderOption?: RenderOption;
}> = ({
  options,
  isLoading,
  selectedOption,
  handleOptionClick,
  renderSelected,
  renderOption,
}) => {
  return (
    <ul className="max-h-[200px] overflow-auto">
      {isLoading
        ? "Loading..."
        : options.map((option) => (
            <DropdownOption
              option={option}
              handleClick={handleOptionClick}
              key={uuid()}
              isSelected={option.value === selectedOption?.value}
              renderSelected={renderSelected}
              renderOption={renderOption}
            />
          ))}
    </ul>
  );
};
