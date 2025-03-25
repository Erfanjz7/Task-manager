import { ChevronRightIcon } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../../../../components/ui/card";

export const HabitsSection = () => {
  return (
    <Card className="bg-[#f7f9fc] border-none rounded-none shadow-none">
      <CardContent className="flex items-center justify-between p-4 h-[72px]">
        <div className="flex items-center gap-4">
          <div className="flex w-12 h-12 items-center justify-center bg-[#e8edf2] rounded-lg">
            <div className="w-6 h-6 bg-[url(https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-8.svg)] bg-[100%_100%]" />
          </div>

          <div className="flex flex-col">
            <div className="font-medium text-base text-[#0c141c] leading-6 font-['Manrope',Helvetica]">
              Habits
            </div>
            <div className="font-normal text-sm text-[#4f7296] leading-[21px] font-['Manrope',Helvetica]">
              6 habits
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center w-7">
          <ChevronRightIcon className="w-6 h-6 text-[#4f7296]" />
        </div>
      </CardContent>
    </Card>
  );
};
