import { useState } from "react";

export const DropdownSearch: React.FC<{
  searchFunction: (searchValue: string) => void;
}> = ({ searchFunction }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = event.target;
    setSearchInput(inputValue);

    searchFunction(inputValue);
  };

  return (
    <input
      type="text"
      value={searchInput}
      onChange={handleInputChange}
      placeholder="Search..."
      className=" inline-block box-border w-full px-2 outline-none"
    />
  );
};
