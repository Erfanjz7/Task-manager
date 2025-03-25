import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { XIcon } from "lucide-react";
import {
  BellIcon,
  PlusIcon,
  SearchIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  AvatarFallback,
} from "../../components/ui/avatar.jsx";


export const GalileoDesign2 = () => {

  // Navigation items
  const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];


  // Task data
  

  // Progress data
  const progressData = [
    { id: "daily", completed: 4, total: 5, label: "Today" },
    { id: "weekly", completed: 3, total: 5, label: "This week" },
    { id: "monthly", completed: 2, total: 5, label: "This month" },
  ];

  const [dailyTasks, setDailyTasks] = React.useState([]);
  const [weeklyTasksList, setWeeklyTasksList] = React.useState([]);
  const [monthlyTasksList, setMonthlyTasksList] = React.useState([]);

  const [isAddingRoutine, setIsAddingRoutine] = React.useState(false);
  const [newRoutineName, setNewRoutineName] = React.useState("");
  const [newRoutineCategory, setNewRoutineCategory] = React.useState("daily");
  const [activeTab, setActiveTab] = React.useState("daily");

  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Now, we can safely use these states
  const filteredRoutines = activeTab === "daily"
    ? dailyTasks
    : activeTab === "weekly"
    ? weeklyTasksList
    : monthlyTasksList;


    const dailyProgress = dailyTasks.length 
    ? (dailyTasks.filter(task => task.completed).length / dailyTasks.length) * 100 
    : 0;
  
  const weeklyProgress = weeklyTasksList.length 
    ? (weeklyTasksList.filter(task => task.completed).length / weeklyTasksList.length) * 100 
    : 0;
  
  const monthlyProgress = monthlyTasksList.length 
    ? (monthlyTasksList.filter(task => task.completed).length / monthlyTasksList.length) * 100 
    : 0;
  



  const handleAddRoutine = () => {
    if (!newRoutineName.trim()) return;
  
    const newRoutine = { id: Date.now(), label: newRoutineName, completed: false };
  
    if (newRoutineCategory === "daily") {
      setDailyTasks([...dailyTasks, newRoutine]);
    } else if (newRoutineCategory === "weekly") {
      setWeeklyTasksList([...weeklyTasksList, newRoutine]);
    } else if (newRoutineCategory === "monthly") {
      setMonthlyTasksList([...monthlyTasksList, newRoutine]);
    }
  
    // Reset the input fields and close modal
    setNewRoutineName("");
    setNewRoutineCategory("daily");
    setIsAddingRoutine(false);
  };

  const handleDeleteRoutine = (taskId, category) => {
    if (category === "daily") {
      setDailyTasks(dailyTasks.filter(task => task.id !== taskId));
    } else if (category === "weekly") {
      setWeeklyTasksList(weeklyTasksList.filter(task => task.id !== taskId));
    } else if (category === "monthly") {
      setMonthlyTasksList(monthlyTasksList.filter(task => task.id !== taskId));
    }
  };



  const toggleTaskCompletion = (taskId, category) => {
    if (category === "daily") {
      setDailyTasks(dailyTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } else if (category === "weekly") {
      setWeeklyTasksList(weeklyTasksList.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } else if (category === "monthly") {
      setMonthlyTasksList(monthlyTasksList.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    }
  };
  const navigate = useNavigate();
  

 



  return (
    <div className="flex flex-col items-start bg-white min-h-screen">
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

      {/* Main Content */}
      <main className="flex justify-center px-40 py-5 w-full">
        <div className="flex flex-col max-w-[960px] w-full">
          {/* Page Title */}
          <div className="flex flex-wrap items-start p-4 w-full">
            <h2 className="font-extrabold text-4xl text-[#111416] tracking-[-1px] leading-[45px] font-['Manrope',Helvetica]">
              Routines
            </h2>
            <div className="flex justify-end w-full px-4 py-2">
            <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                onClick={() => setIsAddingRoutine(true)}>
                Add Routine
              </Button>
            </div>

          </div>

          {/* Tabs */}
          <div className="w-full pb-3">
            <div className="flex items-start px-4 border-b border-[#dbe0e5]">
              <Tabs defaultValue="daily" className="w-full">
                <TabsList className="bg-transparent p-0 h-auto gap-8">
                <TabsTrigger
  value="daily"
  onClick={() => setActiveTab("daily")}
  className="pt-4 pb-[13px] px-0 border-b-[3px] rounded-none bg-transparent font-bold text-sm 
    border-[#e5e8ea] text-[#637587] data-[state=active]:border-[#111416] data-[state=active]:text-[#111416]"
>
  Daily
</TabsTrigger>

<TabsTrigger
  value="weekly"
  onClick={() => setActiveTab("weekly")}
  className="pt-4 pb-[13px] px-0 border-b-[3px] rounded-none bg-transparent font-bold text-sm 
    border-[#e5e8ea] text-[#637587] data-[state=active]:border-[#111416] data-[state=active]:text-[#111416]"
>
  Weekly
</TabsTrigger>

<TabsTrigger
  value="monthly"
  onClick={() => setActiveTab("monthly")}
  className="pt-4 pb-[13px] px-0 border-b-[3px] rounded-none bg-transparent font-bold text-sm 
    border-[#e5e8ea] text-[#637587] data-[state=active]:border-[#111416] data-[state=active]:text-[#111416]"
>
  Monthly
</TabsTrigger>

                </TabsList>
              </Tabs>
            </div>
          </div>
          {/* Progress Section - Dynamic Based on Active Tab */}
            <div className="flex flex-col gap-3 p-4 w-full">
              <div className="flex justify-between w-full">
                <span className="font-medium text-base text-[#111416]">Completed</span>
                <span className="font-normal text-sm text-[#111416]">
                  {activeTab === "daily"
                    ? `${dailyTasks.filter(task => task.completed).length}/${dailyTasks.length}`
                    : activeTab === "weekly"
                    ? `${weeklyTasksList.filter(task => task.completed).length}/${weeklyTasksList.length}`
                    : `${monthlyTasksList.filter(task => task.completed).length}/${monthlyTasksList.length}`}
                </span>
              </div>

              <Progress
                value={activeTab === "daily" 
                  ? dailyProgress 
                  : activeTab === "weekly" 
                  ? weeklyProgress 
                  : monthlyProgress}
                className="h-2 bg-[#dbe0e5] rounded w-full"
                indicator={<div className="bg-[#111416] rounded w-full h-full"></div>}
              />

              <span className="font-normal text-sm text-[#637587]">
                {activeTab === "daily" ? "Today" : activeTab === "weekly" ? "This week" : "This month"}
              </span>
            </div>
     
          {/* Dynamic Routine List */}
<section className="pt-5 pb-3 px-4 w-full">
  <h3 className="font-bold text-[22px] text-[#111416] leading-7">
    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
  </h3>
</section>

<div className="px-4 w-full">
  {filteredRoutines.map((task) => (
    <div key={task.id} className="flex items-center justify-between gap-3 py-3 w-full">
      {/* Task Checkbox and Label */}
      <div className="flex items-center gap-3">
        <Checkbox
          checked={task.completed}
          onCheckedChange={() => {
            if (activeTab === "daily") {
              setDailyTasks(dailyTasks.map(t => 
                t.id === task.id ? { ...t, completed: !t.completed } : t
              ));
            } else if (activeTab === "weekly") {
              setWeeklyTasksList(weeklyTasksList.map(t => 
                t.id === task.id ? { ...t, completed: !t.completed } : t
              ));
            } else if (activeTab === "monthly") {
              setMonthlyTasksList(monthlyTasksList.map(t => 
                t.id === task.id ? { ...t, completed: !t.completed } : t
              ));
            }
          }}
        />
        <label className="font-normal text-base text-[#111416] leading-6">
          {task.label}
        </label>
      </div>

      {/* 3-Dot Options Menu */}
      <div className="relative">
        <button
          onClick={() => setOpenMenuId(openMenuId === task.id ? null : task.id)}
          className="p-2 rounded-full hover:bg-gray-200"
        >
          ⋮
        </button>

        {/* Dropdown Menu */}
        {openMenuId === task.id && (
          <div className="absolute right-0 mt-2 bg-white border rounded shadow-md">
            <button
              onClick={() => handleDeleteRoutine(task.id, activeTab)}
              className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  ))}
</div>

      
          {isAddingRoutine && (
              <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-100 p-4 transition-all duration-300 shadow-lg">
                <div className="flex justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">New Routine</h2>
                  <Button variant="ghost" onClick={() => setIsAddingRoutine(false)}>
                    <XIcon />
                  </Button>
                </div>
                
                <div className="p-4 flex flex-col gap-4">
                  <input 
                    type="text"
                    placeholder="Routine name..." 
                    value={newRoutineName} 
                    onChange={(e) => setNewRoutineName(e.target.value)} 
                    className="border p-2 rounded"
                  />
                  <select 
                    value={newRoutineCategory} 
                    onChange={(e) => setNewRoutineCategory(e.target.value)} 
                    className="border p-2 rounded"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                  <Button className="bg-green-500 text-white" onClick={handleAddRoutine}>
                    Save Routine
                  </Button>
                </div>
              </div>
            )}

        </div>
      </main>
    </div>
  );
};
