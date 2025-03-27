import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { BellIcon, HeartIcon, SearchIcon } from "lucide-react";
import { Avatar } from "../../components/ui/avatar";
import { Badge } from "../../components/ui/badge";

import { useNavigate } from "react-router-dom";
import {
  PlusIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";
import { XIcon } from "lucide-react";
import { Checkbox } from "../../components/ui/checkbox.jsx";


export const GalileoDesign7 = () => {

    const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];

  // Activity data for the cards
  const activities = [
    {
      title: "Bake a cake",
      duration: "2 hours",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0.png",
    },
    {
      title: "Plant a garden",
      duration: "3 hours",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-1.png",
    },
    {
      title: "Write a letter",
      duration: "10 minutes",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-2.png",
    },
    {
      title: "Make a playlist",
      duration: "30 minutes",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-3.png",
    },
    {
      title: "Paint a picture",
      duration: "1 hour",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-4.png",
    },
    {
      title: "Read a book",
      duration: "2 hours",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-5.png",
    },
    {
      title: "Call a friend",
      duration: "15 minutes",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-6.png",
    },
    {
      title: "Take a walk",
      duration: "1 hour",
      image: "https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-7--frame-0-7.png",
    },
  ];

  // Navigation menu items
  const navItems = ["For You", "Explore", "Saved", "Trips"];

  // Filter categories
  const filterCategories = [
    "Easy",
    "Adventure",
    "In City",
    "Outdoors",
    "Foodie",
  ];

  // Activity cards data
  const activityCards = [
    {
      title: "Try the rooftop cafe",
      duration: "12 min",
      rating: "4.4★",
      image: "https://c.animaapp.com/m8q9q8baPNgOy6/img/depth-6--frame-1.png",
    },
    {
      title: "Discover the hidden waterfall",
      duration: "1 hour",
      rating: "4.8★",
      image: "https://c.animaapp.com/m8q9q8baPNgOy6/img/depth-6--frame-1-1.png",
    },
    {
      title: "Play games at the vintage arcade",
      duration: "20 min",
      rating: "4.2★",
      image: "https://c.animaapp.com/m8q9q8baPNgOy6/img/depth-6--frame-1-2.png",
    },
  ];
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start bg-white">
      <div className="flex flex-col min-h-[800px] w-full bg-white">
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

        {/* Main Content */}
        <main className="flex justify-center px-40 py-5 flex-1">
          <div className="flex flex-col max-w-[960px] w-full">
            {/* Hero Section */}
            <section className="flex items-start gap-8 px-4 py-10 w-full">
              <div
                className="flex-1 min-w-[400px] h-[279px] rounded-xl bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url(https://c.animaapp.com/m8q9rcyvHgDCfR/img/depth-6--frame-0.png)",
                }}
              ></div>

              <div className="flex flex-col min-w-[400px] h-[279px] gap-8 justify-center">
                <div className="flex flex-col gap-2">
                  <h2 className="h-[120px] w-[400px] [font-family:'Be_Vietnam_Pro',Helvetica] font-black text-[#161611] text-5xl tracking-[-2.00px] leading-[60px]">
                    Feeling adventurous?
                  </h2>
                  <p className="[font-family:'Be_Vietnam_Pro',Helvetica] font-normal text-[#161611] text-base leading-6">
                    Try something new today
                  </p>
                </div>

                <div className="flex min-w-40 max-w-[480px] h-16 w-full">
                  <div className="flex w-full rounded-xl bg-[#f4f4ef]">
                    <div className="flex items-center pl-4">
                      <SearchIcon className="h-5 w-5 text-[#898260]" />
                    </div>
                    <Input
                      className="flex-1 border-0 bg-[#f4f4ef] h-16 p-2 text-base [font-family:'Be_Vietnam_Pro',Helvetica] text-[#898260] focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="SearchIcon   for activities"
                    />
                    <div className="pr-2 flex items-center bg-[#f4f4ef] rounded-r-xl">
                      <Button className="min-w-[84px] h-12 px-5 bg-[#f2c40c] hover:bg-[#f2c40c]/90 text-[#161611] rounded-3xl [font-family:'Be_Vietnam_Pro',Helvetica] font-bold text-base">
                        Go
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Activities Section */}
            <section className="w-full">
             

              <div className="w-full">
                {/* First row of activities */}
                {/* Second row of activities */}

                <div className="flex flex-col items-start relative bg-white w-full">
      {/* THE SECOND DESIGN SHOULD BE HERE */}

            <main className="min-w-[800000px]">
        <div className="w-full max-w-[960px]">

                    <section className="w-full">
                    <div className="flex flex-wrap gap-3 px-4 py-3">
                        {filterCategories.map((category, index) => (
                        <Badge key={index} className="h-8 px-4 bg-[#f4efe5] rounded-2xl border-none text-sm text-[#1c160c]">
                            {category}
                        </Badge>
                        ))}
                    </div>

                    {activityCards.map((card, index) => (
                        <Card key={index} className="flex items-start justify-between p-4 bg-white rounded-xl shadow-md w-full">
                        <CardContent className="p-0 w-[400px] flex flex-col gap-4">
                            <h3 className="font-bold text-base text-[#1c160c]">{card.title}</h3>
                            <p className="text-sm text-[#a08249]">{card.duration} • {card.rating}</p>
                            <Button variant="outline" className="h-8 px-4 bg-[#f4efe5] rounded-2xl text-sm">
                            Do It Now
                            </Button>
                        </CardContent>
                        <div className="h-[165px] w-[200px] rounded-xl bg-cover" style={{ backgroundImage: `url(${card.image})` }} />
                        </Card>
                    ))}
                    </section>
                </div>
                </main>

      {/* END EHE */}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center w-full">
                <div className="flex flex-wrap justify-center gap-3 px-4 py-3 max-w-[480px]">
                  <Button
                    variant="outline"
                    className="w-[223px] h-10 bg-[#f4f4ef] border-0 rounded-[20px] [font-family:'Be_Vietnam_Pro',Helvetica] font-bold text-[#161611] text-sm"
                  >
                    Show more
                  </Button>
                  <Button className="w-[213px] h-10 bg-[#f2c40c] hover:bg-[#f2c40c]/90 text-[#161611] rounded-[20px] [font-family:'Be_Vietnam_Pro',Helvetica] font-bold text-sm">
                    Do It Now
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};





