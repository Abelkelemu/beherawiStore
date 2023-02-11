import React from 'react';
import './styles.scss';

const FilterSelect = ({ options, defaultValue, handleChange, label, ...otherProps }) => {

  if (!Array.isArray(options) || options.length < 1) return null;

  return (

    <div className="formRow">
      
      {label && (
        <label>
          {label}
        </label>
      )}

      <select className="formSelect" value={defaultValue} onChange={handleChange} {...otherProps}>

        {options.map((option, index) => {
          
          const { value, name ,disabled} = option;

          return (
            <option key={index} value={value} disabled={disabled}>{name}</option>
          );
        })}

      </select>
      
    </div>
  );
}

export default FilterSelect;