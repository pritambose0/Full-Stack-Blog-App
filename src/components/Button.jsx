import React from "react";

function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  onclick,
  ...props
}) {
  return (
    <button
      className={`px-[1.8rem] py-[0.65rem] rounded-lg bg-primary ${textColor} ${className} hover:scale-95 hover:bg-primaryDark transition duration-300 font-medium`}
      {...props}
      // onClick={onclick}
    >
      {children}
    </button>
  );
}

export default Button;
