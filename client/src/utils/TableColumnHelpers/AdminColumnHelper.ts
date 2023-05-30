import { createColumnHelper } from "@tanstack/react-table";

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
const pastShipmentsColumnHelper = createColumnHelper<PastShipments>();
const unassignedShipmentsColumnHelper = createColumnHelper<UnassignedShipments>();

export const activeShipmentsColumns = [
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

export const pastShipmentsColumns = [
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

export const unassignedShipmentsColumns = [
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