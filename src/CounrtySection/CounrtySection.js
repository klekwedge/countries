import { Flex, Heading } from "@chakra-ui/react";
const CounrtySection = ({ title, content }) => {
  return (
    <Flex
      flexDirection="column"
      border="1px solid black"
    >
      <Heading
        as="h2"
        backgroundColor="#3182CE"
        color="white"
        p="15px 20px 15px 20px"
      >
        {title}
      </Heading>
      {content}
    </Flex>
  );
};

export default CounrtySection;
