import React from "react";

const Input = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  options = [],
}) => {
  const inputClasses =
    "mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 bg-gray-700 text-white p-2";

  const renderInput = () => {
    switch (type) {
      case "select":
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            required={required}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "textarea":
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            required={required}
            rows="3"
          />
        );
      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            required={required}
          />
        );
    }
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-300">
        {label}
      </label>
      {renderInput()}
    </div>
  );
};

export default Input;
