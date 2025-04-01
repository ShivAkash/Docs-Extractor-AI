"use client";

import Link from "next/link";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export default function Home() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Dashboard" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
        {/* Extractor Card */}
        <Link
          href="/extractor"
          className="rounded-xl border border-stroke bg-white p-6 shadow-default hover:shadow-lg transition-shadow duration-300 dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.6687 1.44374C17.1187 0.893744 16.4312 0.618744 15.675 0.618744H7.42498C6.25623 0.618744 5.25935 1.58124 5.25935 2.78437V4.12499H4.29685C3.88435 4.12499 3.50623 4.46874 3.50623 4.91562C3.50623 5.36249 3.84998 5.70624 4.29685 5.70624H5.25935V10.2781H4.29685C3.88435 10.2781 3.50623 10.6219 3.50623 11.0687C3.50623 11.4812 3.84998 11.8594 4.29685 11.8594H5.25935V16.4312H4.29685C3.88435 16.4312 3.50623 16.775 3.50623 17.2219C3.50623 17.6687 3.84998 18.0125 4.29685 18.0125H5.25935V19.25C5.25935 20.4187 6.22185 21.4156 7.42498 21.4156H15.675C17.2218 21.4156 18.4937 20.1437 18.5281 18.5969V3.47187C18.4937 2.68124 18.2187 1.95937 17.6687 1.44374Z"
                  fill=""
                />
              </svg>
            </div>
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Extractor
              </h4>
              <span className="text-sm font-medium">
                Extract requirements from documents
              </span>
            </div>
          </div>
        </Link>

        {/* Visualizer Card */}
        <Link
          href="/visualizer"
          className="rounded-xl border border-stroke bg-white p-6 shadow-default hover:shadow-lg transition-shadow duration-300 dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 0.5625C6.17188 0.5625 2.25 4.48438 2.25 9.3125C2.25 14.1406 6.17188 18.0625 11 18.0625C15.8281 18.0625 19.75 14.1406 19.75 9.3125C19.75 4.48438 15.8281 0.5625 11 0.5625ZM11 16.3125C7.13281 16.3125 4 13.1797 4 9.3125C4 5.44531 7.13281 2.3125 11 2.3125C14.8672 2.3125 18 5.44531 18 9.3125C18 13.1797 14.8672 16.3125 11 16.3125Z"
                  fill=""
                />
                <path
                  d="M11 4.0625C9.75781 4.0625 8.75 5.07031 8.75 6.3125C8.75 7.55469 9.75781 8.5625 11 8.5625C12.2422 8.5625 13.25 7.55469 13.25 6.3125C13.25 5.07031 12.2422 4.0625 11 4.0625ZM11 7.3125C10.4141 7.3125 10 6.89844 10 6.3125C10 5.72656 10.4141 5.3125 11 5.3125C11.5859 5.3125 12 5.72656 12 6.3125C12 6.89844 11.5859 7.3125 11 7.3125Z"
                  fill=""
                />
                <path
                  d="M11 10.0625C9.75781 10.0625 8.75 11.0703 8.75 12.3125C8.75 13.5547 9.75781 14.5625 11 14.5625C12.2422 14.5625 13.25 13.5547 13.25 12.3125C13.25 11.0703 12.2422 10.0625 11 10.0625ZM11 13.3125C10.4141 13.3125 10 12.8984 10 12.3125C10 11.7266 10.4141 11.3125 11 11.3125C11.5859 11.3125 12 11.7266 12 12.3125C12 12.8984 11.5859 13.3125 11 13.3125Z"
                  fill=""
                />
              </svg>
            </div>
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                Visualizer
              </h4>
              <span className="text-sm font-medium">
                Visualize extracted requirements
              </span>
            </div>
          </div>
        </Link>

        {/* JIRA Connect Card */}
        <Link
          href="/jira"
          className="rounded-xl border border-stroke bg-white p-6 shadow-default hover:shadow-lg transition-shadow duration-300 dark:border-strokedark dark:bg-boxdark"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2 dark:bg-meta-4">
              <svg
                className="fill-primary dark:fill-white"
                width="22"
                height="22"
                viewBox="0 0 490.35 490.35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M468.675,54.775l-33-33c-28.9-28.9-75.9-28.9-104.8,0l-75.2,75.2c-28.9,28.9-28.9,75.9,0,104.8l1.9,1.9l-53.9,53.9l-2-2
                  c-28.9-28.9-75.9-28.9-104.8,0l-75.2,75.2c-28.9,28.9-28.9,75.9,0,104.8l33,33c28.9,28.9,75.9,28.9,104.8,0l75.2-75.2
                  c28.9-28.9,28.9-75.9,0-104.8l-1.9-1.9l53.9-53.9l2,2c28.9,28.9,75.9,28.9,104.8,0l75.2-75.2
                  C497.575,130.775,497.575,83.675,468.675,54.775z M205.675,317.575c12.9,12.9,12.9,33.9,0,46.9l-75.2,75.2
                  c-12.9,12.9-33.9,12.9-46.9,0l-33-33c-12.9-12.9-12.9-33.9,0-46.9l75.2-75.2c12.9-12.9,33.9-12.9,46.9,0l2,2l-32.6,32.6
                  c-8.3,8.3-8.3,20.8,0,29.2c4.2,4.2,9.4,6.3,14.6,6.3s10.4-2.1,14.6-6.3l32.6-32.6L205.675,317.575z M439.675,130.675l-75.2,75.2
                  c-12.9,12.9-33.9,12.9-46.9,0l-2-2l32.6-32.6c8.3-8.3,8.3-20.8,0-29.2s-20.8-8.3-29.2,0l-32.6,32.6l-1.9-1.9
                  c-12.9-12.9-12.9-33.9,0-46.9l75.2-75.2c12.9-12.9,33.9-12.9,46.9,0l33,33C452.675,96.675,452.675,117.675,439.675,130.675z"
                  fill=""
                />
              </svg>
            </div>
            <div>
              <h4 className="text-title-md font-bold text-black dark:text-white">
                JIRA Connect
              </h4>
              <span className="text-sm font-medium">
                Connect and sync with JIRA
              </span>
            </div>
          </div>
        </Link>
      </div>
    </DefaultLayout>
  );
}
