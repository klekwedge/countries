import { Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import RestCountries from "../services/RestCountries";
import { ICountry } from "../types/types";

const MainPage = () => {
  const [flags, setFlags] = useState<ICountry[]>([]);
  const { getAllCountries } = RestCountries();

  console.log(flags[0]);

  useEffect(() => {
    getAllCountries().then((data: ICountry[]) => setFlags(data));
  }, []);

  return (
    <Flex
      gap="60px"
      flexWrap="wrap"
      alignItems="center"
      // justifyContent="center"
      p="10px"
    >
      {flags.map((flag) => (
        <Flex flex="0 1 21%" direction="column">
          <Image src={flag.flags.png} minW="100%" />
          <Flex flexDirection="column" p="30px 20px" boxShadow="">
            <Heading as="h2" fontSize="25px" fontWeight="600">
              {flag.name.official}
            </Heading>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default MainPage;
