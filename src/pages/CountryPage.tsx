import { Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RestCountries from "../services/RestCountries";
import { ICountry } from "../types/types";

const CountryPage = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState<ICountry>();
  const { getCountriesByCode } = RestCountries();

  useEffect(() => {
    if (countryCode) {
      getCountriesByCode(countryCode).then((data: ICountry[]) =>
        setCountry(data[0])
      );
    }
  }, [countryCode]);

  return <Flex>{country ? country.name.official : ""}</Flex>;
};

export default CountryPage;
