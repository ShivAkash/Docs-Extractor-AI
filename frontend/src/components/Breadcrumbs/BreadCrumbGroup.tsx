import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  items: {
    name: string;
  }[];
}
const BreadCrumbGroup = ({ className, items }: Props) => {
  return (
    <Breadcrumb
      className={cn(
        className,
        "rounded-md border border-stroke p-4 py-3 dark:border-strokedark sm:px-6 xl:px-7.5 xl:py-5.5",
      )}
    >
      <BreadcrumbList>
        {items.map((i, k) => (
          <BreadcrumbItem
            className="cursor-pointer text-base hover:text-primary  dark:text-white"
            key={k}
          >
            <div className="flex flex-row items-center gap-4">
              <span className="cursor-pointer text-lg font-medium hover:text-primary">
                {" "}
                {i.name}
              </span>
              {k !== items.length - 1 && (
                <BreadcrumbSeparator>
                  <MoveRight className="" />
                </BreadcrumbSeparator>
              )}
            </div>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbGroup;
