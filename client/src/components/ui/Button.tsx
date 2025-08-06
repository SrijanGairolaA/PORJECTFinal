import React, { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  className?: string
  onClick?: () => void;
  type?: string

};

const Button = ({
  children,
  className ='',
  onClick,
  type
 
}: ButtonProps) => {
 

  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md bg-black  ${className}`}
      
    >
      {children}
    </button>
  );
};

export default Button;


