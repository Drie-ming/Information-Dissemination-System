import React from "react";
import brgLogo from "../assets/brgLogo.png";
import { useNavigate } from "react-router";
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

const BarOffHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between h-[100px] w-screen bg-[#FFB534] fixed top-0 left-0 z-50 shadow-2xl mb-20 px-10">
      
      <div className="flex items-center">
        <img src={brgLogo} alt="Barangay logo" className="h-20 mr-5" />
        <p className="font-bold text-3xl">Barangay Lidong Sto. Domingo Albay</p>
      </div>

      <AlertDialog>
        <AlertDialogTrigger className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
           Log Out
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Log out??</AlertDialogTitle>
            <AlertDialogDescription>
              Are you absolutely sure?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction className="hover:bg-red-600"
             onClick={() => navigate("/login")}>
              Yes, i am
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BarOffHeader;
