import { RiBubbleChartLine } from "@remixicon/react";

export default function Logo() {
  return (
    <div className="flex flex-row gap-1  items-center">
      <div className="text-secondary font-bold">
        <RiBubbleChartLine className="h-8 w-8" />
      </div>
      <div className="font-bold text-2xl text-primary">HYDRO</div>
      <div className="text-md text-secondary">app</div>
    </div>
  );
}
