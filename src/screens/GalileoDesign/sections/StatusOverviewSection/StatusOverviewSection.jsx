import React from "react";
import { Badge } from "../../../../components/ui/badge";

export const StatusOverviewSection = () => {
  // Data for status items to enable mapping
  const statusItems = [
    {
      id: 1,
      value: "10",
      iconUrl: "https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-14.svg",
    },
    {
      id: 2,
      value: "20",
      iconUrl: "https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-13.svg",
    },
    {
      id: 3,
      value: "30",
      iconUrl: "https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-6.svg",
    },
    {
      id: 4,
      value: "40",
      iconUrl: "https://c.animaapp.com/m8lqw056mMhA60/img/vector---0-5.svg",
    },
  ];

  return (
    <section className="flex flex-wrap items-start justify-between gap-4 px-4 py-2 w-full">
      {statusItems.map((item) => (
        <Badge
          key={item.id}
          variant="outline"
          className="flex items-center justify-center gap-2 px-3 py-2 bg-transparent hover:bg-transparent"
        >
          <div className="flex items-start">
            <div
              className="w-6 h-6"
              style={{
                backgroundImage: `url(${item.iconUrl})`,
                backgroundSize: "100% 100%",
              }}
            />
          </div>
          <span className="font-['Manrope',Helvetica] font-bold text-[#4f7296] text-[13px] leading-5">
            {item.value}
          </span>
        </Badge>
      ))}
    </section>
  );
};
