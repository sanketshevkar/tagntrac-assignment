import { Heading, Avatar, Card, CardBody, CardHeader, Flex } from "@chakra-ui/react"
import { createColumnHelper } from "@tanstack/react-table"
import { ShipmentTable } from "../components/ShipmentsTable";
import AvatarGreeting from "../components/AvatarGreeting";

type UnitConversion = {
    fromUnit: string;
    toUnit: string;
    factor: number;
};

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

  const activeShipmentsData: ActiveShipments[] = [
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    },
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        lastLocation: "Dharwad",
        expectedDay: "Tuesday 21/01/2023"
    }
  ];

  const pastShipmentsData: PastShipments[] = [
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    },
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Cancelled",
        deliveryDate: "Not delivered"
    },
    {
        receiver: "Google",
        from: "Pune",
        to: "Banglore",
        status: "Delivered",
        deliveryDate: "Tuesday 21/01/2023"
    }
  ];
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

  return (
    <Flex flexDirection={"column"} gap={"3rem"} alignItems={"center"} marginTop={"5rem"}>
        <Card minWidth={"50%"} maxWidth={"80%"} width={"60%"}>
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