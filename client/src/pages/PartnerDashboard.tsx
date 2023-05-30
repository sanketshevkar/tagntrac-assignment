import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { ShipmentTable } from "../components/ShipmentsTable";
import { pastShipmentsColumns } from "../utils/TableColumnHelpers/PartnerColumnHelper";
import { usePartnerDashboard } from '../hooks/usePartnerDashboard';
import ActivePartnerShipmentDetails from "../components/ActivePartnerShipmentDetails";
  

function PartnerDashboard() {
    const { pastShipmentsData, activeShipmentData } = usePartnerDashboard();

    return (
        <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
            <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"} height={"30%"}>
                <CardHeader> Active Shipment </CardHeader>
                <CardBody>
                    <Flex flexDirection={"column"} flexWrap={"wrap"} height={"30vh"} gap={"2rem"} >
                        <ActivePartnerShipmentDetails columnName="Sender" columnDetail={ activeShipmentData.senderName } />
                        <ActivePartnerShipmentDetails columnName="Receiver" columnDetail={ activeShipmentData.receiverName } />
                        <ActivePartnerShipmentDetails columnName="Source" columnDetail={ activeShipmentData.from } />
                        <ActivePartnerShipmentDetails columnName="Destination" columnDetail={ activeShipmentData.from } />
                        <ActivePartnerShipmentDetails columnName="Delivery By" columnDetail={ activeShipmentData.expectedDay } />
                        <ActivePartnerShipmentDetails columnName="Last Status" columnDetail={ activeShipmentData.lastLocation } />
                </Flex>
                </CardBody>
            </Card>
            <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"}>
                <CardHeader> Past Shipments </CardHeader>
                <CardBody>
                <ShipmentTable columns={pastShipmentsColumns} data={pastShipmentsData} />
                </CardBody>
            </Card>
        </Flex>
        )
}

export default PartnerDashboard