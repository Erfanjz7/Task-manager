import { PlusCircleIcon } from "lucide-react";
import React from "react";
import { Avatar } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

export const GalileoDesign5 = () => {
  // Navigation items
  const navItems = ["Dashboard", "Good Habits", "Bad Habits", "Journal"];

  // Bad habits data
  const badHabits = [
    {
      id: 1,
      title: "Social Media Overuse",
      description: "Excessive daily use",
      streak: 7,
      progress: 278,
      daysSince: 16,
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1.png",
    },
    {
      id: 2,
      title: "Excessive Snacking",
      description: "Frequent snacking habits",
      streak: 2,
      progress: 186,
      daysSince: 6,
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-1.png",
    },
    {
      id: 3,
      title: "Procrastination",
      description: "Delaying important tasks",
      streak: 4,
      progress: 464,
      daysSince: 9,
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-2.png",
    },
    {
      id: 4,
      title: "Smoking",
      description: "Daily cigarette count",
      streak: 9,
      progress: 742,
      daysSince: 2,
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-3.png",
    },
  ];

  // Habit stacking alternatives
  const habitStacking = [
    {
      id: 1,
      title: "Instead of Reaching for Your Phone...",
      description:
        "Try meditation, a quick 5-minute walk, or deep breathing exercises.",
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-4.png",
    },
    {
      id: 2,
      title: "Instead of Snacking Mindlessly...",
      description:
        "Drink a glass of water, engage in a hobby, or have a piece of fruit.",
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-5.png",
    },
    {
      id: 3,
      title: "Instead of Delaying Tasks...",
      description:
        "Break tasks into smaller steps, start with a 5-minute task, or set reminders.",
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-6.png",
    },
    {
      id: 4,
      title: "Instead of Lighting a Cigarette...",
      description:
        "Use a nicotine patch, chew gum, or engage in a distracting activity.",
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-7.png",
    },
    {
      id: 5,
      title: "Identify and Avoid Triggers",
      description:
        "Pinpoint situations, emotions, or locations linked to bad habits. Adjust your routine and surroundings to minimize exposure.",
      image: "https://c.animaapp.com/m8qlxq92YExT1M/img/depth-6--frame-1-8.png",
    },
  ];

  return (
    <div className="flex flex-col items-start relative bg-white">
      <div className="flex flex-col min-h-[800px] items-start relative self-stretch w-full flex-[0_0_auto] bg-[#16161c]">
        <header className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          <nav className="items-center justify-between px-10 py-3 flex-[0_0_auto] border-b [border-bottom-style:solid] border-[#e5e8ea] flex relative self-stretch w-full">
            <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <div className="relative flex-1 w-4 grow bg-[url(https://c.animaapp.com/m8qlxq92YExT1M/img/vector---0.svg)] bg-[100%_100%]">
                  <img
                    className="absolute w-4 h-4 top-0 left-0"
                    alt="Vector"
                    src="https://c.animaapp.com/m8qlxq92YExT1M/img/vector---1.svg"
                  />
                </div>
              </div>

              <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                <h1 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[23px] whitespace-nowrap">
                  Habitual
                </h1>
              </div>
            </div>

            <div className="flex items-start justify-end gap-8 relative flex-1 grow">
              <div className="inline-flex h-10 items-center gap-9 relative flex-[0_0_auto]">
                {navItems.map((item, index) => (
                  <div
                    key={index}
                    className="inline-flex flex-col items-start relative flex-[0_0_auto]"
                  >
                    <div className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-sm tracking-[0] leading-[21px] whitespace-nowrap cursor-pointer hover:text-gray-300 transition-colors">
                      {item}
                    </div>
                  </div>
                ))}
              </div>

              <div className="inline-flex items-start gap-2 relative flex-[0_0_auto]">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-[#302d3d] rounded-xl"
                >
                  <div className="flex flex-col items-center relative flex-1 grow">
                    <div className="self-stretch w-full bg-[url(https://c.animaapp.com/m8qlxq92YExT1M/img/vector---0-10.svg)] bg-[100%_100%] relative flex-1 grow" />
                  </div>
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="w-10 h-10 bg-[#302d3d] rounded-xl"
                >
                  <div className="flex flex-col items-center relative flex-1 grow">
                    <div className="self-stretch w-full bg-[url(https://c.animaapp.com/m8qlxq92YExT1M/img/vector---0-11.svg)] bg-[100%_100%] relative flex-1 grow" />
                  </div>
                </Button>
              </div>

              <Avatar className="w-10 h-10 rounded-[20px]">
                <img
                  src="https://c.animaapp.com/m8qlxq92YExT1M/img/depth-4--frame-2.png"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </Avatar>
            </div>
          </nav>

          <main className="items-start justify-center px-4 md:px-10 lg:px-40 py-5 flex-1 grow flex relative self-stretch w-full">
            <div className="flex flex-col max-w-[960px] items-start relative flex-1 grow mb-[-1.00px]">
              <section className="flex flex-wrap items-start justify-around gap-[12px_12px] p-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex flex-col min-w-72 items-start gap-3 relative flex-[0_0_auto]">
                  <div className="flex flex-col w-full md:w-[616px] items-start relative flex-[0_0_auto]">
                    <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-[32px] tracking-[0] leading-10">
                      Bad Habits Tracker
                    </h2>
                  </div>

                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a5a3ba] text-sm tracking-[0] leading-[21px]">
                      Track your bad habits to gain insight into triggers and
                      patterns, fostering better management.
                    </p>
                  </div>
                </div>
              </section>

              <section className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                <Card className="relative self-stretch w-full h-[295px] rounded-xl overflow-hidden shadow-[0px_0px_4px_#0000001a] border-0 [background:linear-gradient(0deg,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_100%),url(https://c.animaapp.com/m8qlxq92YExT1M/img/depth-5--frame-0.png)_50%_50%_/_cover]">
                  <CardContent className="flex w-full items-end justify-around gap-4 p-4 absolute bottom-0">
                    <div className="flex flex-col max-w-[440px] items-start gap-1 relative flex-1 grow">
                      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                        <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-white text-sm tracking-[0] leading-[21px]">
                          Manage bad habits
                        </p>
                      </div>

                      <div className="flex flex-col max-w-[440px] items-start relative w-full flex-[0_0_auto]">
                        <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-2xl tracking-[0] leading-[30px]">
                          Bad Habit Analysis
                        </h3>
                      </div>

                      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                        <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-6">
                          Understand your triggers, the who, what, when, where,
                          and why. Recognize patterns, anticipate urges, and
                          develop a plan for breaking the cycle.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="flex flex-col items-start pt-4 pb-2 px-4 self-stretch w-full relative flex-[0_0_auto]">
                <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[23px]">
                  Current Bad Habits
                </h3>
              </section>

              {badHabits.map((habit) => (
                <React.Fragment key={habit.id}>
                  <section className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]">
                    <Card className="justify-between p-4 bg-[#23212b] rounded-xl overflow-hidden shadow-[0px_0px_4px_#0000001a] flex items-start relative self-stretch w-full flex-[0_0_auto] border-0">
                      <CardContent className="flex flex-col w-full md:w-[587px] h-[165px] items-start gap-4 relative p-0">
                        <div className="flex flex-col items-start self-stretch w-full flex-[0_0_auto] gap-1 relative">
                          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <h4 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-base tracking-[0] leading-5">
                              {habit.title}
                            </h4>
                          </div>

                          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                            <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a5a3ba] text-sm tracking-[0] leading-[21px]">
                              {habit.description}
                            </p>
                          </div>
                        </div>

                        <Button className="h-8 pl-4 pr-2 py-0 bg-[#302d3d] rounded-xl text-white hover:bg-[#3d3a4a] gap-1">
                          <span className="[font-family:'Inter',Helvetica] font-medium text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                            Log Incident
                          </span>
                          <PlusCircleIcon className="w-[18px] h-[18px]" />
                        </Button>
                      </CardContent>

                      <div
                        className="relative flex-1 grow h-[165px] rounded-xl"
                        style={{
                          backgroundImage: `url(${habit.image})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      />
                    </Card>
                  </section>

                  <section className="flex flex-col items-start gap-3 p-4 self-stretch w-full relative flex-[0_0_auto]">
                    <div className="flex items-start justify-around gap-6 relative self-stretch w-full flex-[0_0_auto]">
                      <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                        <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-medium text-white text-base tracking-[0] leading-6 whitespace-nowrap">
                          Streak of {habit.streak}
                        </p>
                      </div>
                    </div>

                    <div className="flex-col bg-[#444256] rounded flex items-start relative self-stretch w-full flex-[0_0_auto]">
                      <Progress
                        value={habit.progress / 9.28}
                        className="h-2 bg-[#19162d] rounded"
                      />
                    </div>

                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a5a3ba] text-sm tracking-[0] leading-[21px]">
                        {habit.daysSince} days since slip-up
                      </p>
                    </div>
                  </section>
                </React.Fragment>
              ))}

              <section className="flex flex-col items-start pt-4 pb-2 px-4 self-stretch w-full relative flex-[0_0_auto]">
                <h3 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-lg tracking-[0] leading-[23px]">
                  Habit Stacking
                </h3>
              </section>

              {habitStacking.map((alternative) => (
                <section
                  key={alternative.id}
                  className="flex flex-col items-start p-4 relative self-stretch w-full flex-[0_0_auto]"
                >
                  <Card className="justify-between p-4 bg-[#23212b] rounded-xl overflow-hidden shadow-[0px_0px_4px_#0000001a] flex items-start relative self-stretch w-full flex-[0_0_auto] border-0">
                    <CardContent className="flex flex-col w-full md:w-[587px] h-[165px] items-start gap-4 relative p-0">
                      <div className="flex flex-col items-start self-stretch w-full flex-[0_0_auto] gap-1 relative">
                        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                          <h4 className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-bold text-white text-base tracking-[0] leading-5">
                            {alternative.title}
                          </h4>
                        </div>

                        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                          <p className="relative self-stretch mt-[-1.00px] [font-family:'Inter',Helvetica] font-normal text-[#a5a3ba] text-sm tracking-[0] leading-[21px]">
                            {alternative.description}
                          </p>
                        </div>
                      </div>

                      <Button className="h-8 pl-4 pr-2 py-0 bg-[#302d3d] rounded-xl text-white hover:bg-[#3d3a4a] gap-1">
                        <span className="[font-family:'Inter',Helvetica] font-medium text-sm text-center tracking-[0] leading-[21px] whitespace-nowrap">
                          Reflect
                        </span>
                        <PlusCircleIcon className="w-[18px] h-[18px]" />
                      </Button>
                    </CardContent>

                    <div
                      className="relative flex-1 grow h-[165px] rounded-xl"
                      style={{
                        backgroundImage: `url(${alternative.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </Card>
                </section>
              ))}
            </div>
          </main>
        </header>
      </div>
    </div>
  );
};
