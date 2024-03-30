import classNames from "classnames";
import React, { useState, useEffect, useRef } from "react";
import { DropdownSearch } from "./components/DropdownSearch";
import { CustomDropdownProps, Option } from "./types";
import { getStringifiedReactElement } from "./utils/getStringifiedReactElement";
import { DropdownOptionsList } from "./components/DropdownOptionsList";

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  options,
  onSelect,
  customSearchFunction,
  renderSelectedOption,
  renderOption,
}) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [filteredOptions, setFilteredOptions] = useState<Option[]>(options);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpened(!isOpened);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    onSelect && onSelect(option);
    setIsOpened(false);
  };

  const filterOptions = (searchValue: string) => {
    const filteredOptions = options.filter(({ label }) =>
      typeof label === "string"
        ? label.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        : getStringifiedReactElement(label)
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
    );

    setFilteredOptions(filteredOptions);
  };

  const searchFunction = customSearchFunction
    ? (searchValue: string) =>
        customSearchFunction(searchValue, setFilteredOptions, setIsLoading)
    : filterOptions;

  return (
    <div className="relative h-[42px] w-[295px]" ref={dropdownRef}>
      <div
        className={classNames(
          "border py-3 px-4 border-[#D1D5DB] bg-[#F9FAFB] rounded-lg cursor-pointer",
          {
            ["border-b-0 rounded-b-none [&]:border-[#666666]"]: isOpened,
            ["[&]:border-[#666666]"]: !!selectedOption,
          }
        )}
        onClick={toggleDropdown}
      >
        {selectedOption ? selectedOption.label : <span>Select an option</span>}
      </div>

      {isOpened && (
        <div className="absolute box-border left-0 pt-[10px] pb-4 bg-white border rounded-md rounded-t-none w-full border-[#666666]">
          <DropdownSearch searchFunction={searchFunction} />
          <DropdownOptionsList
            handleOptionClick={handleOptionClick}
            options={filteredOptions}
            isLoading={isLoading}
            selectedOption={selectedOption}
            renderSelected={renderSelectedOption}
            renderOption={renderOption}
          />
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
