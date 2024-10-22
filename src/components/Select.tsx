import React from 'react';
import { SelectProps } from '../types/products.types';

function Select({
  options, value, onChange, className,
}: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`p-1 focus:outline focus:outline-2 ${className}`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
