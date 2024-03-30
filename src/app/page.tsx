"use client";
import CustomDropdown from "../components/Dropdown";

const options = [
  {
    label: (
      <div className="flex gap-2">
        <div>{"div < 123 > 122 / * - + %$#!#@*)(*)(*"}</div>
        <div>test</div>
      </div>
    ),
    value: 1,
  },
  { label: "123123", value: 2 },
  { label: "123123", value: 3 },
  { label: "123123", value: 4 },
  { label: "123123", value: 5 },
  { label: "123123", value: 6 },
];

export default function Home() {
  return (
    <main className="flex min-h-screen items-center p-24">
      <CustomDropdown options={options} />

      <CustomDropdown
        options={options}
        customSearchFunction={(querry, setOptions, setIsLoading) => {
          // it's just mock so left log and promise w/o debounce here
          console.log(querry);
          setIsLoading(true);
          new Promise(() =>
            setTimeout(() => {
              setOptions([
                { label: "123", value: 123123 },
                { label: "1234", value: 123123 },
              ]);
              setIsLoading(false);
            }, 1000)
          );
        }}
        renderSelectedOption={(option) => {
          return <div className="bg-red-700">CUSTOM RENDER!!!</div>;
        }}
      />
    </main>
  );
}
