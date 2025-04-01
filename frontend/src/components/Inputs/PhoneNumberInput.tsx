"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";

interface PhoneInputProps {
  height?: number;
  label?: string;
  required?: boolean;
}
const PhoneNumberInput = ({
  height = 40,
  label,
  required,
  ...rest
}: PhoneInputProps) => {
  return (
    <div>
      <label className="mb-3 block text-base font-medium text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <PhoneInput
        country={"ke"}
        // value={phone}
        // onChange={(phone) => setPhone(phone)}
        inputStyle={{
          width: "100%",
          height: height,
          fontSize: 16,
        }}
        {...rest}
      />
    </div>
  );
};

export default PhoneNumberInput;
