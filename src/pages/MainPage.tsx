import { Flex, Heading, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Search from "../components/Search/Search";
import { ICountry } from "../types/types";

interface MainPageProps {
  isLightTheme: boolean;
  flags: ICountry[];
  findCountries: () => void;
  findCountriesByName: (countryName: string) => void;
  findCountriesByRegion: (regionName: string) => void;
}

function MainPage({
  flags,
  isLightTheme,
  findCountriesByName,
  findCountriesByRegion,
  findCountries,
}: MainPageProps) {
  return (
    <>
      <Search
        findCountriesByName={findCountriesByName}
        findCountriesByRegion={findCountriesByRegion}
        findCountries={findCountries}
      />
      <Flex gap="60px" flexWrap="wrap" justifyContent="center">
        {flags &&
          flags.map((flag) => (
            <Flex key={uuidv4()} flex="0 1 21%" direction="column">
              <Image flex="1 1 50%" src={flag.flags.png} maxH="250px" />
              <Flex
                flexDirection="column"
                transition="all 0.3s ease"
                p="30px 20px"
                boxShadow={
                  isLightTheme ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : ""
                }
                background={isLightTheme ? "" : "rgba(0, 0, 0, 0.35)"}
              >
                <Link
                  style={{
                    fontSize: "25px",
                    fontWeight: "700",
                    marginBottom: "20px",
                  }}
                  to={`${flag.cca2}`}
                >
                  {flag.name.common}
                </Link>
                <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                  <span style={{ fontWeight: "600" }}>Population:</span>{" "}
                  {String(flag.population).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )}
                </Heading>
                <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                  <span style={{ fontWeight: "600" }}>Region:</span>{" "}
                  {flag.region}
                </Heading>
                <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                  <span style={{ fontWeight: "600" }}>Capital:</span>{" "}
                  {flag.capital}
                </Heading>
              </Flex>
            </Flex>
          ))}
      </Flex>
    </>
  );
}

export default MainPage;
