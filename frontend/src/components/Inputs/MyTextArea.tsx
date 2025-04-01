import { cn } from "@/lib/utils";
import React from "react";

interface TextAreaProps {
  required?: boolean;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  rows?: number;
}
const MyTextArea: React.FC<TextAreaProps> = ({
  required,
  label = "",
  type = "text",
  placeholder = "",
  rows = 4,
  className,
  ...rest
}) => {
  return (
    <div className={cn("", className)}>
      <label className="mb-3 block text-base font-medium text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <textarea
        rows={rows}
        placeholder={placeholder}
        className=" w-full  rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...rest}
      ></textarea>
    </div>
  );
};

export default MyTextArea;
