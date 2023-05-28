import { Flex, Text } from "@chakra-ui/react";

function Navbar() {

  return (
    <nav>
      <Flex width={"100vw"} height={"10vh"} backgroundColor={"#232325"} alignItems={"center"} justifyContent={"space-between"}>
        <Text ml={"1rem"} fontSize={"3xl"} color={"#00c795"}>Tag N Trac</Text>
        <Text mr={"1rem"} fontSize={"l"} color={"white"}>Sign Out</Text>
      </Flex>
    </nav>
  )
}

export default Navbar