import { cn } from "@/lib/utils";
import React from "react";

const DataTableCell = ({
  value,
  className = "",
}: {
  value?: any;
  className?: string;
}) => {
  return <div className={cn("py-4", className)}>{value}</div>;
};

export default DataTableCell;
