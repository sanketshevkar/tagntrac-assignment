import { Avatar, Heading, Flex } from "@chakra-ui/react"



function AvatarGreeting() {

  return (
    <>
      <Flex alignItems='center' gap={3}>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' size='lg' />
            <Heading as='h1' size='l' noOfLines={1}>
                Hi Customer
            </Heading>
      </Flex>
    </>
  )
}

export default AvatarGreeting