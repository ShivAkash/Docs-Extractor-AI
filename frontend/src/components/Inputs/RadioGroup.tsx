import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface RadioGroupItem {
  id: string;
  value: any;
  text: string;
}
interface RadioGroupProp {
  label?: string;
  required?: boolean;
  items: RadioGroupItem[];
  defaultValue?: any;
}
const RadioGroupInput = ({
  label,
  items,
  required,
  defaultValue,
}: RadioGroupProp) => {
  return (
    <div>
      <label className="mb-3 block text-base font-medium text-black dark:text-white">
        {label} {required && <span className="text-meta-1">*</span>}
      </label>
      <div>
        <RadioGroup
          defaultValue={defaultValue}
          className="flex flex-row space-x-3"
        >
          {items.map((i, k) => (
            <div key={k} className="flex flex-row items-center space-x-4">
              <RadioGroupItem value={i.value} id={i.id} className="h-6 w-6" />
              <label htmlFor={i.id}>{i.text}</label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default RadioGroupInput;
