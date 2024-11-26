"use client";
import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  label?: string;
  icon?: JSX.Element;
  min?: number;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, icon, label }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <>
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center border border-gray-300 rounded-lg p-2">
        {icon && <div className="mr-2">{icon}</div>}
        <Field
          type={type === "password" ? (passwordVisible ? "text" : "password") : type}
          name={name}
          className="w-full p-2 focus:outline-none"
          placeholder={placeholder}
        />
        {type === "password" && (
          <span
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? (
              <IoIosEye className="text-gray-400"  size={20}/>
            ) : (
              <IoIosEyeOff className="text-gray-400" size={20} />
            )}
          </span>
        )}
      </div>

      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm mt-1"
      />
    </div>
    </>
  );
};

export default InputField;