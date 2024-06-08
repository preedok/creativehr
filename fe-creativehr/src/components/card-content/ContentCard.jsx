import React, { useState, useEffect } from "react";
const ContentCard = ({ children }) => {
  return (
    <>
      <div className="bg-white w-[98%] h-full shadow-md p-4 mt-3 ms-2 rounded-[25px] sm:p-1 md:p-1 lg:p-2 xl:p-4">
        {children}
      </div>
    </>
  );
}

export default ContentCard;
