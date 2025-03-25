import { SearchIcon } from "lucide-react";
import React from "react";
import { useState } from "react";
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
import { Input } from "../../components/ui/input";


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

  const [favoriteActivities, setFavoriteActivities] = useState([
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
  ]);
  
  
  const [isAddingFavorite, setIsAddingFavorite] = useState(false);
  const [newFavoriteTitle, setNewFavoriteTitle] = useState("");
  const [newFavoriteMood, setNewFavoriteMood] = useState("");
  const [newFavoriteImage, setNewFavoriteImage] = useState("");
  const [showPredefined, setShowPredefined] = useState(false);

  const predefinedFavorites = [
    { title: "Watch Anime", mood: "Relaxing", image: "https://via.placeholder.com/150" },
    { title: "Read Manga", mood: "Calm", image: "https://via.placeholder.com/150" },
    { title: "Listen to Podcasts", mood: "Chill", image: "https://via.placeholder.com/150" },
    { title: "Outdoor Walks", mood: "Refreshing", image: "https://via.placeholder.com/150" },
    { title: "Baking", mood: "Creative", image: "https://via.placeholder.com/150" }
  ];

  const handleAddFavorite = () => {
    if (!newFavoriteTitle.trim()) return; // Prevent empty titles
  
    const newFavorite = {
      title: newFavoriteTitle,
      mood: newFavoriteMood || "Neutral",
      action: "Quick Log",
      image: newFavoriteImage || "https://via.placeholder.com/150", // Default image if none provided
    };
  
    setFavoriteActivities((prevFavorites) => [...prevFavorites, newFavorite]); 
    setIsAddingFavorite(false);
    setNewFavoriteTitle("");
    setNewFavoriteMood("");
    setNewFavoriteImage("");
  };

  const handleSelectPredefined = (activity) => {
    setFavoriteActivities((prev) => [...prev, activity]);
    setIsAddingFavorite(false);
  };
  



  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start bg-white">
      <div className="flex flex-col min-h-[800px] w-full bg-white">
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
                <h2 className="font-extrabold text-4xl text-[#0a141e] tracking-[-1.00px] leading-[45px] font-['Manrope',Helvetica]">
                  Favorites
                </h2>
                <p className="font-normal text-base text-[#3a70a5] leading-6 font-['Manrope',Helvetica]">
                  Discover and log activities based on your mood.
                </p>
              </div>
            </section>

            <section className="flex flex-col h-[60px] items-start pt-5 pb-3 px-4 w-full">
              <h3 className="font-bold text-[22px] text-[#0a141e] leading-7 font-['Manrope',Helvetica]">
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
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Manrope',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Manrope',Helvetica]">
                        {activity.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section className="flex flex-col h-[60px] items-start pt-5 pb-3 px-4 w-full">
              <h3 className="font-bold text-[22px] text-[#0a141e] leading-7 font-['Manrope',Helvetica]">
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
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Manrope',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Manrope',Helvetica]">
                        {activity.mood}
                      </p>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Manrope',Helvetica]">
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
                      <h4 className="font-medium text-base text-[#0a141e] leading-6 font-['Manrope',Helvetica]">
                        {activity.title}
                      </h4>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Manrope',Helvetica]">
                        {activity.mood}
                      </p>
                      <p className="font-normal text-sm text-[#3a70a5] leading-[21px] font-['Manrope',Helvetica]">
                        {activity.action}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="relative w-full">
  <Button 
    className="absolute bottom-6 right-6 bg-blue-500 text-white px-6 py-2 rounded-lg shadow-lg"
    onClick={() => setIsAddingFavorite(true)}
  >
    Add Favorite
  </Button>
</div>

            </section>

            {isAddingFavorite && (
  <div
    className={`w-1/2 bg-gray-100 p-4 transition-all duration-300 fixed right-0 top-0 h-full shadow-lg 
      ${isAddingFavorite ? "animate-slide-in" : "animate-slide-out"}`}
  >
    {/* Header */}
    <div className="flex justify-between p-4 border-b">
      <h2 className="text-xl font-bold">Add New Favorite</h2>
      <Button variant="ghost" onClick={() => setIsAddingFavorite(false)}>
        <XIcon />
      </Button>
    </div>

    {/* Toggle Between Manual Input & Predefined List */}
    <div className="flex justify-center gap-3 mt-4">
      <Button 
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${!showPredefined ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-700"}`} 
        onClick={() => setShowPredefined(false)}
      >
        Manual Input
      </Button>
      <Button 
        className={`px-4 py-2 rounded-lg transition-all duration-300 ${showPredefined ? "bg-blue-500 text-white shadow-md" : "bg-gray-200 text-gray-700"}`} 
        onClick={() => setShowPredefined(true)}
      >
        Choose from List
      </Button>
    </div>

    {/* Manual Input Form */}
    {!showPredefined ? (
      <div className="p-4 flex flex-col gap-4">
        {/* Title Input */}
        <Input
          placeholder="Title"
          value={newFavoriteTitle}
          onChange={(e) => setNewFavoriteTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Mood Input */}
        <Input
          placeholder="Mood (e.g., Relaxing, Energetic)"
          value={newFavoriteMood}
          onChange={(e) => setNewFavoriteMood(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Image URL Input */}
        <Input
          placeholder="Image URL (optional)"
          value={newFavoriteImage}
          onChange={(e) => setNewFavoriteImage(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />

        {/* Save Button */}
        <Button 
          className="w-full bg-green-500 text-white p-2 rounded-lg"
          onClick={handleAddFavorite}
        >
          Save Favorite
        </Button>
      </div>
    ) : (
      /* Predefined List */
      <div className="p-4 flex flex-col gap-3">
        {predefinedFavorites.map((activity, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between bg-gray-100 p-3 rounded-lg cursor-pointer hover:bg-gray-200 transition-all"
            onClick={() => handleSelectPredefined(activity)}
          >
            <span className="font-medium text-gray-900">{activity.title}</span>
            <span className="text-sm text-gray-500">{activity.mood}</span>
          </div>
        ))}
      </div>
    )}
  </div>
)}




          </div>
        </main>
      </div>
    </div>
  );
};





