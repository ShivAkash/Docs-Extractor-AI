import React from "react";
import CardDataStats from "../CardDataStats";

const Ecommerce = () => {
  return (
    <>
      <div className="mb-6">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Dashboard
        </h2>

        <span className="text-lg font-medium">Today Summary</span>
      </div>
      <div className="2xl:gap-7.5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        <CardDataStats title="Total Revenue" total="Ksh 3000" rate="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#3C50E0"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-bar-chart-4 "
          >
            <path d="M3 3v18h18" />
            <path d="M13 17V9" />
            <path d="M18 17V5" />
            <path d="M8 17v-3" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Completed Orders" total="45,2K" rate="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#22c55e"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-user-round-check"
          >
            <path d="M2 21a8 8 0 0 1 13.292-6" />
            <circle cx="10" cy="8" r="5" />
            <path d="m16 19 2 2 4-4" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Cancelled Orders" total="0" rate="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f87171"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-circle-x"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="m15 9-6 6" />
            <path d="m9 9 6 6" />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Orders" total="300" rate="">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#fb923c"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-tags"
          >
            <path d="m15 5 6.3 6.3a2.4 2.4 0 0 1 0 3.4L17 19" />
            <path d="M9.586 5.586A2 2 0 0 0 8.172 5H3a1 1 0 0 0-1 1v5.172a2 2 0 0 0 .586 1.414L8.29 18.29a2.426 2.426 0 0 0 3.42 0l3.58-3.58a2.426 2.426 0 0 0 0-3.42z" />
            <circle cx="6.5" cy="9.5" r=".5" fill="currentColor" />
          </svg>
        </CardDataStats>
      </div>
    </>
  );
};

export default Ecommerce;
