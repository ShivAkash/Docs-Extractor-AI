"use client";

import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

export default function JiraConnectPage() {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="JIRA Connect" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <div className="py-6">
            <h2 className="text-2xl font-bold mb-4">JIRA Integration</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Connect and sync your requirements with JIRA.
            </p>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
} 