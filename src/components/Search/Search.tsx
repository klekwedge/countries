import {
  Flex,
  Heading,
  Highlight,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Text,
} from "@chakra-ui/react";
import { AiOutlineSearch } from "react-icons/ai";

const Search = () => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="20px"
      mb="60px"
    >
      <InputGroup>
        <InputLeftElement children={<AiOutlineSearch size="20px" />} />
        <Input maxW="410px" placeholder="Search for a country" />
      </InputGroup>
      <Select placeholder="Filter by region" maxW='190px'>
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
