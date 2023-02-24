import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { BsFillMoonFill } from "react-icons/bs";

const Header = () => {
  return (
    <Box w="100%" boxShadow="rgba(0, 0, 0, 0.15) 0px 3px 3px 0px">
      <Flex
        margin="0 auto"
        maxWidth="1400px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap="50px"
        mb="60px"
        p="20px"
      >
        <Heading as="h1" fontSize="30px">
          Where is the world?
        </Heading>
        <Button leftIcon={<BsFillMoonFill />} variant="ghost">
          Dark mode
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
