import { Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";

type UnassignedShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    expectedDay: string
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

const unassignedShipmentsData: UnassignedShipments[] = [
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        expectedDay: "Tuesday 21/01/2023"
    }
  ];

  const activeShipmentsData: ActiveShipments[] = [
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    }
  ];

  const pastShipmentsData: PastShipments[] = [
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        status: "Cancelled",
        deliveryDate: "Not delivered"
    },
    {
        sender: "Infosys",
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        partner: "Sanket",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    }
  ];

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
      unassignedShipmentsColumnHelper.accessor("expectedDay", {
          cell: (info) => info.getValue(),
          header: "Deliver By",
        })
      
  ];
  

function AdminDashboard() {

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