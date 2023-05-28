import { Flex, Text } from "@chakra-ui/react";

function Footer() {

  return (
    <footer>
      <Flex mt={"3rem"} width={"100vw"} height={"5vh"} borderTop={"solid gray 1px"} padding={"0.5rem"}>
        <Text fontSize={"sm"}>Support Center</Text>
      </Flex>
    </footer>
  )
}

export default Footer