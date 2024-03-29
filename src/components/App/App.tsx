import { lazy, Suspense, useState, useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import "./App.scss";
import { ICountry } from "../../types/types";
import RestCountries from "../../services/RestCountries";
import Loader from "../Loader/Loader";

const MainPage = lazy(() => import("../../pages/MainPage"));
const CountryPage = lazy(() => import("../../pages/CountryPage"));
const Page404 = lazy(() => import("../../pages/Page404"));

function App() {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [flags, setFlags] = useState<ICountry[]>([]);
  const { getAllCountries, getCountriesByName, getCountriesByRegion } =
    RestCountries();

  function findCountries() {
    getAllCountries().then((data: ICountry[]) => setFlags(data));
  }

  useEffect(() => {
    findCountries();
  }, []);

  function findCountriesByName(countryName: string) {
    getCountriesByName(countryName).then((data: ICountry[]) => setFlags(data));
  }

  function findCountriesByRegion(regionName: string) {
    if (regionName) {
      getCountriesByRegion(regionName).then((data: ICountry[]) =>
        setFlags(data)
      );
    } else {
      findCountries();
    }
  }

  useEffect(() => {
    if (isLightTheme) {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }, [isLightTheme]);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Header toggleTheme={setIsLightTheme} isLightTheme={isLightTheme} />
        <Flex
          maxWidth="1400px"
          margin="0 auto"
          justifyContent="center"
          flexDirection="column"
          transition="all 0.3s ease"
        >
          <Routes>
            <Route
              path="/"
              element={
                <MainPage
                  flags={flags}
                  isLightTheme={isLightTheme}
                  findCountriesByName={findCountriesByName}
                  findCountriesByRegion={findCountriesByRegion}
                  findCountries={findCountries}
                />
              }
            />
            <Route
              path="/:countryCode"
              element={<CountryPage isLightTheme={isLightTheme} />}
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Flex>
      </Suspense>
    </Router>
  );
}

export default App;
