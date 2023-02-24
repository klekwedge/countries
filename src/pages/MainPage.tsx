import { Flex, Heading, Highlight, Image, Text } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import RestCountries from "../services/RestCountries";
import { ICountry } from "../types/types";
import Search from "../components/Search/Search";

const MainPage = () => {
  const [flags, setFlags] = useState<ICountry[]>([]);
  const { getAllCountries } = RestCountries();

  // console.log(flags[20] && flags[20].name);

  useEffect(() => {
    getAllCountries().then((data: ICountry[]) => setFlags(data));
  }, []);

  return (
    <>
      <Search />
      <Flex
        gap="60px"
        flexWrap="wrap"
        alignItems="start"
        // justifyContent="center"
        p="10px"
      >
        {flags.map((flag) => (
          <Flex key={uuidv4()} flex="0 1 21%" direction="column">
            <Image src={flag.flags.png} />
            <Flex
              flexDirection="column"
              p="30px 20px"
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
            >
              <Heading as="h2" fontSize="25px" fontWeight="700" mb="20px">
                {flag.name.common}
              </Heading>
              <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                <Highlight query="Population:" styles={{ fontWeight: "600" }}>
                  Population:
                </Highlight>{" "}
                {String(flag.population).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
              </Heading>
              <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                <Highlight query="Region:" styles={{ fontWeight: "600" }}>
                  Region:
                </Highlight>{" "}
                {flag.region}
              </Heading>
              <Heading as="h3" fontSize="20px" fontWeight="400" mb="5px">
                <Highlight query="Capital:" styles={{ fontWeight: "600" }}>
                  Capital:
                </Highlight>{" "}
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
