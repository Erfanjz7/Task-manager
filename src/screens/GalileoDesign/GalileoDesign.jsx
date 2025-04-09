import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BellIcon, PlusIcon, SearchIcon, MoreVerticalIcon } from "lucide-react";
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

import { db } from "../../firebase.js";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { doc, deleteDoc, updateDoc, deleteField } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

// Example nav items (header navigation).
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
  const [tasks, setTasks] = useState([]);

  // For the search input
  const [searchTerm, setSearchTerm] = useState("");

  // For the “Add Task” input
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [categories, setCategories] = useState([]);

  // ** New: States for new task’s priority, category, assigned **
  // We exclude "All" since that's for filtering, not for actual data.
  const [newTaskPriority, setNewTaskPriority] = useState("Low");
  const [newTaskAssigned, setNewTaskAssigned] = useState("Me");
  const [newTaskCategory, setNewTaskCategory] = useState(
    categories.length > 0 ? categories[0].name : ""
  );

  const [newTaskDescription, setNewTaskDescription] = useState();

  // Track which task’s 3-dot menu is open
  const [menuTaskId, setMenuTaskId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuTaskId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Dropdown filter states
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedAssigned, setSelectedAssigned] = useState("All");

  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const [newTaskDeadline, setNewTaskDeadline] = useState("");

  const [newTaskDate, setNewTaskDate] = useState(""); // تاریخ ددلاین
  const [newTaskHour, setNewTaskHour] = useState("12"); // ساعت ددلاین
  const [newTaskMinute, setNewTaskMinute] = useState("00"); // دقیقه ددلاین
  const [newTaskPeriod, setNewTaskPeriod] = useState("AM");

  const [sortOrder, setSortOrder] = useState("asc");

  const [isEditingTask, setIsEditingTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskHasDeadline, setNewTaskHasDeadline] = useState(false);

  // -----------------------------
  // 2. Handlers
  // -----------------------------
  // Toggle a task’s completion

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditingTask(true);
  };

  const handleUpdateTask = async (updatedTask) => {
    console.log("📝 Updated Task:", updatedTask);

    try {
      const taskRef = doc(db, "tasks", updatedTask.id);

      // پردازش ددلاین
      let updatedDeadline = updatedTask.hasDeadline
        ? new Date(
            `${updatedTask.date} ${updatedTask.hour}:${updatedTask.minute} ${updatedTask.period}`
          )
        : null;

      const cleanedTask = Object.fromEntries(
        Object.entries(updatedTask).filter(
          ([key, value]) => value !== undefined
        )
      );

      // ددلاین رو به فرمت Firestore ذخیره کنیم یا حذف کنیم
      if (updatedTask.hasDeadline && updatedDeadline) {
        cleanedTask.deadline = Timestamp.fromDate(updatedDeadline);
      } else {
        cleanedTask.deadline = deleteField();
      }

      await updateDoc(taskRef, cleanedTask);

      console.log("✅ Task updated successfully in Firestore");

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? { ...task, ...cleanedTask } : task
        )
      );

      setIsEditingTask(false);
    } catch (error) {
      console.error("❌ Error updating task in Firestore:", error);
    }
  };

  // Add a new task
  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) {
      alert("Please enter a task title!");
      return;
    }

    let formattedDeadline = null;
    if (newTaskHasDeadline && newTaskDate && newTaskHour && newTaskMinute) {
      const hour = parseInt(newTaskHour, 10);
      const minute = parseInt(newTaskMinute, 10);
      const isPM = newTaskPeriod === "PM";
      const finalHour =
        isPM && hour !== 12 ? hour + 12 : !isPM && hour === 12 ? 0 : hour;

      const deadlineString = `${newTaskDate}T${finalHour
        .toString()
        .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:00`;
      formattedDeadline = Timestamp.fromDate(new Date(deadlineString));
    }

    try {
      await addDoc(collection(db, "tasks"), {
        title: newTaskTitle,
        priority: newTaskPriority,
        description: newTaskDescription || "",
        category: newTaskCategory || "Work",
        assignedTo: newTaskAssigned || "Me",
        completed: false,
        completedAt: null,
        deadline: formattedDeadline, // ✅ ذخیره فقط در صورت انتخاب
        createdAt: Timestamp.now(),
      });

      console.log("✅ Task successfully added!");

      // پاک کردن فیلدهای فرم
      setNewTaskTitle("");
      setNewTaskPriority("Low");
      setNewTaskCategory("Work");
      setNewTaskAssigned("Me");
      setNewTaskDate("");
      setNewTaskHour("12");
      setNewTaskMinute("00");
      setNewTaskPeriod("AM");
      setNewTaskHasDeadline(false); // بازنشانی تیک انتخاب ددلاین

      setIsAddingTask(false);
    } catch (error) {
      console.error("❌ Error adding task: ", error);
    }
  };

  const handleToggleComplete = async (taskId) => {
    const taskRef = doc(db, "tasks", taskId);
    const task = filteredTasks.find((t) => t.id === taskId);

    try {
      await updateDoc(taskRef, {
        completed: !task.completed,
        completedAt: task.completed ? null : new Date(), // ثبت زمان کامل شدن
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Delete a task

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId)); // حذف تسک از Firestore
      console.log("Task deleted:", taskId);
    } catch (error) {
      console.error("Error deleting task:", error);
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

  const addTask = async (task) => {
    try {
      await addDoc(collection(db, "tasks"), {
        title: task.title,
        priority: task.priority, // low, moderate, high
        category: task.category,
        completed: task.completed, // true/false
        createdAt: new Date(),
      });
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Error adding task: ", error);
    }
  };

  const getTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      let tasks = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() });
      });
      console.log(tasks);
      return tasks;
    } catch (error) {
      console.error("Error fetching tasks: ", error);
      return [];
    }
  };

  const [filteredTasks, setFilteredTasks] = useState([]); // برای فیلتر کردن لیست

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
      setFilteredTasks(tasksData); // مقدار اولیه، قبل از اعمال فیلتر
    });

    return () => unsubscribe(); // برای پاک کردن لیسنر هنگام خروج
  }, []);
  const [selectedDeadline, setSelectedDeadline] = useState("");

  const [sortDeadline, setSortDeadline] = useState(""); // مقدار اولیه: بدون مرتب‌سازی

  // ✅ فیلتر کردن تسک‌ها
  useEffect(() => {
    let filtered = tasks.filter((task) => {
      if (!task.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (selectedPriority !== "All" && task.priority !== selectedPriority) {
        return false;
      }
      if (selectedCategory !== "All" && task.category !== selectedCategory) {
        return false;
      }
      if (selectedAssigned !== "All" && task.assignedTo !== selectedAssigned) {
        return false;
      }

      // ✅ فیلتر بر اساس ددلاین
      if (selectedDeadline) {
        const taskDeadline = task.deadline?.seconds
          ? new Date(task.deadline.seconds * 1000)
          : null;
        const selectedDate = new Date(selectedDeadline);

        if (!taskDeadline || taskDeadline > selectedDate) {
          return false;
        }
      }
      return true;
    });

    // ✅ مرتب‌سازی بر اساس ددلاین
    filtered.sort((a, b) => {
      filtered.forEach((task) => {});

      const deadlineA = a.deadline?.seconds
        ? new Date(a.deadline.seconds * 1000)
        : null;
      const deadlineB = b.deadline?.seconds
        ? new Date(b.deadline.seconds * 1000)
        : null;

      // اگر هر دو مقدار `null` بودند، تغییری نده
      if (!deadlineA && !deadlineB) return 0;

      // اگر `deadlineA` خالی بود، همیشه بعد از `deadlineB` بیاد
      if (!deadlineA) return 1;
      if (!deadlineB) return -1;

      return sortDeadline === "asc"
        ? deadlineA - deadlineB
        : deadlineB - deadlineA;
    });

    // ✅ انتقال تسک‌های انجام‌شده یا منقضی‌شده به انتها
    const expiredAndCompleted = filtered.filter((task) => {
      const deadline = task.deadline?.seconds
        ? new Date(task.deadline.seconds * 1000)
        : null;
      return task.completed || (deadline && deadline < new Date());
    });

    const activeTasks = filtered.filter(
      (task) => !expiredAndCompleted.includes(task)
    );

    setFilteredTasks([...activeTasks, ...expiredAndCompleted]); // ✅ ابتدا تسک‌های فعال، سپس تسک‌های منقضی‌شده
  }, [
    tasks,
    searchTerm,
    selectedPriority,
    selectedCategory,
    selectedAssigned,
    selectedDeadline,
    sortDeadline,
  ]); // وابستگی‌ها
  // ✅ مطمئن شو که selectedDeadline اینجاست
  // هر بار که مقدارهای فیلتر تغییر کنن، لیست آپدیت می‌شه

  const handleAddCategory = async (categoryName) => {
    if (!categoryName.trim()) return; // جلوگیری از ذخیره دسته‌بندی خالی

    try {
      await addDoc(collection(db, "categories"), { name: categoryName });
      console.log("Category added:", categoryName);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      const categoriesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name, // مقدار نام
      }));
      console.log("Fetched categories:", categoriesData); // 🛠 چک کردن مقدار
      setCategories(categoriesData);
    });

    return () => unsubscribe();
  }, []);

  const handleSaveCategory = async () => {
    if (!newCategoryName.trim()) return; // جلوگیری از ذخیره نام خالی

    try {
      await addDoc(collection(db, "categories"), { name: newCategoryName });
      setNewCategoryName(""); // پاک کردن فیلد ورودی
      setIsAddingCategory(false); // بستن پاپ‌آپ
    } catch (error) {
      console.error("Error adding category: ", error);
    }
  };

  const toggleDescription = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const getFormattedDeadline = (deadline) => {
    if (!deadline) return ""; // اگر مقدار `null` یا `undefined` بود، رشته خالی برگردان
    if (typeof deadline === "string") return deadline; // اگر مقدار از قبل رشته بود، همان مقدار را برگردان

    try {
      return new Date(deadline.seconds * 1000).toISOString().slice(0, 16);
    } catch (error) {
      console.error("❌ Error parsing deadline:", error);
      return ""; // در صورت بروز خطا مقدار خالی برگردان
    }
  };
  const [taskToEdit, setTaskToEdit] = useState(null);
  const handleEditClick = (task) => {
    setTaskToEdit(task);
    setIsEditingTask(true);
  };

  useEffect(() => {
    if (taskToEdit) {
      setNewTaskHasDeadline(!!taskToEdit.deadline);
      if (taskToEdit.deadline) {
        const deadlineDate = new Date(taskToEdit.deadline.seconds * 1000);
        setNewTaskDate(deadlineDate.toISOString().split("T")[0]);
        let hours = deadlineDate.getHours();
        const minutes = deadlineDate.getMinutes().toString().padStart(2, "0");
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        setNewTaskHour(hours.toString().padStart(2, "0"));
        setNewTaskMinute(minutes);
        setNewTaskPeriod(period);
      } else {
        setNewTaskDate("");
        setNewTaskHour("12");
        setNewTaskMinute("00");
        setNewTaskPeriod("AM");
      }
    }
  }, [taskToEdit]);

  useEffect(() => {
    if (
      categories.length > 0 &&
      !categories.some((cat) => cat.name === newTaskCategory)
    ) {
      setNewTaskCategory(categories[0].name);
    }
  }, [categories, newTaskCategory]); // حالا 'newTaskCategory' هم اضافه شد

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

        {/* -----------------------------
            Main Content
        ----------------------------- */}
        <main className="flex px-40 py-5 flex-1 w-full">
          <div
            className={`transition-all duration-300 flex flex-col h-[695px]`}
            style={{
              width: isAddingTask ? "calc(100% - 50%)" : "100%",
              maxWidth: "100%",
              marginLeft: 0,
            }}
          >
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
              {/* فیلتر بر اساس اولویت */}
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

              {/* فیلتر بر اساس دسته‌بندی */}
              <div className="flex flex-col">
                <label
                  htmlFor="category-filter"
                  className="text-sm font-medium mb-1"
                >
                  Category
                </label>
                <select
                  className="border p-2 rounded"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All</option>{" "}
                  {/* گزینه‌ی همه‌ی دسته‌بندی‌ها */}
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* فیلتر بر اساس مسئول تسک */}
              <div className="flex flex-col">
                <label
                  htmlFor="assigned-filter"
                  className="text-sm font-medium mb-1"
                >
                  Assigned To
                </label>
                <select
                  className="border p-2 rounded"
                  value={selectedAssigned}
                  onChange={(e) => setSelectedAssigned(e.target.value)}
                >
                  <option value="All">All</option> {/* نمایش همه‌ی تسک‌ها */}
                  {["Me", "John", "Jane"].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="sort-deadline"
                  className="text-sm font-medium mb-1"
                >
                  Sort by Deadline
                </label>
                <select
                  id="sort-deadline"
                  className="border rounded px-2 py-1 text-sm"
                  value={sortDeadline}
                  onChange={(e) => {
                    console.log("Selected Sort Order:", e.target.value);
                    setSortDeadline(e.target.value);
                  }}
                >
                  <option value="">None</option>
                  <option value="asc">Ascending (Soonest First)</option>
                  <option value="desc">Descending (Latest First)</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="deadline-filter"
                  className="text-sm font-medium mb-1"
                >
                  Deadline Before
                </label>
                <input
                  type="datetime-local"
                  id="deadline-filter"
                  className="border rounded px-2 py-1 text-sm"
                  value={selectedDeadline}
                  onChange={(e) => setSelectedDeadline(e.target.value)}
                />
              </div>
            </div>

            {/* Task List */}
            {/* Task List */}
            {(() => {
              const now = new Date();
              const sortedTasks = [...filteredTasks].sort((a, b) => {
                const timeA = a.deadline
                  ? new Date(a.deadline.seconds * 1000)
                  : null;
                const timeB = b.deadline
                  ? new Date(b.deadline.seconds * 1000)
                  : null;

                if (!timeA && !timeB) return 0; // اگر هیچ‌کدام ددلاین نداشته باشند، جایگاه‌شان تغییر نمی‌کند
                if (!timeA) return 1; // تسک بدون ددلاین به انتها برود
                if (!timeB) return -1;

                return sortOrder === "asc" ? timeA - timeB : timeB - timeA;
              });

              // جدا کردن تسک‌های منقضی‌شده یا انجام‌شده
              const activeTasks = sortedTasks.filter(
                (task) =>
                  !(
                    task.completed ||
                    (task.deadline &&
                      new Date(task.deadline.seconds * 1000) < now)
                  )
              );
              const expiredOrCompletedTasks = sortedTasks.filter(
                (task) =>
                  task.completed ||
                  (task.deadline &&
                    new Date(task.deadline.seconds * 1000) < now)
              );

              return (
                <>
                  {/* ✅ نمایش تسک‌های فعال */}
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className="relative group flex flex-col py-3 w-full border-b pb-2"
                    >
                      <div className="flex items-center gap-3">
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
                          className={`font-medium text-base text-[#111416] ${
                            task.completed ? "line-through text-gray-400" : ""
                          }`}
                        >
                          {task.title}
                        </label>

                        {/* نمایش اطلاعات تسک */}
                        <Badge variant="secondary" className="ml-auto mr-2">
                          {task.priority} / {task.category} / {task.assignedTo}
                        </Badge>

                        {/* نمایش ددلاین */}
                        {task.deadline && (
                          <span className="text-xs text-gray-500 ml-2">
                            Deadline:{" "}
                            {new Date(
                              task.deadline.seconds * 1000
                            ).toLocaleString()}
                          </span>
                        )}

                        {/* دکمه‌ی سه نقطه */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="invisible group-hover:visible absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => toggleMenu(task.id)}
                        >
                          <MoreVerticalIcon className="h-5 w-5 text-gray-600" />
                        </Button>

                        {/* منوی دراپ‌داون */}
                        {menuTaskId === task.id && (
                          <div
                            ref={menuRef} // اضافه کردن ref به منو
                            className="absolute right-10 top-1/2 -translate-y-1/2 bg-white border rounded shadow p-2 z-10 flex flex-col"
                          >
                            <Button
                              variant="ghost"
                              className={`text-blue-600 hover:bg-blue-50 ${
                                !task.description
                                  ? "opacity-50 cursor-not-allowed"
                                  : ""
                              }`}
                              onClick={() => {
                                if (task.description)
                                  toggleDescription(task.id);
                                setMenuTaskId(null);
                              }}
                              disabled={!task.description}
                            >
                              {expandedTaskId === task.id
                                ? "Hide Description"
                                : "View Description"}
                            </Button>

                            <Button
                              variant="ghost"
                              className="text-yellow-600 hover:bg-yellow-50"
                              onClick={() => {
                                handleEditTask(task);
                                setMenuTaskId(null);
                              }}
                            >
                              Edit
                            </Button>

                            <Button
                              variant="ghost"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => {
                                handleDeleteTask(task.id);
                                setMenuTaskId(null);
                              }}
                            >
                              Delete
                            </Button>
                          </div>
                        )}
                      </div>

                      {/* نمایش توضیحات */}
                      {expandedTaskId === task.id && task.description && (
                        <div className="bg-gray-100 p-3 mt-2 rounded text-sm text-gray-700">
                          {task.description}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* ✅ نمایش عنوان "Expired or Completed Tasks" قبل از تسک‌های منقضی‌شده */}
                  {expiredOrCompletedTasks.length > 0 && (
                    <div className="text-red-600 font-bold text-sm mt-4 mb-2">
                      Expired or Completed Tasks
                    </div>
                  )}

                  {/* ✅ نمایش تسک‌های منقضی‌شده یا انجام‌شده */}
                  {expiredOrCompletedTasks.map((task) => (
                    <div
                      key={task.id}
                      className="relative group flex flex-col py-3 w-full border-b pb-2 opacity-50"
                    >
                      <div className="flex items-center gap-3">
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
                          className="font-medium text-base text-gray-400 line-through"
                        >
                          {task.title}
                        </label>

                        <Badge variant="secondary" className="ml-auto mr-2">
                          {task.priority} / {task.category} / {task.assignedTo}
                        </Badge>

                        {task.deadline && (
                          <span className="text-xs text-gray-500 ml-2">
                            Deadline:{" "}
                            {new Date(
                              task.deadline.seconds * 1000
                            ).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              );
            })()}

            {/* New Task Window (Updated) */}
            {isAddingTask && (
              <div
                className={`w-1/2 bg-gray-100 p-4 transition-all duration-300 fixed right-0 top-0 h-full shadow-lg 
      ${isAddingTask ? "animate-slide-in" : "animate-slide-out"}`}
              >
                <div className="flex justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">New Task</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddingTask(false)}
                  >
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

                  {/* ✅ Description Input */}
                  <textarea
                    placeholder="Enter task description..."
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                    className="w-full p-2 border rounded-lg h-24 resize-none"
                  ></textarea>

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
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
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

                  {/* انتخاب ددلاین (اختیاری) */}
                  <label className="text-sm text-gray-700 flex items-center">
                    <input
                      type="checkbox"
                      checked={newTaskHasDeadline}
                      onChange={(e) => setNewTaskHasDeadline(e.target.checked)}
                      className="mr-2"
                    />
                    Set a Deadline
                  </label>

                  {/* فقط نمایش اینپوت‌ها اگر کاربر بخواهد */}
                  {newTaskHasDeadline && (
                    <>
                      <input
                        type="date"
                        value={newTaskDate || ""}
                        onChange={(e) => {
                          console.log("📅 Selected Date:", e.target.value);
                          setNewTaskDate(e.target.value);
                        }}
                        className="border p-2 rounded w-full"
                      />

                      {/* انتخاب ساعت، دقیقه و AM/PM */}
                      <div className="flex gap-4 mt-2">
                        {/* انتخاب ساعت */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Hour
                          </label>
                          <select
                            value={newTaskHour}
                            onChange={(e) => setNewTaskHour(e.target.value)}
                            className="border p-2 rounded"
                          >
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {(i + 1).toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* انتخاب دقیقه */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Min
                          </label>
                          <select
                            value={newTaskMinute || "00"}
                            onChange={(e) => setNewTaskMinute(e.target.value)}
                            className="border p-2 rounded"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option key={i} value={i}>
                                {i.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* انتخاب AM/PM */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Period
                          </label>
                          <select
                            value={newTaskPeriod || "AM"}
                            onChange={(e) => setNewTaskPeriod(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Save Task Button */}
                  <Button
                    onClick={handleAddTask}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                  >
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
                  <Button
                    variant="ghost"
                    onClick={() => setIsAddingCategory(false)}
                  >
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
                    onClick={handleSaveCategory}
                    className="w-full bg-green-500 text-white p-2 rounded-lg"
                  >
                    Save Category
                  </Button>
                </div>
              </div>
            )}

            {/*  editting window */}
            {isEditingTask && editingTask && (
              <div className="w-1/2 bg-gray-100 p-4 transition-all duration-300 fixed right-0 top-0 h-full shadow-lg">
                <div className="flex justify-between p-4 border-b">
                  <h2 className="text-xl font-bold">Edit Task</h2>
                  <Button
                    variant="ghost"
                    onClick={() => setIsEditingTask(false)}
                  >
                    <XIcon />
                  </Button>
                </div>

                <div className="p-4 flex flex-col gap-4">
                  {/* Title Input */}
                  <Input
                    value={editingTask.title}
                    onChange={(e) =>
                      setEditingTask({ ...editingTask, title: e.target.value })
                    }
                    className="w-full p-2 border rounded-lg"
                  />

                  {/* Description Input */}
                  <textarea
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border rounded-lg h-24 resize-none"
                  ></textarea>

                  {/* Priority Selector */}
                  <select
                    value={editingTask.priority}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        priority: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  >
                    {["Low", "Moderate", "High"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  {/* Category Selector */}
                  <select
                    value={editingTask.category}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        category: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  >
                    {categories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>

                  {/* Assigned Selector */}
                  <select
                    value={editingTask.assignedTo}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        assignedTo: e.target.value,
                      })
                    }
                    className="border p-2 rounded"
                  >
                    {["Me", "John", "Jane"].map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label className="text-sm text-gray-700 flex items-center">
                    <input
                      type="checkbox"
                      checked={newTaskHasDeadline}
                      onChange={(e) => setNewTaskHasDeadline(e.target.checked)}
                      className="mr-2"
                    />
                    Set a Deadline
                  </label>
                  {/* فقط نمایش اینپوت‌ها اگر کاربر بخواهد */}
                  {newTaskHasDeadline && (
                    <>
                      <input
                        type="date"
                        value={newTaskDate || ""}
                        onChange={(e) => {
                          console.log("📅 Selected Date:", e.target.value);
                          setNewTaskDate(e.target.value);
                        }}
                        className="border p-2 rounded w-full"
                      />

                      {/* انتخاب ساعت، دقیقه و AM/PM */}
                      <div className="flex gap-4 mt-2">
                        {/* انتخاب ساعت */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Hour
                          </label>
                          <select
                            value={newTaskHour}
                            onChange={(e) => setNewTaskHour(e.target.value)}
                            className="border p-2 rounded"
                          >
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {(i + 1).toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* انتخاب دقیقه */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Min
                          </label>
                          <select
                            value={newTaskMinute || "00"}
                            onChange={(e) => setNewTaskMinute(e.target.value)}
                            className="border p-2 rounded"
                          >
                            {Array.from({ length: 60 }, (_, i) => (
                              <option key={i} value={i}>
                                {i.toString().padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* انتخاب AM/PM */}
                        <div className="flex flex-col">
                          <label className="text-xs text-gray-500 mb-1">
                            Period
                          </label>
                          <select
                            value={newTaskPeriod || "AM"}
                            onChange={(e) => setNewTaskPeriod(e.target.value)}
                            className="border p-2 rounded"
                          >
                            <option value="AM">AM</option>
                            <option value="PM">PM</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Save Button */}
                  <Button
                    onClick={() => handleUpdateTask(editingTask)}
                    className="w-full bg-blue-500 text-white p-2 rounded-lg"
                  >
                    Save Changes
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
