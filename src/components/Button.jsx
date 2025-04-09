/* Used to create a default button template for use */

import React from 'react'

export default function Button({
  children,
  type = "button",
  bgColor = "bg-blue-600",
  textColor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button className={`px-4 bg-rose-300 hover:bg-rose-400 hover:scale-110 transform transition-all py-2 rounded-lg ${bgColor} ${textColor} ${className}`}{...props}>

      {/* Here children means the simple text */}
      {children}

    </button>
  );
}
