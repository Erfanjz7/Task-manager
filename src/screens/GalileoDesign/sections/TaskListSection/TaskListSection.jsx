import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const TaskListSection = () => {
  // Calendar data
  const month = "September 2023";
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Generate calendar dates for September 2023
  const calendarDates = [
    [null, null, null, null, 1, 2, 3],
    [4, 5, 6, 7, 8, 9, 10],
    [11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24],
    [25, 26, 27, 28, 29, 30, null],
  ];

  // Selected date (day 5)
  const selectedDate = 5;

  return (
    <section className="flex flex-wrap items-center justify-center gap-6 p-4 w-full">
      <Card className="min-w-72 max-w-[336px] flex-1">
        <CardContent className="p-0">
          {/* Calendar header with month and navigation */}
          <div className="flex items-center justify-between p-1 w-full">
            <Button variant="ghost" size="icon" className="w-10 h-10">
              <ChevronLeftIcon className="h-[18px] w-[18px]" />
            </Button>

            <h2 className="font-bold text-base text-center [font-family:'Manrope',Helvetica]">
              {month}
            </h2>

            <Button variant="ghost" size="icon" className="w-10 h-10">
              <ChevronRightIcon className="h-[18px] w-[18px]" />
            </Button>
          </div>

          {/* Days of week header */}
          <div className="flex w-full">
            {daysOfWeek.map((day, index) => (
              <div
                key={`day-${index}`}
                className="flex w-12 h-12 items-center justify-center"
              >
                <span className="[font-family:'Manrope',Helvetica] font-bold text-[13px] text-[#0c141c]">
                  {day}
                </span>
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          {calendarDates.map((week, weekIndex) => (
            <div key={`week-${weekIndex}`} className="flex w-full">
              {week.map((day, dayIndex) =>
                day !== null ? (
                  <div
                    key={`date-${weekIndex}-${dayIndex}`}
                    className="flex-col w-12 h-12 flex items-center"
                  >
                    <div
                      className={`flex items-center justify-center flex-1 self-stretch w-full rounded-3xl ${
                        day === selectedDate ? "bg-[#5ea5ed]" : ""
                      }`}
                    >
                      <span className="[font-family:'Manrope',Helvetica] font-medium text-sm text-[#0c141c]">
                        {day}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    key={`empty-${weekIndex}-${dayIndex}`}
                    className="w-12 h-12"
                  />
                ),
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
};
