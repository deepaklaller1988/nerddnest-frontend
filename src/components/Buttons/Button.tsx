import React from 'react';

type ButtonProps = {
  label: string;
  onClick?: () => void; 
  variant?: "default" | "secondary"; 
  icon?: React.ReactNode; 
  type:"button" |"submit"
};

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "default", icon ,type }) => {
  const baseStyles = `bg-[var(--highlght-hover)] text-white rounded-md px-3 py-2 flex items-center gap-2`;
  
  const variants = {
    default: `text-white shadow-md hover:shadow-lg`,
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
