import { Heading, Text, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";

type PastShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    status: string,
    deliveryDate: string
};

  const pastShipmentsData: PastShipments[] = [
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Cancelled",
        deliveryDate: "Not delivered"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    }
  ];
  const pastShipmentsColumnHelper = createColumnHelper<PastShipments>();

  const pastShipmentsColumns = [
    pastShipmentsColumnHelper.accessor("sender", {
        cell: (info) => info.getValue(),
        header: "Sender"
      }),
    pastShipmentsColumnHelper.accessor("receiver", {
      cell: (info) => info.getValue(),
      header: "Receiver"
    }),
    pastShipmentsColumnHelper.accessor("from", {
      cell: (info) => info.getValue(),
      header: "Source"
    }),
    pastShipmentsColumnHelper.accessor("to", {
        cell: (info) => info.getValue(),
        header: "Destination",
      }),
      pastShipmentsColumnHelper.accessor("status", {
          cell: (info) => info.getValue(),
          header: "Status",
        }),
        pastShipmentsColumnHelper.accessor("deliveryDate", {
            cell: (info) => info.getValue(),
            header: "Delivered On",
          })
  ];
  

function PartnerDashboard() {

  return (
    <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"} height={"30%"}>
            <CardHeader> Active Shipment </CardHeader>
            <CardBody>
                <Flex flexDirection={"column"} flexWrap={"wrap"} height={"30vh"} gap={"2rem"} >
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Sender
                        </Heading>
                        <Text fontSize='sm'>Amazon</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Receiver
                        </Heading>
                        <Text fontSize='sm'>Google</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Source
                        </Heading>
                        <Text fontSize='sm'>Pune</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Destination
                        </Heading>
                        <Text fontSize='sm'>Mumbai</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Delivery By
                        </Heading>
                        <Text fontSize='sm'>Tuesday 21/01/2023</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Last Status
                        </Heading>
                        <Text fontSize='sm'>Karjat, Tuesday 21/01/2023</Text>
                    </Flex>
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