import React from 'react'

import allowedValues from '../config/allowedValues'

const Select = ({
  value, name, handleInputChange, label,
}) => (
    
    <div className="select">
      <select
        name={name}
        value={value}
        onChange={handleInputChange}
      >
        <option disabled>-</option>
        {Object.values(allowedValues).map((allowedValue) => (
          <option key={allowedValue}>
            {allowedValue}
          </option>
        ))}
      </select>
    </div>
)

export default Select
