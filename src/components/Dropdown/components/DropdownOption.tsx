import { Option, RenderOption, RenderSelected } from "../types";

export const DropdownOption: React.FC<{
  handleClick: (option: Option) => void;
  option: Option;
  isSelected: boolean;
  renderSelected?: RenderSelected;
  renderOption?: RenderOption;
}> = ({ handleClick, option, isSelected, renderSelected, renderOption }) => {
  return renderOption ? (
    renderOption(option, handleClick)
  ) : (
    <li onClick={() => handleClick(option)}>
      {!!(isSelected && renderSelected) ? (
        renderSelected(option)
      ) : (
        <div className="p-2 cursor-pointer hover:bg-gray-100">
          {option.label}
        </div>
      )}
    </li>
  );
};
