import { renderToStaticMarkup } from "react-dom/server";

export const getStringifiedReactElement = (element: JSX.Element) => {
  const htmlString = renderToStaticMarkup(element);

  const div = document.createElement("div");
  div.innerHTML = htmlString;
  const text = div.innerText;
  return text;
};
