import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react";
import { ShipmentTable } from "../components/ShipmentsTable";
import { activeShipmentsColumns, pastShipmentsColumns, unassignedShipmentsColumns } from "../utils/TableColumnHelpers/AdminColumnHelper";
import useAdminDashboard from "../hooks/useAdminDashboard";
  

function AdminDashboard() {
  const {activeShipmentsData, unassignedShipmentsData, pastShipmentsData} = useAdminDashboard();
  return (
    <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"80%"} height={"30%"}>
            <CardHeader> Unassigned Shipments </CardHeader>
            <CardBody>
            <ShipmentTable columns={unassignedShipmentsColumns} data={unassignedShipmentsData} />
            </CardBody>
        </Card>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"80%"} height={"30%"}>
            <CardHeader> Active Shipments </CardHeader>
            <CardBody>
            <ShipmentTable columns={activeShipmentsColumns} data={activeShipmentsData} />
            </CardBody>
        </Card>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"80%"}>
            <CardHeader> Delivered Shipments </CardHeader>
            <CardBody>
            <ShipmentTable columns={pastShipmentsColumns} data={pastShipmentsData} />
            </CardBody>
        </Card>
    </Flex>
  )
}

export default AdminDashboard