import React from "react";
import IdLogo from "../assets/IdLogo.png";
import { Card, CardContent } from "@/components/ui/card";
import { events } from "./exEvents";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "./ui/button";

const ResHomePage = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-dvh bg-green-200 relative p-10">
        <div className="flex flex-wrap items-center justify-center mt-10 relative">
          <div className="ml-5">
            <img className="h-150 w-150 " src={IdLogo} alt="I.D Logo" />
          </div>

          <div className="flex  items-center justify-center ">
            <div className="ml-2 mr-5  text-center text-3xl ">
              <div className=" w-2xl text-left">
                <strong className="text-5xl">
                  Built for clarity. Powered by trust. Designed for every
                  resident.
                </strong>
                <br /> <br /> Barangay Lidong's authenticated announcements
                straight to residents. Featuring Real-time SMS alerts keep you
                informed of emergency notices, community events, and public
                service reminders directly on your mobile phone. <br /> <br />
                <Dialog>
                  <form>
                    <DialogTrigger asChild>
                      <Button variant="outline" className=' text-white text-2xl h-15 bg-blue-400 hover:bg-blue-700 hover:text-white '>Register your phone number</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] bg-green-100" >
                      <DialogHeader>
                        <DialogTitle>Phone Registration</DialogTitle>
                        <DialogDescription>
                          Click register when
                          you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Purok</Label>
                          <Input
                            id="name-1"
                            name="name"
                            defaultValue="Ex: 4"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="phoneNumber-1">Phone number</Label>
                          <Input
                            id="phoneNumber-1"
                            name="phoneNumber"
                            defaultValue="Ex: 09XXXXXXXXX"
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" className='hover:bg-red-500'>Cancel</Button>
                        </DialogClose>
                        <Button type="submit" className='hover:bg-green-500'>Register</Button>
                      </DialogFooter>
                    </DialogContent>
                  </form>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-3 flex flex-col items-center justify-center min-h-screen   bg-amber-200">
        <div className="mb-20 font-bold text-3xl">
          <h1>Events</h1>
        </div>

        <Carousel
          opts={{ align: "start" }}
          orientation="horizontal"
          className="w-full max-w-5xl"
        >
          <CarouselContent className="-ml-1 h-[350px]">
            {events.map((event, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-full md:basis-1/2 lg:basis-1/1 "
              >
                <div className="p-4">
                  <Card className="h-[300px] w-full shadow-lg bg-green-200">
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
