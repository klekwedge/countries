import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineSearch, AiFillCloseCircle } from "react-icons/ai";

interface SearchProps {
  findCountries: () => void;
  findCountriesByName: (countryName: string) => void;
  findCountriesByRegion: (regionName: string) => void;
}

const Search = ({
  findCountries,
  findCountriesByName,
  findCountriesByRegion,
}: SearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      findCountriesByName(inputValue);
    }
  };

  useEffect(() => {
    if (!inputValue) {
      findCountries();
    }
  }, [inputValue]);

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="20px"
      p="0px 20px"
      mb="60px"
    >
      <InputGroup maxW="410px">
        <InputLeftElement
          cursor="pointer"
          children={<AiOutlineSearch size="20px" />}
          onClick={() => findCountriesByName(inputValue)}
        />
        <Input
          placeholder="Search for a country"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => keyDownHandler(e)}
        />
        <InputRightElement
          cursor="pointer"
          onClick={() => {
            findCountries();
            setInputValue("");
          }}
          children={<AiFillCloseCircle size="20px" />}
        />
      </InputGroup>
      <Select
        placeholder="Filter by region"
        maxW="190px"
        onChange={(e) => findCountriesByRegion(e.target.value)}
      >
        <option value="Africa">Africa</option>
        <option value="America">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </Select>
    </Flex>
  );
};

export default Search;
