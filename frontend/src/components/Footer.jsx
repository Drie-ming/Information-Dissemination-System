import React from "react";
import { Button } from "./ui/button";

const Footer = () => {
  const yearDate = new Date().getFullYear();

  return (
    <>
      <div className="flex items-center justify-center py-16 bg-[#99CDA9] ">
        <div className="font-bold text-3xl ">
          &copy; {yearDate} Barangay Lidong. All rights reserved
        </div>
      </div>
    </>
  );
};

export default Footer;
