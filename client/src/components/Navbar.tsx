import { Button, Flex, Text } from "@chakra-ui/react";

function Navbar({ setIsLoggedIn ,isLoggedin }: any) {

  function logoutHandler() {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    window.open(`${window.location.origin}/login`, '_self');
  }

  return (
    <nav>
      <Flex width={"100vw"} height={"5rem"} backgroundColor={"#232325"} alignItems={"center"} justifyContent={"space-between"}>
        <Text ml={"1rem"} fontSize={"3xl"} color={"#00c795"}>Tag N Trac</Text>
        { isLoggedin ? <Button onClick={logoutHandler} mr={"1rem"}>Sign Out</Button> : null}
      </Flex>
    </nav>
  )
}

export default Navbar