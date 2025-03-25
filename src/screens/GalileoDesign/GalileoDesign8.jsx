import { SearchIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Card, CardContent } from "../../components/ui/card";
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
  BellIcon,
  PlusIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  AvatarFallback,
} from "../../components/ui/avatar.jsx";
import { useNavigate } from "react-router-dom";

export const GalileoDesign8 = () => {

  const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];

  // Data for energetic mood activities
  const energeticActivities = [
    {
      title: "Go for a Run",
      description: "Get your heart pumping!",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0.png",
    },
    {
      title: "Dance Cardio",
      description: "Burn calories and have fun!",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-1.png",
    },
    {
      title: "Start a New Project",
      description: "Channel your energy into something creative!",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-2.png",
    },
  ];

  // Data for favorite activities
  const favoriteActivities = [
    {
      title: "Watch Anime",
      mood: "Relaxing",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-3.png",
    },
    {
      title: "Read Manga",
      mood: "Relaxing",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-4.png",
    },
    {
      title: "Listen to Podcasts",
      mood: "Chill",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-5.png",
    },
    {
      title: "Play Mobile Games",
      mood: "Exciting",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-6.png",
    },
    {
      title: "Crafting",
      mood: "Creative",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-7.png",
    },
    {
      title: "Baking",
      mood: "Relaxing",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-8.png",
    },
    {
      title: "Outdoor Walks",
      mood: "Relaxing",
      action: "Quick Log",
      image: "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-9.png",
    },
    {
      title: "Meditation",
      mood: "Relaxing",
      action: "Quick Log",
      image:
        "https://c.animaapp.com/m8of4k6iEBBLqx/img/depth-7--frame-0-10.png",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start bg-white">
      <div className="flex flex-col min-h-[800px] w-full bg-[#eff4f9]">
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

        <main className="flex items-start justify-center px-40 py-5 flex-1">
          <div className="flex flex-col max-w-[960px] items-start flex-1">
            <section className="flex flex-wrap items-start justify-around gap-[12px] p-4 w-full">
              <div className="flex min-w-72 items-start gap-3 flex-col">
                <h2 className="font-extrabold text-4xl text-[#0a141e] tracking-[-1.00px] leading-[45px] font-['Plus_Jakarta_Sans',Helvetica]">
                  Favorites
                </h2>
                <p className="font-normal text-base text-[#3a70a5] leading-6 font-['Plus_Jakarta_Sans',Helvetica]">
                  Discover and log activities based on your mood.
                </p>
              </div>
            </section>

            <section className="flex flex-col h-[60px] items-start pt-5 pb-3 px-4 w-full">
              <h3 className="font-bold text-[22px] text-[#0a141e] leading-7 font-['Plus_Jakarta_Sans',Helvetica]">
                Mood Match: Feeling Energetic?
              </h3>
            </section>

            <section className="flex flex-col items-start gap-3 p-4 w-full">
              <div className="flex items-start gap-3 flex-1 w-full">
                {energeticActivities.map((activity, index) => (
                  <Card
                    key={index}
                    className="flex flex-col w-72 items-start gap-3 pb-3 border-none"
                  >
                    <div
                      className="h-[162px] w-full rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${activity.image})` }}
                    />
                    <CardContent className="p-0">
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="flex flex-col h-[60px] items-start pt-5 pb-3 px-4 w-full">
              <h3 className="font-bold text-[22px] text-[#0a141e] leading-7 font-['Plus_Jakarta_Sans',Helvetica]">
                Your Favorite Activities
              </h3>
            </section>

            <section className="flex flex-col items-start gap-3 p-4 w-full">
              <div className="flex flex-wrap items-start gap-3 w-full">
                {favoriteActivities.slice(0, 5).map((activity, index) => (
                  <Card
                    key={index}
                    className="flex flex-col w-[168px] items-start gap-3 pb-3 border-none"
                  >
                    <div
                      className="h-56 w-full rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${activity.image})` }}
                    />
                    <CardContent className="p-0">
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.mood}
                      </p>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.action}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="flex flex-wrap items-start gap-3 w-full">
                {favoriteActivities.slice(5).map((activity, index) => (
                  <Card
                    key={index}
                    className="flex flex-col w-[168px] items-start gap-3 pb-3 border-none"
                  >
                    <div
                      className="h-56 w-full rounded-xl bg-cover bg-center"
                      style={{ backgroundImage: `url(${activity.image})` }}
                    />
                    <CardContent className="p-0">
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.mood}
                      </p>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Plus_Jakarta_Sans',Helvetica]">
                        {activity.action}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};
