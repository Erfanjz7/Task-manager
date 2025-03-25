import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const TodaySection = () => {
  return (
    <Card className="flex h-[72px] items-center justify-between px-4 py-2 w-full bg-[#f7f9fc] rounded-none border-none shadow-none">
      <CardContent className="flex justify-between items-center w-full p-0">
        <div className="flex items-center gap-4">
          <div className="flex w-12 h-12 items-center bg-[#e8edf2] rounded-lg justify-center">
            <div className="w-6 h-6 bg-[url(https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-8.svg)] bg-[100%_100%]" />
          </div>

          <div className="flex flex-col">
            <div className="font-medium text-[#0c141c] text-base leading-6 font-sans">
              Habits
            </div>
            <div className="font-normal text-[#4f7296] text-sm leading-[21px] font-sans">
              6 habits
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <ChevronRightIcon className="w-6 h-6 text-[#4f7296]" />
        </div>
      </CardContent>
    </Card>
  );
};
