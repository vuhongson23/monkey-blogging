import React from "react";
import { useDropdown } from "./dropdown-context";

const Option = ({ onClick, children }) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="px-5 py-4 cursor-pointer flex items-center justify-between hover:bg-gray-100"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Option;
