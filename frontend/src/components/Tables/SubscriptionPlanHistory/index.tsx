"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "../DataTable/DataTableColumnHeader";
import DataTableCell from "../DataTable/DataTableCell";
import DataTable from "../DataTable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ActivatePlanModalForm from "@/components/Modals/ActivatePlanModalForm";
import { Subscription } from "@/types";
import { subscriptions } from "@/data/subscription";

export const columns: ColumnDef<Subscription>[] = [
  {
    accessorKey: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => {
      return <DataTableCell value={row.getValue("no")} />;
    },
  },

  {
    accessorKey: "planName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Plan Name" />
    ),
  },

  {
    accessorKey: "days",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days" />
    ),
  },

  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
  },
  {
    accessorKey: "purchasedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchased Date" />
    ),
  },
  {
    accessorKey: "expiryDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Expiry Date" />
    ),
  },
  {
    accessorKey: "details",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Details" />
    ),
  },
];
const SubscriptionList = () => {
  return (
    <>
      <div className=" rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex items-center justify-between border-b border-stroke pr-6.5 ">
          <div className=" px-6.5 py-4 dark:border-strokedark">
            <h3 className="text-lg font-medium text-black dark:text-white">
              Subscription Plan History - Provider
            </h3>
          </div>

          <ActivatePlanModalForm>
            <Button
              asChild
              className="rounded-none p-2 py-6 text-base font-light text-white"
            >
              <Link href="">Activate Subscription Plan</Link>
            </Button>
          </ActivatePlanModalForm>
        </div>

        <div className="mt-10 p-6.5">
          <DataTable columns={columns} data={subscriptions} />
        </div>
      </div>
    </>
  );
};

export default SubscriptionList;
