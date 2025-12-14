import React from "react";

const BarOffFooter = () => {
  const yearDate = new Date().getFullYear();
  return (
    <>
      <div className="flex items-center justify-center py-16 bg-amber-300 ">
        <div className="font-bold text-3xl ">
          &copy; {yearDate} Barangay Lidong. All rights reserved
        </div>
      </div>
    </>
  );
};

export default BarOffFooter;
