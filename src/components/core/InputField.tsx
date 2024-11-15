import { Field, ErrorMessage } from "formik";
import { FiMail, FiLock } from "react-icons/fi";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  icon?: JSX.Element;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, icon }) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-lg p-2">
      {icon}
      <Field
        type={type}
        name={name}
        className="w-full p-2 focus:outline-none"
        placeholder={placeholder}
      />
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-500 text-sm"
      />
    </div>
  );
};

export default InputField;
