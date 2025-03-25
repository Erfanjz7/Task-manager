import React from "react";
import { useNavigate } from "react-router-dom";
import { AppWrapperSection } from "./sections/AppWrapperSection";
import { CalendarSection } from "./sections/CalendarSection";
import { HabitsSection } from "./sections/HabitsSection";
import { HeaderSection } from "./sections/HeaderSection";
import { MainContentSection } from "./sections/MainContentSection";
import { StatusOverviewSection } from "./sections/StatusOverviewSection/StatusOverviewSection";
import { TaskListSection } from "./sections/TaskListSection";
import { TodaySection } from "./sections/TodaySection";
import {
  BellIcon,
  PlusIcon,
  SearchIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  AvatarFallback,
} from "../../components/ui/avatar.jsx";

import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { XIcon } from "lucide-react";

const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];


export const GalileoDesign9 = () => {
   const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full bg-white">
      <div className="flex flex-col min-h-[800px] w-full bg-[#f7f9fc]">
        
        {/* Header/Navigation */}
        <header className="items-center justify-between px-10 py-3 border-b border-[#e5e8ea] flex w-full">
          <div className="flex items-center gap-4">
            <div className="w-4 h-4">
              <img
                src="https://c.animaapp.com/m8lmsdyb8a86fr/img/vector---0-2.svg"
                alt="Task Tracker Logo"
                className="w-full h-full"
              />
            </div>
            <h1 className="font-bold text-lg text-[#111416] font-['Manrope',Helvetica]">
              Task Tracker
            </h1>
          </div>

          <div className="flex items-center justify-end gap-8 flex-1">
            {/* Navigation */}
            <nav className="flex items-center gap-9">
              {NAV_ITEMS.map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="h-10 font-medium text-sm text-[#111416] font-['Manrope',Helvetica]"
                  onClick={() => navigate(index === 0 ? '/' : `/page${index }`)} // Conditional URL
                >
                  {item}
                </Button>
              ))}
            </nav>
            {/* Icons on the right */}
            <div className="flex gap-2 items-center">
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 bg-[#eff2f4] rounded-xl"
              >
                <PlusIcon className="h-5 w-5 text-[#111416]" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 bg-[#eff2f4] rounded-xl"
              >
                <BellIcon className="h-5 w-5 text-[#111416]" />
              </Button>
            </div>

            {/* User Avatar */}
            <Avatar className="w-10 h-10">
              <AvatarImage
                src="https://c.animaapp.com/m8lmsdyb8a86fr/img/depth-4--frame-2.png"
                alt="User profile"
              />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </div>
        </header>
        
        <div className="flex justify-center px-40 py-5 w-full">
          <div className="flex flex-col max-w-[960px] w-full">
            <div className="flex flex-wrap gap-[12px] p-4 w-full">
              <div className="w-72">
                <h1 className="font-bold text-[32px] text-[#0c141c] leading-10 font-['Manrope',Helvetica]">
                  Today
                </h1>
              </div>
            </div>

            <AppWrapperSection />
            <TaskListSection />

            <div className="flex flex-col pt-5 pb-3 px-4 w-full">
              <h2 className="font-bold text-[22px] text-[#0c141c] leading-7 font-['Manrope',Helvetica]">
                How are you today?
              </h2>
            </div>

            <StatusOverviewSection />
            <HeaderSection />
            <TodaySection />
            <CalendarSection />
            <HabitsSection />
          </div>
        </div>
      </div>
    </div>
  );
};
