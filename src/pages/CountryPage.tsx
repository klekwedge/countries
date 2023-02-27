import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RestCountries from "../services/RestCountries";
import { ICountry } from "../types/types";

const CountryPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<ICountry>();
  const { getCountriesByCode } = RestCountries();

  console.log(country);

  useEffect(() => {
    if (countryCode) {
      getCountriesByCode(countryCode).then((data: ICountry[]) =>
        setCountry(data[0])
      );
    }
  }, [countryCode]);

  return (
    <Box>
      <Link to="/" style={{ fontSize: "25px" }}>
        Home page
      </Link>
      <Flex> {country ? country.name.official : ""}</Flex>
    </Box>
  );
};

export default CountryPage;
