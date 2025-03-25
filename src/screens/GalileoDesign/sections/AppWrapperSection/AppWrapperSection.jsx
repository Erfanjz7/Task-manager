import React from "react";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";

export const AppWrapperSection = () => {
  return (
    <section className="flex flex-col items-start w-full">
      <div className="p-4 flex-1 w-full flex flex-col items-start">
        <Card className="w-full overflow-hidden border-0 rounded-xl">
          <CardContent className="p-0 h-[480px] relative [background:linear-gradient(90deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0.4)_100%),url(https://c.animaapp.com/m8lqw056mMhA60/img/depth-6--frame-0.png)_50%_50%_/_cover]">
            <div className="absolute bottom-6 left-[216px] max-w-[848px] flex flex-col gap-2">
              <div className="flex flex-col">
                <h2 className="font-['Manrope',Helvetica] font-extrabold text-white text-5xl tracking-[-2.00px] leading-[60px]">
                  The way to get started is to quit talking and begin doing.
                </h2>
              </div>

              <div className="flex flex-col">
                <p className="font-['Manrope',Helvetica] font-normal text-white text-base leading-6">
                  Walt Disney
                </p>
              </div>

              <Button className="mt-6 h-12 px-5 py-0 bg-[#5ea5ed] text-[#0c141c] rounded-3xl font-['Manrope',Helvetica] font-bold text-base hover:bg-[#5ea5ed]/90">
                Write a journal
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
