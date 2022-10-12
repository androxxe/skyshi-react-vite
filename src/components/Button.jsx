import React from "react";

const Button = ({ type = 'button', children, onClick, color = 'sky', dataCy, disabled = false, className }) => {
  let classNameColor = ''
  if (color == 'sky'){
    classNameColor = `bg-sky-500 text-white ${disabled ? 'bg-sky-300' : 'hover:bg-sky-600'}`
  } else if (color == 'red'){
    classNameColor = `bg-red-500 text-white ${disabled ? 'bg-red-300' : 'hover:bg-red-600'}`
  } else if (color == 'gray'){
    classNameColor = `bg-gray-200 text-gray-500 ${disabled ? 'bg-gray-100' : 'hover:bg-gray-300'}`
  }

  return (
    <button 
      type={type}
      data-cy={dataCy}
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      className={`${classNameColor} disabled text-center rounded-full text-xl py-3 px-8 font-normal flex items-center justify-center ${className}`}
    >
      { children }
    </button>
  )
};

export default Button;
