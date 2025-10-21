import React from "react";
import IdLogo from "../assets/IdLogo.png";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const ResHomePage = () => {
  const events = [
    {
      what: "Tech Startup Pitch Night",
      when: "November 5, 2025 at 6:00 PM",
      where: "Launchpad Manila, Makati City",
    },
    {
      what: "Barangay Blood Donation Drive",
      when: "October 28, 2025 from 9:00 AM to 3:00 PM",
      where: "Barangay Hall, Quezon City",
    },
    {
      what: "React Router v7 Workshop",
      when: "July 12, 2025 at 2:00 PM",
      where: "Online via Zoom",
    },
    {
      what: "Akap",
      when: "September 12, 2025 at 2:00 PM",
      where: "Barangay hall of lidong",
    },
    {
      what: "Libre Tuli",
      when: "May 12, 2025 at 2:00 PM",
      where: "Barangay hall of lidong",
    },
  ];
  const names = ["Alice", "Bob", "Charlie", "Diana", "Ethan"];

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen bg-amber-100 ">
        <div className="flex flex-row items-center justify-center mt-10 ">
          <div className="ml-5">
            <img className="h-150 w-150 " src={IdLogo} alt="I.D Logo" />
          </div>

          <div className="flex  items-center justify-center ">
            <div className="ml-2 mr-5  text-center text-4xl ">
              <p className=" w-2xl text-center">
                Your trusted source for accurate and verified public updates.
                Stay informed, Stay safe, Stay connected.
              </p>
            </div>
          </div>



          
        </div>
      </div>

      <div className="border-3 flex items-center justify-center min-h-screen   bg-amber-200">
        
          <Carousel
            opts={{ align: "start" }}
            orientation="horizontal"
            className="w-full max-w-5xl"
          >
            <CarouselContent className="-ml-1 h-[350px]">
              {events.map((event, index) => (
                <CarouselItem
                  key={index}
                  className="pl-1 basis-full md:basis-1/2 lg:basis-1/1"
                >
                  <div className="p-4">
                    <Card className="h-[300px] w-full shadow-lg">
                      <CardContent className="flex flex-col justify-center items-center h-full p-10 space-y-6">
                        <span className="text-3xl font-bold">{event.what}</span>
                        <span className="text-lg text-muted-foreground">
                          {event.when}
                        </span>
                        <span className="text-lg text-muted-foreground">
                          {event.where}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
       
      </div>
    
      <div className="border-2 h-screen">weather app</div>
    </>
    //makasta kang weather app tas registration pag mata
    
  );
};

export default ResHomePage;
