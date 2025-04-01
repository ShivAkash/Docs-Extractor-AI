import VerificationForm from "@/components/Forms/VerificationForm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="flex w-full flex-col items-center justify-center  xl:w-1/3">
        <Link className="mb-5.5 inline-block" href="/">
          <Image
            className="hidden dark:block"
            src={"/images/logo/logo.svg"}
            alt="Logo"
            width={176}
            height={32}
          />
          <Image
            className="dark:hidden"
            src={"/images/logo/logo-dark.svg"}
            alt="Logo"
            width={176}
            height={32}
          />
        </Link>
        <div className="w-full">
          <VerificationForm />
        </div>
      </div>
    </div>
  );
};

export default page;
