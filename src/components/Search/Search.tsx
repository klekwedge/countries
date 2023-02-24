import {
  Flex,
  Heading,
  Highlight,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

interface SearchProps {
  findCountriesByName: (countryName: string) => void;
  findCountriesByRegion: (regionName: string) => void;
}

const Search = ({
  findCountriesByName,
  findCountriesByRegion,
}: SearchProps) => {
  const [inputValue, setInputValue] = useState("");

  const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      findCountriesByName(inputValue);
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="20px"
      p="0px 20px"
      mb="60px"
    >
      <InputGroup>
        <InputLeftElement
          cursor="pointer"
          children={<AiOutlineSearch size="20px" />}
          onClick={() => findCountriesByName(inputValue)}
        />
        <Input
          maxW="410px"
          placeholder="Search for a country"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => keyDownHandler(e)}
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
