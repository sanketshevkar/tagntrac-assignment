import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";
import { useEffect, useState } from "react";

type ActiveShipments = {
    receiver: string;
    from: string;
    to: string;
    lastLocation: string;
    expectedDay: string
};

type PastShipments = {
    receiver: string;
    from: string;
    to: string;
    status: string,
    deliveryDate: string
};
  const activeShipmentsColumnHelper = createColumnHelper<ActiveShipments>();
  const pastShipmentsColumnHelper = createColumnHelper<PastShipments>();

  const activeShipmentsColumns = [
    activeShipmentsColumnHelper.accessor("receiver", {
      cell: (info) => info.getValue(),
      header: "Receiver"
    }),
    activeShipmentsColumnHelper.accessor("from", {
      cell: (info) => info.getValue(),
      header: "Source"
    }),
    activeShipmentsColumnHelper.accessor("to", {
        cell: (info) => info.getValue(),
        header: "Destination",
      }),
      activeShipmentsColumnHelper.accessor("lastLocation", {
          cell: (info) => info.getValue(),
          header: "Last Location",
        }),
        activeShipmentsColumnHelper.accessor("expectedDay", {
            cell: (info) => info.getValue(),
            header: "Delivered By",
          })
  ];

  const pastShipmentsColumns = [
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
  

function CustomerDashboard() {

  const [pastShipmentsData, setPastShipmentData] = useState([]);
  const [activeShipmentsData, setActiveShipmentsData] = useState([]);

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
        console.log(data);
        const activeShipments = data.activeShipments.map((shipment: any) => {
            return {
                receiver: shipment.receiverName,
                from: shipment.from,
                to: shipment.to,
                lastLocation: shipment.lastLocation,
                expectedDay: shipment.expectedDay
            }
        })
        setActiveShipmentsData(activeShipments);

        const pastShipments = data.pastShipments.map((shipment: any) => {
          return {
              receiver: shipment.receiverName,
              from: shipment.from,
              to: shipment.to,
              status: shipment.status,
              deliveryDate: shipment.deliveryDay
          }
      })
      setPastShipmentData(pastShipments);
    })
    .catch(error => {
        console.error(error);
    });
}, [])

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