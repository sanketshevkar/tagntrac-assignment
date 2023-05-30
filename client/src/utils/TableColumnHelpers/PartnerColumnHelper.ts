import { createColumnHelper } from "@tanstack/react-table";

type PastShipments = {
    sender: string;
    receiver: string;
    from: string;
    to: string;
    status: string,
    deliveryDate: string
};

const pastShipmentsColumnHelper = createColumnHelper<PastShipments>();

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
  pastShipmentsColumnHelper.accessor("status", {
    cell: (info) => info.getValue(),
    header: "Status",
  }),
  pastShipmentsColumnHelper.accessor("deliveryDate", {
    cell: (info) => info.getValue(),
    header: "Delivered On",
  })
];