import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { Progress } from "../../components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { XIcon } from "lucide-react";
import { BellIcon, PlusIcon, SearchIcon, MoreVerticalIcon } from "lucide-react";
import { AvatarFallback } from "../../components/ui/avatar.jsx";
import {
  db,
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
} from "../../firebase";

export const GalileoDesign2 = () => {
  // Navigation items
  const NAV_ITEMS = [
    "Home",
    "Task Tracker",
    "Routine",
    "Qoutes",
    "Whish List",
    "Bad Habits",
    "Good Habits",
    "Things To Try",
    "My Favourites",
  ];

  // Task data

  // Progress data
  const progressData = [
    { id: "daily", completed: 4, total: 5, label: "Today" },
    { id: "weekly", completed: 3, total: 5, label: "This week" },
    { id: "monthly", completed: 2, total: 5, label: "This month" },
  ];

  // const [dailyTasks, setDailyTasks] = React.useState([]);
  // const [weeklyTasksList, setWeeklyTasksList] = React.useState([]);
  // const [monthlyTasksList, setMonthlyTasksList] = React.useState([]);

  const [routines, setRoutines] = useState({
    daily: [],
    weekly: [],
    monthly: [],
  });

  const [isAddingRoutine, setIsAddingRoutine] = React.useState(false);
  const [newRoutineName, setNewRoutineName] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("daily");

  const [openMenuId, setOpenMenuId] = useState(null);

  // ✅ Now, we can safely use these states
  const filteredRoutines = routines[activeTab];

  const dailyProgress = routines.daily.length
    ? (routines.daily.filter((task) => task.completed).length /
        routines.daily.length) *
      100
    : 0;

  const weeklyProgress = routines.weekly.length
    ? (routines.weekly.filter((task) => task.completed).length /
        routines.weekly.length) *
      100
    : 0;

  const monthlyProgress = routines.monthly.length
    ? (routines.monthly.filter((task) => task.completed).length /
        routines.monthly.length) *
      100
    : 0;

  const [categories, setCategories] = useState([
    "Personal Hygiene",
    "University",
    "Work",
    "Exercise",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [newRoutineCategory, setNewRoutineCategory] = useState("");
  const [newRoutineCycle, setNewRoutineCycle] = useState("daily");

  useEffect(() => {
    setRoutines((prev) => ({
      ...prev,
      [activeTab]: prev[activeTab].map((task) => ({
        ...task,
        completed: false,
      })),
    }));
  }, [activeTab]);

  // const weeklyProgress = weeklyTasksList.length
  //   ? (weeklyTasksList.filter(task => task.completed).length / weeklyTasksList.length) * 100
  //   : 0;

  // const monthlyProgress = monthlyTasksList.length
  //   ? (monthlyTasksList.filter(task => task.completed).length / monthlyTasksList.length) * 100
  //   : 0;

  const handleAddRoutine = async () => {
    if (!newRoutineName.trim()) return;

    const newRoutine = {
      label: newRoutineName,
      category: newRoutineCategory,
      completed: false,
      description: "", // در صورت نیاز مقدار دیسکریپشن را تنظیم کن
      cycle: newRoutineCycle,
      createdAt: new Date(),
    };

    try {
      const docRef = await addDoc(collection(db, "routines"), newRoutine);
      setRoutines((prev) => ({
        ...prev,
        [newRoutineCategory]: [
          ...prev[newRoutineCategory],
          { id: docRef.id, ...newRoutine },
        ],
      }));
      setNewRoutineName("");
      setNewRoutineCategory("daily");
      setIsAddingRoutine(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "routines"), (snapshot) => {
      const routinesData = { daily: [], weekly: [], monthly: [] };

      snapshot.forEach((doc) => {
        const data = doc.data();
        const category = data.category;

        if (category && routinesData[category]) {
          routinesData[category].push({ id: doc.id, ...data });
        } else {
          console.warn(`⚠️ Skipping routine with invalid category:`, data);
        }
      });

      setRoutines(routinesData);
    });

    return () => unsubscribe(); // پاک کردن Listener وقتی کامپوننت آن‌ماونت شد
  }, []);

  const toggleTaskCompletion = async (taskId, category) => {
    try {
      const taskRef = doc(db, "routines", taskId);
      const updatedTasks = routines[category].map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      await updateDoc(taskRef, {
        completed: !routines[category].find((task) => task.id === taskId)
          .completed,
      });

      setRoutines((prev) => ({ ...prev, [category]: updatedTasks }));
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleDeleteRoutine = async (taskId, category) => {
    try {
      await deleteDoc(doc(db, "routines", taskId));
      setRoutines((prev) => ({
        ...prev,
        [category]: prev[category].filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  const resetRoutineStatuses = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "routines"));
      querySnapshot.forEach(async (routine) => {
        await updateDoc(doc(db, "routines", routine.id), { completed: false });
      });

      setRoutines((prev) => ({
        daily: prev.daily.map((task) => ({ ...task, completed: false })),
        weekly: prev.weekly.map((task) => ({ ...task, completed: false })),
        monthly: prev.monthly.map((task) => ({ ...task, completed: false })),
      }));
    } catch (error) {
      console.error("Error resetting routines: ", error);
    }
  };

  // این تابع را در جایی که نیاز است (مثلاً در یک دکمه یا در useEffect) فراخوانی کن.

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
                onClick={() => navigate(index === 0 ? "/" : `/page${index}`)} // Conditional URL
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
              <Button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                onClick={() => setIsAddingRoutine(true)}
              >
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
              <span className="font-medium text-base text-[#111416]">
                Completed
              </span>
              <span className="font-normal text-sm text-[#111416]">
                {`${
                  routines[activeTab].filter((task) => task.completed).length
                }/${routines[activeTab].length}`}
              </span>
            </div>

            <Progress
              value={
                activeTab === "daily"
                  ? dailyProgress
                  : activeTab === "weekly"
                  ? weeklyProgress
                  : monthlyProgress
              }
              className="h-2 bg-[#dbe0e5] rounded w-full"
              indicator={
                <div className="bg-[#111416] rounded w-full h-full"></div>
              }
            />

            <span className="font-normal text-sm text-[#637587]">
              {activeTab === "daily"
                ? "Today"
                : activeTab === "weekly"
                ? "This week"
                : "This month"}
            </span>
          </div>

          {/* Dynamic Routine List */}
          <section className="pt-5 pb-3 px-4 w-full">
            <h3 className="font-bold text-[22px] text-[#111416] leading-7">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h3>
          </section>

          {/* لیست روتین‌ها */}
          <div className="px-4 w-full">
            {filteredRoutines.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between gap-3 py-3 w-full"
              >
                {/* چک‌باکس و نام روتین */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={task.completed}
                    onCheckedChange={() =>
                      toggleTaskCompletion(task.id, activeTab)
                    }
                  />
                  <label className="font-normal text-base text-[#111416] leading-6">
                    {task.label}
                  </label>
                </div>

                {/* منوی سه‌نقطه‌ای */}
                <div className="relative">
                  <button
                    onClick={() =>
                      setOpenMenuId(openMenuId === task.id ? null : task.id)
                    }
                    className="p-2 rounded-full hover:bg-gray-200"
                  >
                    <MoreVerticalIcon />
                  </button>

                  {/* نمایش منو در صورت کلیک */}
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
                <Button
                  variant="ghost"
                  onClick={() => setIsAddingRoutine(false)}
                >
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
                <Button
                  className="bg-green-500 text-white"
                  onClick={handleAddRoutine}
                >
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
