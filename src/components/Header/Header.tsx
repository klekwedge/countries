import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { BsFillMoonFill } from "react-icons/bs";
import { Link } from "react-router-dom";

interface HeaderProps {
  isLightTheme: boolean;
  toggleTheme: (isLigth: boolean) => void;
}

function Header({ isLightTheme, toggleTheme }: HeaderProps) {
  return (
    <Box
      w="100%"
      transition='all 0.3s ease'
      boxShadow={
        isLightTheme
          ? "hsl(0, 0%, 98%) 0px 3px 3px 0px"
          : "black 0px 3px 3px 0px"
      }
    >
      <Flex
        margin="0 auto"
        maxWidth="1400px"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="space-between"
        gap="50px"
        mb="30px"
        p="20px"
      >
        <Link to="/" style={{ fontSize: "30px", fontWeight: "600" }}>
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
}

export default Header;
