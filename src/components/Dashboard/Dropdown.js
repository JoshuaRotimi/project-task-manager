import React, { useState } from "react";

const Dropdown = ({ title, options, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value ?? "");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    onChange(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">{title}</label>
      <select id="dropdown" value={selectedValue} onChange={handleChange}>
        <option value="" disabled>
          Select...
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
