import { BellIcon, MenuIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const GalileoDesign6 = () => {
  // Data for featured habits
  const featuredHabits = [
    {
      id: 1,
      type: "Morning Routine",
      title: "Drink Water",
      streak: "7-day streak",
      logAction: "Log 1 cup",
      image: "https://c.animaapp.com/m8q7uyuaEW2IR5/img/water-bottle.svg",
    },
    {
      id: 2,
      type: "Morning Routine",
      title: "Morning Walk",
      streak: "7-day streak",
      logAction: "Log 10 minutes",
      image: "https://c.animaapp.com/m8q7uyuaEW2IR5/img/morning-walk.svg",
    },
    {
      id: 3,
      type: "Afternoon Routine",
      title: "Eat Veggies",
      streak: "7-day streak",
      logAction: "Log 1 serving",
      image: "https://c.animaapp.com/m8q7uyuaEW2IR5/img/vegetables.svg",
    },
  ];

  // Data for habit stacking
  const habitStacking = [
    {
      id: 1,
      title: "Read 10 Pages",
      stars: "4.5 stars",
      icon: "https://c.animaapp.com/m8q7uyuaEW2IR5/img/book-icon.svg",
    },
    {
      id: 2,
      title: "Meditate for 5 Minutes",
      stars: "4.5 stars",
      icon: "https://c.animaapp.com/m8q7uyuaEW2IR5/img/meditation-icon.svg",
    },
  ];

  // Navigation items
  const navItems = ["Home", "Meditate", "Sleep", "Move", "Breathe"];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <div className="text-xl font-bold">Mindful</div>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="text-sm font-medium text-foreground hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <SearchIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <BellIcon className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MenuIcon className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img
              src="https://c.animaapp.com/m8q7uyuaEW2IR5/img/profile-pic.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <h1 className="text-3xl font-bold mb-8">Good Habits</h1>

        {/* Featured Habits Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold mb-6">Featured Habits</h2>

          <div className="space-y-6">
            {featuredHabits.map((habit) => (
              <Card key={habit.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex items-center">
                    <div className="flex-1 p-6">
                      <p className="text-sm text-green-600 mb-1">{habit.type}</p>
                      <h3 className="text-xl font-semibold mb-2">
                        {habit.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {habit.streak}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-secondary text-secondary-foreground"
                      >
                        {habit.logAction}
                      </Button>
                    </div>
                    <div className="w-40 h-40 bg-slate-200 flex items-center justify-center">
                      <img
                        src={habit.image}
                        alt={habit.title}
                        className="max-h-full object-contain"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Habit Stacking Section */}
        <section>
          <h2 className="text-lg font-semibold mb-6">Habit Stacking</h2>

          <div className="space-y-4">
            {habitStacking.map((habit) => (
              <div
                key={habit.id}
                className="flex items-center justify-between bg-background border rounded-lg p-4"
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-slate-200 rounded-md flex items-center justify-center mr-4">
                    <img src={habit.icon} alt="" className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-medium">{habit.title}</h3>
                    <p className="text-sm text-green-600">{habit.stars}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  Add
                </Button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};
