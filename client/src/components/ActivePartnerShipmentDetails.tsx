import { Flex, Heading, Text } from "@chakra-ui/react"

interface IActivePartnerShipmentDetails {
    columnName: string;
    columnDetail: string;
}

const ActivePartnerShipmentDetails = ({ columnName, columnDetail}: IActivePartnerShipmentDetails) => {
    return (
        <Flex flexDirection={"column"}>
            <Heading as='h5' size='sm'>
                { columnName }
            </Heading>
            <Text fontSize='sm'>{ columnDetail }</Text>
        </Flex>
    )
}

export default ActivePartnerShipmentDetails;