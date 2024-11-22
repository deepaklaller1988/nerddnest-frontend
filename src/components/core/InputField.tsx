import { Field, ErrorMessage } from "formik";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  label?:string
  icon?: JSX.Element;
  min?:number
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, icon,label }) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      {icon}
      <Field
        type={type}
        name={name}
        className="w-full p-2 focus:outline-none"
        placeholder={placeholder}
      />
    </div>
    
    <ErrorMessage
      name={name}
      component="div"
      className="text-red-500 text-sm mt-1"
    />
  </div>
  
  );
};

export default InputField;
