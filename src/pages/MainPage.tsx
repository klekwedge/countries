import { Flex, Heading, Image } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { ICountry } from "../types/types";

interface MainPageProps {
  isLightTheme: boolean;
  flags: ICountry[];
}

const MainPage = ({ flags, isLightTheme }: MainPageProps) => {
  return (
    <>
      <Flex gap="60px" flexWrap="wrap" justifyContent="center">
        {flags && flags.map((flag) => (
          <Flex key={uuidv4()} flex="0 1 21%" direction="column">
            <Image flex="1 1 50%" src={flag.flags.png} maxH="250px" />
            <Flex
              flexDirection="column"
              p="30px 20px"
              boxShadow={`${
                isLightTheme
                  ? "rgba(0, 0, 0, 0.35)"
                  : "rgba(255, 255, 255, 0.35)"
              }0px 5px 15px`}
            >
              <Heading as="h2" fontSize="25px" fontWeight="700" mb="20px">
                {flag.name.common}
              </Heading>
              <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                <span style={{ fontWeight: "600" }}>Population:</span>{" "}
                {String(flag.population).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Heading>
              <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                <span style={{ fontWeight: "600" }}>Region:</span> {flag.region}
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
};

export default MainPage;
