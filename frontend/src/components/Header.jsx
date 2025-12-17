import React from "react";
import brgLogo from "../assets/brgLogo.png";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Header = () => {
  return (
    <div className="flex items-center justify-between h-[100px] w-screen bg-[#99CDA9] fixed top-0 left-0 z-50 shadow-2xl mb-20 px-10">
      <div className="flex items-center">
        <img src={brgLogo} alt="Barangay logo" className="h-20 mr-5" />
        <p className="font-bold text-3xl">Barangay Lidong Sto. Domingo Albay</p>
      </div>

      <AlertDialog >
        <AlertDialogTrigger className="bg-[#EBF4DD] font-bold  hover:bg-[#90AB8B] text-black px-4 py-2 rounded mr-5 w-[100px]">About</AlertDialogTrigger>
       <AlertDialogContent >
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl mb-5">Lidong's information dissemination system</AlertDialogTitle>
            <AlertDialogDescription className="font-black text-gray-600">
              This system was built to make announcements reach every resident of 
              Barangay Lidong, Sto. Domingo, Albay fast, reliably, and in ways that work for everyone. 
              Whether it’s a safety alert, event update, or service notice, we put clarity and inclusion first.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-[#99CDA9]">Go back</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Header;
