import { lazy, Suspense } from "react";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("../../pages/MainPage"));
const CountryPage = lazy(() => import("../../pages/CountryPage"));
const Page404 = lazy(() => import("../../pages/Page404"));

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Flex
            maxWidth="1400px"
            margin="0 auto"
            justifyContent="center"
            flexDirection="column"
          >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/:countryName" element={<CountryPage />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </Flex>
        </Suspense>
      </ChakraProvider>
    </Router>
  );
}

export default App;
