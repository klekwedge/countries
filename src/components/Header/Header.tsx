import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { BsFillMoonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLightTheme: boolean;
  toggleTheme: (isLigth: boolean) => void;
}

const Header = ({ isLightTheme, toggleTheme }: HeaderProps) => {
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
        <Link to="/" style={{ fontSize: "30px" }}>
          Where is the world?
        </Link>
        <Button
          leftIcon={<BsFillMoonFill />}
          variant="outline"
          onClick={() => toggleTheme(!isLightTheme)}
          _hover={{
            background: isLightTheme ? "gray.100" : "gray.700",
          }}
        >
          Dark mode
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
