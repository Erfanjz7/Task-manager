import { CheckIcon, SearchIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";
import { Checkbox } from "../../components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BellIcon,
  PlusIcon,
  MoreVerticalIcon,
} from "lucide-react";
import {
  AvatarFallback,
} from "../../components/ui/avatar.jsx";

export const GalileoDesign3 = () => {
  // Navigation items data
  const navItems = ["Home", "Explore", "Create"];
  const NAV_ITEMS = ["Home" , "Task Tracker", "Routine", "Qoutes", "Whish List", "Bad Habits" , "Good Habits" , "Things To Try" , "My Favourites"];


  // Quote items data
  const [quoteItems, setQuoteItems] = useState([]);
  
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [readQuotes, setReadQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState("");
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  const progress = (readQuotes.length / quoteItems.length) * 100;



  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-start relative bg-white">
      <div className="flex flex-col min-h-[800px] items-start relative self-stretch w-full flex-[0_0_auto] bg-white">
        <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
          {/* Header/Navigation Bar */}

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
          <main className="items-start justify-center px-40 py-5 flex-1 grow flex relative self-stretch w-full">
            <div className="flex flex-col max-w-[960px] h-[695px] items-start relative flex-1 grow">
              {/* Header Section */}
              <section className="flex flex-wrap items-start justify-around gap-[12px_12px] p-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="inline-flex flex-col min-w-72 items-start gap-3 relative flex-[0_0_auto]">
                  <div className="flex flex-col w-72 h-10 items-start relative">
                    <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Manrope',Helvetica] font-bold text-[#111416] text-[32px] tracking-[0] leading-10">
                      Daily Quotes
                    </h2>
                  </div>

                  <div className="flex w-72 items-start flex-col relative flex-[0_0_auto]">
                    <p className="relative self-stretch mt-[-1.00px] [font-family:'Manrope',Helvetica] font-normal text-[#637587] text-sm tracking-[0] leading-[21px]">
                      Life paths are not the same for everyone
                    </p>
                  </div>
                </div>
              </section>

              {/* Previous Button */}
              <div className="flex items-start justify-between px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
                    {/* Add Quote Button (Right) */}
                    <Button className="bg-blue-500 text-white px-6 py-2 rounded-lg ml-auto"
                        onClick={() => setIsAddingQuote(true)}>
                        Add Quote
                    </Button>
                    </div>


              {/* Quote Display */}
              <div className="flex flex-col h-[58px] items-center pt-5 pb-2 px-4 relative self-stretch w-full">
              <h3 className="relative self-stretch mt-[-1.00px] font-bold text-[#111416] text-2xl text-center">
                 {quoteItems.length > 0 ? quoteItems[currentQuoteIndex]?.title : "No Quotes Available"}
              </h3>

              </div>

              {/* Next Button */}
              <div className="flex items-center justify-between px-4 py-3 relative self-stretch w-full flex-[0_0_auto]">
  {/* Previous Button (Left) */}
                <Button
                    variant="secondary"
                    className="min-w-[84px] h-10 flex items-center justify-center px-4 bg-[#eff2f4] rounded-xl overflow-hidden"
                    onClick={() => setCurrentQuoteIndex(prev => prev > 0 ? prev - 1 : prev)}
                >
                    <span className="font-bold text-[#111416] text-sm text-center">Previous</span>
                </Button>

                {/* Next Button (Right) */}
                <Button
                    className="min-w-[84px] h-10 flex items-center justify-center px-4 bg-[#197fe5] text-white rounded-xl overflow-hidden"
                    onClick={() => setCurrentQuoteIndex(prev => prev < quoteItems.length - 1 ? prev + 1 : prev)}
                >
                    Next
                </Button>
              </div>


              {/* Quote List */}
              {quoteItems.map((quote, index) => (
  <Card
    key={quote.id}
    className="flex h-[72px] items-center gap-4 px-4 py-2 relative self-stretch w-full bg-white border-none shadow-none"
  >
    <CardContent className="flex items-center gap-4 p-0 w-full">
      <div className="flex w-12 h-12 items-center bg-[#eff2f4] rounded-lg justify-center relative">
        {/* Show checkmark only if the quote is marked as read */}
        {readQuotes.includes(index) && <CheckIcon className="w-6 h-6 text-green-600" />}
      </div>

      <div className="inline-flex flex-col items-start flex-[0_0_auto] justify-center relative">
        <h4 className="font-medium text-[#111416] text-base">
          {quote.title}
        </h4>

        <Button 
          variant="outline" 
          onClick={() => setReadQuotes(prev => prev.includes(index) ? prev : [...prev, index])} 
          disabled={readQuotes.includes(index)}
          className="mt-2 text-sm"
        >
          {readQuotes.includes(index) ? "Read" : "Mark as Read"}
        </Button>
      </div>
    </CardContent>
  </Card>
))}


              {/* Progress Section */}
              <div className="flex flex-col items-start gap-3 p-4 relative self-stretch w-full flex-[0_0_auto]">
                <div className="flex items-start justify-around gap-6 relative self-stretch w-full flex-[0_0_auto]">
                  <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <p className="relative self-stretch mt-[-1.00px] [font-family:'Manrope',Helvetica] font-medium text-[#111416] text-base tracking-[0] leading-6 whitespace-nowrap">
                      {`${readQuotes.length} / ${quoteItems.length} Qoutes read today`}
                    </p>
                  </div>
                </div>

                <p>{`${readQuotes.length}/${quoteItems.length} quotes read today`}</p>
                <Progress value={progress} />


                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.00px] font-normal text-[#637587] text-sm">
                    {Math.round(((quoteItems.length - readQuotes.length) / quoteItems.length) * 100)}% left
                </p>

                </div>
              </div>
              {isAddingQuote && (
                <div className="fixed right-0 top-0 h-full w-1/2 bg-gray-100 p-4 transition-all duration-300 shadow-lg">
                    <div className="flex justify-between p-4 border-b">
                    <h2 className="text-xl font-bold">New Quote</h2>
                    <Button variant="ghost" onClick={() => setIsAddingQuote(false)}>
                        <XIcon />
                    </Button>
                    </div>

                    <div className="p-4 flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Enter your quote..."
                        value={newQuote}
                        onChange={(e) => setNewQuote(e.target.value)}
                        className="border p-2 rounded"
                    />
                    <Button className="bg-green-500 text-white"
                        onClick={() => {
                        if (newQuote.trim() !== "") {
                            setQuoteItems([...quoteItems, { id: Date.now(), title: newQuote }]);
                            setNewQuote("");
                            setIsAddingQuote(false);
                        }
                        }}>
                        Save Quote
                    </Button>
                    </div>
                </div>
                )}

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};