import { Field, ErrorMessage } from "formik";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  icon?: JSX.Element;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, icon }) => {
  return (
    <div className="flex flex-col">
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
