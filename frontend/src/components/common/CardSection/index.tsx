import { cn } from "@/lib/utils";

const CardSection = ({
  children,
  title,
  className,
}: {
  children: React.ReactNode;
  title: string;
  className?: string;
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-strokedark">
        <h3 className="text-lg font-medium text-black dark:text-white">
          {title}
        </h3>
      </div>

      {/* children */}
      <div className={cn("p-6.5", className)}>{children}</div>
    </div>
  );
};

export default CardSection;
