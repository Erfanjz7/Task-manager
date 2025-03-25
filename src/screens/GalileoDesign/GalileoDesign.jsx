import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  PlusIcon,
  SearchIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar.jsx";
import { XIcon } from "lucide-react";
import { Badge } from "../../components/ui/badge.jsx";
import { Button } from "../../components/ui/button.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";
import { Input } from "../../components/ui/input.jsx";

// Example nav items (header navigation).
const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];

// Filter dropdown options
const PRIORITY_OPTIONS = ["All", "Low", "Moderate", "High"];
const CATEGORY_OPTIONS = ["All", "Work", "Personal", "Errands"];
const ASSIGNED_OPTIONS = ["All", "Me", "John", "Jane"];


/**
 * Example tasks with priority, category, and assigned fields
 * for demonstration of the dropdown filters.
 */
export const GalileoDesign = () => {

  const [isAddingTask, setIsAddingTask] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const navigate = useNavigate();


  // -----------------------------
  // 1. State
  // -----------------------------
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Reply to Jane's email",
      completed: false,
      priority: "High",
      category: "Work",
      assigned: "Me",
    },
    {
      id: 2,
      title: "Submit expense report",
      completed: false,
      priority: "Moderate",
      category: "Work",
      assigned: "Me",
    },
    {
      id: 3,
      title: "Prepare for meeting",
      completed: true,
      priority: "High",
      category: "Work",
      assigned: "John",
    },
    {
      id: 4,
      title: "Buy groceries",
      completed: false,
      priority: "Low",
      category: "Errands",
      assigned: "Me",
    },
    {
      id: 5,
      title: "Clean living room",
      completed: true,
      priority: "Low",
      category: "Personal",
      assigned: "Jane",
    },
  ]);

  // For the search input
  const [searchTerm, setSearchTerm] = useState("");

  // For the “Add Task” input
  const [newTaskTitle, setNewTaskTitle] = useState("");

  // ** New: States for new task’s priority, category, assigned **
  // We exclude "All" since that's for filtering, not for actual data.
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [newTaskCategory, setNewTaskCategory] = useState("Work");
  const [newTaskAssigned, setNewTaskAssigned] = useState("Me");

  // Track which task’s 3-dot menu is open
  const [menuTaskId, setMenuTaskId] = useState(null);

  // Dropdown filter states
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAssigned, setSelectedAssigned] = useState("All");

  // -----------------------------
  // 2. Handlers
  // -----------------------------
  // Toggle a task’s completion
  const handleToggleComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add a new task
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: newId,
      title: newTaskTitle,
      completed: false,
      priority: newTaskPriority,
      category: newTaskCategory,
      assigned: newTaskAssigned,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    // Reset the input fields
    setNewTaskTitle("");
    setNewTaskPriority("Low");
    setNewTaskCategory("Work");
    setNewTaskAssigned("Me");

    // بستن پنجره ایجاد تسک بعد از اضافه شدن
    setIsAddingTask(false);
};


  // Delete a task
  const handleDeleteTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    // Close the menu if open
    if (menuTaskId === taskId) {
      setMenuTaskId(null);
    }
  };

  // Show/Hide the 3-dot menu for a given task
  const toggleMenu = (taskId) => {
    setMenuTaskId((prev) => (prev === taskId ? null : taskId));
  };

  // -----------------------------
  // 3. Filtering Logic
  // -----------------------------
  // 1) Filter by search term
  // 2) Filter by selectedPriority
  // 3) Filter by selectedCategory
  // 4) Filter by selectedAssigned
  const filteredTasks = tasks.filter((task) => {
    // Search filter
    if (!task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    // Priority filter
    if (selectedPriority !== "All" && task.priority !== selectedPriority) {
      return false;
    }
    // Category filter
    if (selectedCategory !== "All" && task.category !== selectedCategory) {
      return false;
    }
    // Assigned filter
    if (selectedAssigned !== "All" && task.assigned !== selectedAssigned) {
      return false;
    }

    return true;
  });

  // -----------------------------
  // 4. Render
  // -----------------------------
  return (
    <div className="flex flex-col h-screen items-start bg-white">
      {/* Wrapper for the entire page */}
      <div className="flex flex-col min-h-[800px] items-start w-full bg-white">
        {/* -----------------------------
            Header
        ----------------------------- */}
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

        {/* -----------------------------
            Main Content
        ----------------------------- */}
        <main className="flex px-40 py-5 flex-1 w-full">
        <div 
  className={`transition-all duration-300 flex flex-col h-[695px]`} 
  style={{ width: isAddingTask ? "calc(100% - 50%)" : "100%", maxWidth: "100%", marginLeft: 0 }}>

        {/* Section Title and Add Task */}
            <div className="flex flex-wrap items-start justify-between gap-[12px] p-4 w-full">
              <h2 className="font-bold text-[32px] text-[#111416] leading-10 font-['Manrope',Helvetica]">
                Today
              </h2>

              {/* -------------- New Task Form -------------- */}
               {/* Add Task Button (Moved Here) */}
                <div className="flex justify-end p-4">
                  <Button
                    variant="secondary"
                    className="h-10 px-6 bg-blue-500 text-white rounded-lg ml-[10px]"
                    onClick={() => setIsAddingTask(true)}
                  >
                    Add Task
                  </Button>
                  <Button
                      variant="secondary"
                      className="h-10 px-6 bg-blue-500 text-white rounded-lg ml-[10px]"
                      onClick={() => setIsAddingCategory(true)}
                    >
                      Add Category
                    </Button>
                </div>
                {/* Add Category Button (Same as Add Task) */}
                  {/* <div className="flex justify-end p-4">
                    <Button
                      variant="secondary"
                      className="h-10 px-6 bg-blue-500 text-white rounded-lg"
                      onClick={() => setIsAddingCategory(true)}
                    >
                      Add Category
                    </Button>
                  </div> */}

              {/* -------------- End of New Task Form -------------- */}
            </div>

            {/* Search */}
            <div className="px-4 py-3 w-full">
              <div className="w-full h-12">
                <div className="flex items-center w-full h-full rounded-xl bg-[#eff2f4]">
                  <div className="pl-4 h-full flex items-center">
                    <SearchIcon className="h-6 w-6 text-[#637587]" />
                  </div>
                  <Input
                    placeholder="Search tasks"
                    className="border-0 bg-transparent h-full pl-2 pr-4 py-2 text-base font-normal text-[#637587] font-['Manrope',Helvetica] focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* 
              Dropdown Filters (Priority, Category, Assigned) 
              Instead of using Badge, we'll replace them with <select> for demonstration.
            */}
            <div className="flex flex-wrap items-center gap-4 pl-3 pr-4 py-3 w-full">
              <div className="flex flex-col">
                <label
                  htmlFor="priority-filter"
                  className="text-sm font-medium mb-1"
                >
                  Priority
                </label>
                <select
                  id="priority-filter"
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  {PRIORITY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  id="category-filter"
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="assigned-filter"
                  className="text-sm font-medium mb-1"
                >
                  Assigned
                </label>
                <select
                  id="assigned-filter"
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedAssigned}
                  onChange={(e) => setSelectedAssigned(e.target.value)}
                >
                  {ASSIGNED_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Task List */}
            {/* Task List */}
<div className={`transition-all duration-300 flex flex-col h-screen bg-white p-4 ${isAddingTask ? "w-[80%]" : "w-full"}`}>

              {filteredTasks.length === 0 && (
                <p className="text-gray-500 text-sm">No tasks found.</p>
              )}
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="relative group flex items-center gap-3 py-3 w-full"
                >
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleToggleComplete(task.id)}
                    className={`w-5 h-5 rounded border-2 border-[#dbe0e5] ${
                      task.completed ? "bg-primary border-primary" : ""
                    }`}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`font-normal text-base text-[#111416] leading-6 font-['Manrope',Helvetica] ${
                      task.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {task.title}
                  </label>

                  {/* Show the priority/category/assigned for reference */}
                  <Badge variant="secondary" className="ml-auto mr-2">
                    {task.priority} / {task.category} / {task.assigned}
                  </Badge>

                  {/* Three-dot menu icon (hidden by default, appears on hover) */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="invisible group-hover:visible absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => toggleMenu(task.id)}
                  >
                    <MoreVerticalIcon className="h-5 w-5 text-gray-600" />
                  </Button>

                  {/* Dropdown menu for deleting the task */}
                  {menuTaskId === task.id && (
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 bg-white border rounded shadow p-2 z-10">
                      <Button
                        variant="ghost"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
{/* New Task Window (Updated) */}
{isAddingTask && (
  <div
    className={`w-1/2 bg-gray-100 p-4 transition-all duration-300 fixed right-0 top-0 h-full shadow-lg 
      ${isAddingTask ? "animate-slide-in" : "animate-slide-out"}`}
  >
    <div className="flex justify-between p-4 border-b">
      <h2 className="text-xl font-bold">New Task</h2>
      <Button variant="ghost" onClick={() => setIsAddingTask(false)}>
        <XIcon />
      </Button>
    </div>
    
    {/* Task Input Fields */}
    <div className="p-4 flex flex-col gap-4">
      {/* Title Input */}
      <Input
        placeholder="New task title..."
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      {/* Priority Selector */}
      <select
        className="border p-2 rounded"
        value={newTaskPriority}
        onChange={(e) => setNewTaskPriority(e.target.value)}
      >
        {["Low", "Moderate", "High"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Category Selector */}
      <select
        className="border p-2 rounded"
        value={newTaskCategory}
        onChange={(e) => setNewTaskCategory(e.target.value)}
      >
        {["Work", "Personal", "Errands"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Assigned Selector */}
      <select
        className="border p-2 rounded"
        value={newTaskAssigned}
        onChange={(e) => setNewTaskAssigned(e.target.value)}
      >
        {["Me", "John", "Jane"].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {/* Save Task Button */}
      <Button onClick={handleAddTask} className="w-full bg-blue-500 text-white p-2 rounded-lg">
        Save Task
      </Button>
    </div>
  </div>
)}

{/* New Category Window (Similar to Add Task) */}
{isAddingCategory && (
  <div
    className={`w-1/2 bg-gray-100 p-4 transition-all duration-300 fixed right-0 top-0 h-full shadow-lg 
      ${isAddingCategory ? "animate-slide-in" : "animate-slide-out"}`}
  >
    <div className="flex justify-between p-4 border-b">
      <h2 className="text-xl font-bold">New Category</h2>
      <Button variant="ghost" onClick={() => setIsAddingCategory(false)}>
        <XIcon />
      </Button>
    </div>

    {/* Category Input Fields */}
    <div className="p-4 flex flex-col gap-4">
      {/* Category Name Input */}
      <Input
        placeholder="New category name..."
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        className="w-full p-2 border rounded-lg"
      />

      {/* Save Category Button */}
      <Button
        onClick={() => {
          if (newCategoryName.trim()) {
            CATEGORY_OPTIONS.push(newCategoryName); // Add to category list
            setNewCategoryName(""); // Reset input
            setIsAddingCategory(false); // Close the modal
          }
        }}
        className="w-full bg-green-500 text-white p-2 rounded-lg"
      >
        Save Category
      </Button>
    </div>
  </div>
)}



          </div>
        </main>
      </div>
    </div>
  );
};
