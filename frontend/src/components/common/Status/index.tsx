import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  status: string;
  className?: string;
}
const Status = ({ status, className }: Props) => {
  return (
    <div
      className={cn(
        className,
        "inline-block rounded-md p-1 text-base text-white",
        status === "Completed" && "bg-meta-3",
        status === "Running" && "bg-meta-10",
        status === "Cancelled" || (status === "Rejected" && "bg-meta-7"),
        status === "Approved" && "bg-meta-5",
      )}
    >
      {status}
    </div>
  );
};

export default Status;
