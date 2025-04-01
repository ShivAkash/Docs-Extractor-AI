import React from "react";

interface Props {
  title: string;
}

const SectionHeader = ({ title }: Props) => {
  return (
    <div className="rounded-md bg-white p-4 dark:bg-boxdark ">
      <h2 className="text-lg font-medium">{title}</h2>
    </div>
  );
};

export default SectionHeader;
