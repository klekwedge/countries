import { Box, Button, Flex, Heading, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import RestCountries from "../services/RestCountries";
import { ICountry } from "../types/types";

const CountryPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<ICountry>();
  const [borderCountries, setBorderCountries] = useState<ICountry[]>([]);
  const { getCountriesByCode } = RestCountries();
  useEffect(() => {
    if (countryCode) {
      getCountriesByCode(countryCode).then((data: ICountry[]) =>
        setCountry(data[0])
      );
    }
  }, [countryCode]);

  // useEffect(() => {
  //   if (country && country.borders && country.borders.length !== 0) {
  //     country.borders.forEach((item) =>
  //       getCountriesByCode(item).then((data: ICountry[]) =>
  //         setBorderCountries([...borderCountries, data[0]])
  //       )
  //     );
  //   }
  // }, [country]);

  // console.log(country && country.borders);
  // console.log(borderCountries);

  return (
    <Box>
      <Link to="/">
        <Button
          leftIcon={<BsArrowLeft />}
          boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
          background="transparent"
          _hover={{
            background: "transparent",
          }}
        >
          Back
        </Button>
      </Link>
      {country ? (
        <Flex marginTop="40px" gap="50px 150px" flexWrap="wrap">
          <Image src={country.flags.png} width="100%" maxW="600px" />
          <Box>
            <Heading as="h2" fontWeight="500" mb="30px">
              {country.name.official}
            </Heading>
            <Flex gap="80px" flexWrap="wrap" mb="70px">
              <Flex gap="10px" flexDirection="column">
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Native Name: {country.name.common}
                </Heading>
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Population:{" "}
                  {String(country.population).replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )}
                </Heading>
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Region: {country.region}
                </Heading>
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Sub Region: {country.subregion}
                </Heading>
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Capital: {country.capital}
                </Heading>
              </Flex>
              <Box>
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Top Level Domain: {country.tld.join(", ")}
                </Heading>
                {/* <Heading as="h3">Currencies: {country.currencies.XPF.name}</Heading> */}
                <Heading as="h3" fontWeight="400" fontSize="22px">
                  Languages: {Object.values(country.languages).join(", ")}
                </Heading>
              </Box>
            </Flex>
            <Heading as="h3" fontWeight="400" fontSize="22px">
              Border countries:
            </Heading>
          </Box>
        </Flex>
      ) : (
        ""
      )}
    </Box>
  );
};

export default CountryPage;
