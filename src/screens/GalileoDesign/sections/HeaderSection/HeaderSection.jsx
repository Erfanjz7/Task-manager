import { CalendarIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HeaderSection = () => {
  const taskData = {
    title: "Today",
    totalTasks: 5,
    completedTasks: 2,
  };

  return (
    <Card className="border-0 rounded-none bg-[#f7f9fc] shadow-none">
      <CardContent className="flex items-center justify-between p-4 h-[72px]">
        <div className="flex items-center gap-4">
          <div className="flex w-12 h-12 items-center justify-center bg-[#e8edf2] rounded-lg">
            <CalendarIcon className="w-6 h-6 text-[#0c141c]" />
          </div>

          <div className="flex flex-col">
            <h3 className="font-medium text-base text-[#0c141c] leading-6 font-sans">
              {taskData.title}
            </h3>
            <p className="font-normal text-sm text-[#4f7296] leading-[21px]">
              {taskData.totalTasks} tasks • {taskData.completedTasks} completed
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6 text-[#4f7296]" />
        </div>
      </CardContent>
    </Card>
  );
};
