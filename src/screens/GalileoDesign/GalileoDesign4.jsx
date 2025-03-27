import { BellIcon, SearchIcon } from "lucide-react";
import React from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../../components/ui/navigation-menu";
import { CheckIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { XIcon } from "lucide-react";
import {
  PlusIcon,
  MoreVerticalIcon,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export const GalileoDesign4 = () => {

  const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];

  // Category data
  const categories = [
    { id: 1, name: "Travel" },
    { id: 2, name: "Career" },
    { id: 3, name: "Finance" },
    { id: 4, name: "Health" },
    { id: 5, name: "Education", shortName: "ion" },
    { id: 6, name: "Lifestyle" },
  ];

  // Featured goals data
  const featuredGoals = [
    {
      id: 1,
      title: "Learn to surf in Bali",
      progress: "50%",
      categories: ["Travel", "Health"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/surf-bali.jpg",
    },
    {
      id: 2,
      title: "Get a promotion at work",
      progress: "10%",
      categories: ["Career"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/promotion.jpg",
    },
    {
      id: 3,
      title: "Start a savings account",
      progress: "75%",
      categories: ["Finance"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/savings.jpg",
    },
    {
      id: 4,
      title: "Run a marathon",
      progress: "0%",
      categories: ["Health"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/marathon.jpg",
    },
    {
      id: 5,
      title: "Go back to school",
      progress: "100%",
      categories: ["Education"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/school.jpg",
    },
    {
      id: 6,
      title: "Meditate every day for a year",
      progress: "25%",
      categories: ["Lifestyle"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/meditate.jpg",
    },
    {
      id: 7,
      title: "Learn to cook Thai food",
      progress: "90%",
      categories: ["Lifestyle"],
      image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/thai-food.jpg",
    },
  ];

  // Vision board images
  const visionBoardImages = [
    { id: 1, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-1.jpg" },
    { id: 2, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-2.jpg" },
    { id: 3, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-3.jpg" },
    { id: 4, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-4.jpg" },
    { id: 5, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-5.jpg" },
    { id: 6, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-6.jpg" },
    { id: 7, image: "https://c.animaapp.com/m8oms3qrhEJ5Ra/img/vision-7.jpg" },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Main content */}
      <main className="max-w-6xl mx-auto p-6">
        {/* Search */}
        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input className="pl-10 bg-muted/50" placeholder="Search" />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant="outline"
              className="rounded-full px-4 py-1 bg-background hover:bg-muted cursor-pointer"
            >
              {category.shortName ? category.shortName : category.name}
            </Badge>
          ))}
        </div>

        {/* Featured section */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Featured</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {featuredGoals.slice(0, 5).map((goal) => (
              <Card
                key={goal.id}
                className="overflow-hidden border hover:shadow-md transition-shadow"
              >
                <div className="aspect-ratio-4/3 relative h-32 overflow-hidden">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1">{goal.title}</h3>
                  <div className="text-xs text-muted-foreground mb-1">
                    Progress: {goal.progress}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {goal.categories.map((cat, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground">
                        {cat}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
            {featuredGoals.slice(5).map((goal) => (
              <Card
                key={goal.id}
                className="overflow-hidden border hover:shadow-md transition-shadow"
              >
                <div className="aspect-ratio-4/3 relative h-32 overflow-hidden">
                  <img
                    src={goal.image}
                    alt={goal.title}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardContent className="p-3">
                  <h3 className="font-medium text-sm mb-1">{goal.title}</h3>
                  <div className="text-xs text-muted-foreground mb-1">
                    Progress: {goal.progress}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {goal.categories.map((cat, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground">
                        {cat}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Vision Board section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Vision Board</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {visionBoardImages.map((item) => (
              <div
                key={item.id}
                className="aspect-square overflow-hidden rounded-md border"
              >
                <img
                  src={item.image}
                  alt="Vision board image"
                  className="object-cover w-full h-full hover:scale-105 transition-transform cursor-pointer"
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
