import React from "react";

interface TextInputProps {
  required?: boolean;
  label?: string;
  type?: string;
  placeholder?: string;
}
const TextInput: React.FC<TextInputProps> = ({
  required,
  label = "",
  type = "text",
  placeholder = "",
  ...rest
}) => {
  return (
    <div>
      <label className="mb-3 block text-base font-medium text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        {...rest}
      />
    </div>
  );
};

export default TextInput;
