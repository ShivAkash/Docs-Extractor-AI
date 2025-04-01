import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";

const VerificationForm = () => {
  return (
    <div className="shadow-default flex w-full flex-col items-center justify-center rounded-xl bg-white p-8 ">
      <h2 className="sm:text-title-xl2 mb-5 text-2xl font-bold text-black dark:text-white">
        Verify Your Account
      </h2>
      <span className="mb-3 block text-center text-lg font-medium">
        Enter the 6 digit code sent to your phone number
      </span>

      <form className="block w-full">
        <div className=" my-4 mt-6 flex  items-center justify-center ">
          <InputOTP maxLength={6}>
            <InputOTPGroup className="gap-1.5 md:gap-3">
              <InputOTPSlot
                className="w-22 h-16 rounded-md border border-slate-300 text-3xl font-medium text-black"
                index={0}
              />
              <InputOTPSlot
                className="w-22 h-16 rounded-md border border-slate-300 text-3xl font-medium text-black"
                index={1}
              />
              <InputOTPSlot
                className="w-22 h-16 rounded-md border border-slate-300 text-3xl font-medium text-black"
                index={2}
              />
              <InputOTPSlot
                className="w-22 h-16 rounded-md border border-slate-300 text-3xl font-medium text-black"
                index={3}
              />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <span className="my-4 block w-full text-center  text-lg font-medium text-black">
          Did not receive a code?
          <Button
            variant="link"
            className="pl-0 text-lg text-green-600 hover:no-underline"
          >
            Resend
          </Button>
        </span>
        <div className="mb-5">
          <input
            type="submit"
            value="Verify"
            className="w-full cursor-pointer rounded-lg border border-green-500 bg-green-500 p-4 text-center text-white transition hover:bg-opacity-90 "
          />
        </div>

        <span className="text-red block text-center text-lg ">
          Don’t share the verification code with anyone!
        </span>
      </form>
    </div>
  );
};

export default VerificationForm;
