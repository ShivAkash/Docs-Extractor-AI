"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-[225px] flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <span className="font-orbitron text-2xl font-black   ">
            AUTOMATA
          </span>
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              MENU
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Extractor --> */}
              <li>
                <Link
                  href="/extractor"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("extractor") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.5 2.25H1.5C0.675 2.25 0 2.925 0 3.75V14.25C0 15.075 0.675 15.75 1.5 15.75H16.5C17.325 15.75 18 15.075 18 14.25V3.75C18 2.925 17.325 2.25 16.5 2.25ZM16.5 14.25H1.5V3.75H16.5V14.25Z"
                      fill=""
                    />
                    <path
                      d="M3.75 6.75H14.25V8.25H3.75V6.75Z"
                      fill=""
                    />
                    <path
                      d="M3.75 10.5H14.25V12H3.75V10.5Z"
                      fill=""
                    />
                  </svg>
                  Extractor
                </Link>
              </li>

              {/* <!-- Menu Item Visualizer --> */}
              <li>
                <Link
                  href="/visualizer"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("visualizer") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 0.5625C4.17188 0.5625 0.25 4.48438 0.25 9.3125C0.25 14.1406 4.17188 18.0625 9 18.0625C13.8281 18.0625 17.75 14.1406 17.75 9.3125C17.75 4.48438 13.8281 0.5625 9 0.5625ZM9 16.3125C5.13281 16.3125 2 13.1797 2 9.3125C2 5.44531 5.13281 2.3125 9 2.3125C12.8672 2.3125 16 5.44531 16 9.3125C16 13.1797 12.8672 16.3125 9 16.3125Z"
                      fill=""
                    />
                    <path
                      d="M9 4.0625C7.75781 4.0625 6.75 5.07031 6.75 6.3125C6.75 7.55469 7.75781 8.5625 9 8.5625C10.2422 8.5625 11.25 7.55469 11.25 6.3125C11.25 5.07031 10.2422 4.0625 9 4.0625ZM9 7.3125C8.41406 7.3125 8 6.89844 8 6.3125C8 5.72656 8.41406 5.3125 9 5.3125C9.58594 5.3125 10 5.72656 10 6.3125C10 6.89844 9.58594 7.3125 9 7.3125Z"
                      fill=""
                    />
                    <path
                      d="M9 10.0625C7.75781 10.0625 6.75 11.0703 6.75 12.3125C6.75 13.5547 7.75781 14.5625 9 14.5625C10.2422 14.5625 11.25 13.5547 11.25 12.3125C11.25 11.0703 10.2422 10.0625 9 10.0625ZM9 13.3125C8.41406 13.3125 8 12.8984 8 12.3125C8 11.7266 8.41406 11.3125 9 11.3125C9.58594 11.3125 10 11.7266 10 12.3125C10 12.8984 9.58594 13.3125 9 13.3125Z"
                      fill=""
                    />
                  </svg>
                  Visualizer
                </Link>
              </li>

              {/* <!-- Menu Item JIRA Connect --> */}
              <li>
                <Link
                  href="/jira"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("jira") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <svg
                    className="fill-current"
                    width="17"
                    height="17"
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
                  JIRA Connect
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
