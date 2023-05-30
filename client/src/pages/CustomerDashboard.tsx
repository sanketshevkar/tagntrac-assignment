import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { ShipmentTable } from "../components/ShipmentsTable";
import { activeShipmentsColumns, pastShipmentsColumns } from "../utils/TableColumnHelpers/CustomerColumnHelper";
import useCustomerDashboard from "../hooks/useCustomerDashboard";
  

function CustomerDashboard() {

  const { pastShipmentsData, activeShipmentsData } = useCustomerDashboard()
  return (
    <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"} height={"30%"}>
            <CardHeader> Active Shipments </CardHeader>
            <CardBody>
            <ShipmentTable columns={activeShipmentsColumns} data={activeShipmentsData} />
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

export default CustomerDashboard