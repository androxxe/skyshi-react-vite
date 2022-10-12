import React from "react";

const Header = () => {
  return (
    <div className="h-[105px] flex items-center bg-sky-500" data-cy="header-background">
      <div className="container mx-auto px-5 lg:px-0">
        <h1 className="text-white font-bold text-2xl" data-cy="header-title">TO DO LIST APP</h1>
      </div>
    </div>
  )
};

export default Header;
