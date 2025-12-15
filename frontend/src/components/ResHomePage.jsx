import React, { useState, useEffect } from "react";
import IdLogo from "../assets/IdLogo.png";
import { Card, CardContent } from "@/components/ui/card";
import { events } from "./exEvents";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import axios from "axios";
import { toast } from "sonner";
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

const ResHomePage = () => {
  const [formData, setFormData] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const apiURL = "http://localhost/InfoDIsSys/backend/index.php?action=";

  const handleSumbitChange = (event) => {
    const input = event.target.name;
    const value = event.target.value;
    setFormData((values) => ({ ...values, [input]: value }));
  };

  const handleSumbit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${apiURL}create`, formData);
      console.log("Raw response:", response);

      if (response.data.status === "success") {
        //style on pop up toast not working
        toast("Registration Successfully", {
          className:
            "bg-green-500 text-white text-center font-bold rounded-md p-4",
        });
        setIsDialogOpen(false);
        console.log(response.data.message);
      } else if (response.data.status === "error") {
        toast("Registration Unsuccessfully");
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error);
      console.log(response.data.status);
    }
  };

  const [announcements, setAnnouncements] = useState([]);

  const getEvents = async () => {
    try {
      const response = await axios.get(`${apiURL}getAnnouncements`);

      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.log(error);
      console.log(response.data.status);
    }
      
  };
getEvents();
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
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-white text-2xl h-15 bg-blue-400 hover:bg-blue-700 hover:text-white"
                    >
                      Register your phone number
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[425px] bg-green-100">
                    <form onSubmit={handleSumbit}>
                      <DialogHeader>
                        <DialogTitle>Phone Registration</DialogTitle>
                        <DialogDescription>
                          Click register when you&apos;re done.
                        </DialogDescription>
                      </DialogHeader>

                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="name-1">Purok</Label>
                          <Input
                            onChange={handleSumbitChange}
                            type="text"
                            id="name-1"
                            name="PurokNum"
                            placeholder="Ex: 4"
                            maxLength={1}
                            pattern="\d{1}"
                            required
                          />
                        </div>

                        <div className="grid gap-3">
                          <Label htmlFor="phoneNumber-1">Phone number</Label>
                          <Input
                            onChange={handleSumbitChange}
                            type="text"
                            id="phoneNumber-1"
                            name="phoneNumber"
                            placeholder="Ex: 09XXXXXXXXX"
                            maxLength={11}
                            pattern="\d{11}"
                            required
                          />
                        </div>
                      </div>

                      <DialogFooter>
                        <DialogClose asChilds>
                          <Button
                            variant="outline"
                            className="hover:bg-red-500 mt-3"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="hover:bg-green-500 mt-3"
                        >
                          Register
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-3 flex flex-col items-center justify-center min-h-screen bg-amber-200">
        <div className="mb-10 font-bold text-3xl">
          <h1>Barangay Announcements</h1>
        </div>

        <Carousel
          opts={{ align: "start" }}
          orientation="horizontal"
          className="w-full max-w-5xl"
        >
          <CarouselContent className="-ml-1 h-[600px]">
            {announcements.map((event, index) => (
              <CarouselItem
                key={index}
                className="pl-1 basis-full md:basis-1/2 lg:basis-1/1 "
              >
                <div className="p-4">
                  <Card className="h-[500px] w-full shadow-lg bg-green-200">
                    <CardContent className="flex flex-col justify-center items-center h-full p-10 space-y-6">
                      <span className="text-3xl font-bold">{event.what}</span>
                      <span className="text-lg text-muted-foreground">
                        {event.when}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        {event.where}
                      </span>

                      <span className="text-lg text-muted-foreground">
                        {event.details}
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
    </>
  );
};

export default ResHomePage;
