import { createColumnHelper } from "@tanstack/react-table";
const activeShipmentsColumnHelper = createColumnHelper<ActiveShipments>();
const pastShipmentsColumnHelper = createColumnHelper<PastShipments>();

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

export const activeShipmentsColumns = [
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

export const pastShipmentsColumns = [
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