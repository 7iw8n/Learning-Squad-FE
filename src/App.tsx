// import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { Global, ThemeProvider } from "@emotion/react";
import globalStyles from "./common/styles/globalStyles";
import router from "./Router";

function App() {
  // const setScreenSize = () => {
  //   const vh = window.innerHeight * 0.01;
  //   document.documentElement.style.setProperty("--vh", `${vh}px`);
  // };

  // useEffect(() => {
  //   window.addEventListener("resize", () => setScreenSize());
  //   setScreenSize();
  // });

  return (
    <>
      <Global styles={globalStyles} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
