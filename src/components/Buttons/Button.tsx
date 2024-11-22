import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void; 
  variant?: "default" | "secondary"; 
  icon?: React.ReactNode; 
  type:"button" |"submit"
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "default", icon ,type }) => {
  const baseStyles = `flex items-center justify-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition duration-300`;
  
  const variants = {
    default: `bg-teal-700 text-white hover:bg-teal-600 shadow-md hover:shadow-lg`,
    secondary: `bg-gray-200 text-gray-800 hover:bg-gray-300`,
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={onClick} type={type}>
      {icon && <span className="text-lg !text-white">{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
