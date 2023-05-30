import { Heading, Text, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";
import { useEffect, useState } from "react";

type PastShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    status: string,
    deliveryDate: string
};

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
    const activeShipment = {
        senderName: '',
        receiverName: '',
        from: '',
        to: '',
        expectedDay: '',
        lastLocation: ''
    }
    const [pastShipmentsData, setPastShipmentData] = useState([]);
    const [activeShipmentData, setActiveShipmentData] = useState(activeShipment);

    useEffect(() => {
        const authToken = localStorage.getItem('token'); // Retrieve the auth token from localStorage

        fetch('http://localhost:3000/api/shipment/getShipments', {
        method: 'GET',
        // @ts-ignore
        headers: {
            'Content-Type': 'application/json',
            'auth-token': authToken,
        },
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            } else {
            throw new Error('Request failed');
            }
        })
        .then(data => {
            console.log(data.activeShipment);
            const pastShipments = data.pastShipments.map((shipment: any) => {
                return {
                    sender: shipment.senderName,
                    receiver: shipment.receiverName,
                    from: shipment.from,
                    to: shipment.to,
                    status: shipment.status,
                    deliveryDate: shipment.deliveryDay
                }
            })
            setPastShipmentData(pastShipments);

            if (data.activeShipment.length > 0) setActiveShipmentData(data.activeShipment[0]);
        })
        .catch(error => {
            console.error(error);
        });
    }, [])

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
                        <Text fontSize='sm'>{activeShipmentData.senderName}</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Receiver
                        </Heading>
                        <Text fontSize='sm'>{activeShipmentData.receiverName}</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Source
                        </Heading>
                        <Text fontSize='sm'>{activeShipmentData.to}</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Destination
                        </Heading>
                        <Text fontSize='sm'>{activeShipmentData.from}</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Delivery By
                        </Heading>
                        <Text fontSize='sm'>{activeShipmentData.expectedDay}</Text>
                    </Flex>
                    <Flex flexDirection={"column"}>
                        <Heading as='h5' size='sm'>
                            Last Status
                        </Heading>
                        <Text fontSize='sm'>{activeShipmentData.lastLocation}</Text>
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