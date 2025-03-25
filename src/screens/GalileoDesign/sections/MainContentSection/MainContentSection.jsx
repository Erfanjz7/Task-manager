import React from "react";
import { Button } from "../../../../components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../../../../components/ui/navigation-menu";

export const MainContentSection = () => {
  // Navigation menu items data
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Task Tracker", href: "/page1" },
    { label: "Routine", href: "/page2" },
    { label: "Qoutes", href: "#" },
    { label: "Whish List", href: "#" },
    { label: "Bad Habits", href: "#" },
    { label: "Good Habits", href: "#" },
    { label: "Things To Try", href: "#" },
    { label: "My Favourites", href: "#" },

  ];

  return (
    <header className="flex items-center justify-between px-10 py-3 border-b border-[#e5e8ea] w-full">
      {/* Logo and Brand Name */}
      <div className="flex items-center gap-4">
        <div className="w-4">
          <div className="w-4 h-4 bg-[url(https://c.animaapp.com/m8lqw056mMhA60/img/vector---0.svg)] bg-[100%_100%]" />
        </div>
        <h1 className="font-bold text-lg text-[#0c141c] font-['Manrope',Helvetica] leading-[23px]">
          MindfulLife
        </h1>
      </div>

      {/* Navigation and Upgrade Button */}
      <div className="flex items-center justify-end gap-8 flex-1">
        <NavigationMenu className="max-w-none">
          <NavigationMenuList className="flex gap-9">
            {navItems.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  href={item.href}
                  className="font-medium text-sm text-[#0c141c] font-['Manrope',Helvetica] leading-[21px]"
                >
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <Button className="h-10 px-4 py-0 rounded-[20px] bg-[#e8edf2] hover:bg-[#d8dde2] text-[#0c141c]">
          <span className="font-bold text-sm text-center font-['Manrope',Helvetica] leading-[21px]">
            Upgrade
          </span>
        </Button>
      </div>
    </header>
  );
};
