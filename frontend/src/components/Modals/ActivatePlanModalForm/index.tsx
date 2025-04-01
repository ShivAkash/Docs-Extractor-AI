"use client";
import SelectInput from "@/components/Inputs/SelectInput";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const ActivatePlanModalForm = ({ children }: { children: React.ReactNode }) => {
  //   const [phone, setPhone] = useState("");
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="top-[30%]   translate-y-[-30%] border-none bg-white p-0 dark:bg-boxdark  ">
        <AlertDialogHeader className="flex items-center border-pink-400 bg-blue-400  py-5">
          <div className="flex w-2/3 ">
            <h2 className="text-2xl text-white">Activate Subscription Plan</h2>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter className={"p-5"}>
          <form className=" w-full space-y-5">
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-[#666666] dark:text-white ">
                Choose Subscription Plan
              </Label>
              <SelectInput
                options={[
                  "Basic - Ksh 100 / 1 Days",
                  "Standard - Ksh 1500 / 30 Days",
                ]}
                placeholder="Select Susbscription Plan"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-lg font-semibold text-[#666666] dark:text-white ">
                Choose Payment Option
              </Label>
              <SelectInput
                options={["Cash", "Wallet"]}
                placeholder="Select Susbscription Plan"
              />
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button
                type="submit"
                className="bg-blue-500 py-6  text-lg text-white hover:bg-blue-500/90"
              >
                Submit
              </Button>

              <AlertDialogCancel className="border-none bg-neutral-200 py-6 text-lg text-black hover:bg-neutral-300/80">
                Close
              </AlertDialogCancel>
            </div>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ActivatePlanModalForm;
