import { lazy, Suspense, useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import "./App.scss";

const MainPage = lazy(() => import("../../pages/MainPage"));
const CountryPage = lazy(() => import("../../pages/CountryPage"));
const Page404 = lazy(() => import("../../pages/Page404"));

function App() {
  const [isLightTheme, setIsLightTheme] = useState(true);

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [isLightTheme]);

  return (
    <Router>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Header toggleTheme={setIsLightTheme} isLightTheme={isLightTheme} />
        <Flex
          maxWidth="1400px"
          margin="0 auto"
          justifyContent="center"
          flexDirection="column"
          transition="all 0.3s ease"
        >
          <Routes>
            <Route path="/" element={<MainPage isLightTheme={isLightTheme} />} />
            <Route path="/:countryName" element={<CountryPage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Flex>
      </Suspense>
    </Router>
  );
}

export default App;
