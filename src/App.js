import { lazy, Suspense } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const MainPage = lazy(() => import("./pages/MainPage"));

function App() {
  return (
    <Router>
      <ChakraProvider>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<MainPage />} />
          </Routes>
        </Suspense>
      </ChakraProvider>
    </Router>
  );
}

export default App;
