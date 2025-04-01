"use client";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { DataTablePagination } from "./DataTablePagination";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchDetails?: { placeholder: string; searchField: string };
}

function DataTable<TData, TValue>({
  columns,
  data,
  searchDetails = { placeholder: "Filter", searchField: "" },
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  return (
    <div className="max-w-full overflow-x-auto">
      {/* add input and toggle columns */}
      <div className="mb-5 flex w-full flex-col items-center justify-between gap-2 px-6.5 py-1 xl:flex-row">
        <div className="w-3/4 md:w-1/2 xl:w-1/5">
          <input
            type="text"
            placeholder={searchDetails.placeholder}
            value={
              (table
                .getColumn(searchDetails.searchField)
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn(searchDetails.searchField)
                ?.setFilterValue(event.target.value)
            }
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-2 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
          />
        </div>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto border-stroke dark:border-strokedark dark:bg-form-input dark:text-white"
              >
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
              {/* <div className="ml-auto flex cursor-pointer flex-row items-center gap-2 rounded-lg border-[1.5px] border-neutral-200  p-2 px-4  font-medium text-black hover:bg-neutral-50 dark:border-form-strokedark dark:bg-form-input dark:text-white">
                Columns <ChevronDownIcon className="h-5 w-5" />
              </div> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className=" border-stroke bg-white dark:border-strokedark  dark:bg-form-input"
            >
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="cursor-pointer font-medium capitalize text-black hover:bg-neutral-100 dark:text-white dark:hover:bg-meta-4  "
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Table className="w-full table-auto">
        <TableHeader className="border-none ">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-y border-stroke text-left dark:border-strokedark "
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead className="border-none pb-6 pt-8" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <>
          <TableBody className="text-base">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      className=" border-b border-[#eee] py-2 text-lg font-medium dark:border-strokedark "
                      key={cell.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-lg"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </>
      </Table>
      <DataTablePagination table={table} className="px-6.5" />
    </div>
  );
}

export default DataTable;
