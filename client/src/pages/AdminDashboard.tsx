import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";
import { useEffect, useState } from "react";

type UnassignedShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
};

type ActiveShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    partner: string;
    lastLocation: string;
    expectedDay: string
};

type PastShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    partner: string;
    status: string;
    deliveryDate: string
};

  const activeShipmentsColumnHelper = createColumnHelper<ActiveShipments>();

  const activeShipmentsColumns = [
    activeShipmentsColumnHelper.accessor("sender", {
        cell: (info) => info.getValue(),
        header: "Sender"
      }),
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
      activeShipmentsColumnHelper.accessor("partner", {
        cell: (info) => info.getValue(),
        header: "Partner",
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
      pastShipmentsColumnHelper.accessor("partner", {
        cell: (info) => info.getValue(),
        header: "Partner",
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

  const unassignedShipmentsColumnHelper = createColumnHelper<UnassignedShipments>();

  const unassignedShipmentsColumns = [
    unassignedShipmentsColumnHelper.accessor("sender", {
        cell: (info) => info.getValue(),
        header: "Sender"
      }),
      unassignedShipmentsColumnHelper.accessor("receiver", {
      cell: (info) => info.getValue(),
      header: "Receiver"
    }),
    unassignedShipmentsColumnHelper.accessor("from", {
      cell: (info) => info.getValue(),
      header: "Source"
    }),
    unassignedShipmentsColumnHelper.accessor("to", {
        cell: (info) => info.getValue(),
        header: "Destination",
      }),
    
  ];
  

function AdminDashboard() {
  const [pastShipmentsData, setPastShipmentData] = useState([]);
  const [activeShipmentsData, setActiveShipmentsData] = useState([]);
  const [unassignedShipmentsData, setUnassignedShipmentsData] = useState([]);

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
        const unassignedShipments = data.unassignedShipments.map((shipment: any) => {
          return {
              sender: shipment.senderName,
              receiver: shipment.receiverName,
              from: shipment.from,
              to: shipment.to,
          }
      })
      setUnassignedShipmentsData(unassignedShipments);

        const activeShipments = data.assignedShipments.map((shipment: any) => {
          return {
              sender: shipment.senderName,
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
                sender: shipment.senderName,
                receiver: shipment.receiverName,
                from: shipment.from,
                to: shipment.to,
                partner: shipment.partner,
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