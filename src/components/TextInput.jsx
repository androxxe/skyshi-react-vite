import React from 'react'
import { classNames } from '../functions'

const TextInput = ({ 
  className, 
  register, 
  errors, 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange, 
  dataCy,
  disabled = false,
}) => {
  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
        { label } 
      </label>
      <div className="flex">
        <input  
          data-cy={dataCy}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          className={classNames(errors ? 'border-red-600' : 'border-gray-300', `border mt-1 text-lg py-3 px-4 focus:ring-sky-400 focus:border-sky-400 block w-full shadow-sm rounded-md ${disabled ? 'bg-gray-100' : ''}`)}
          { ...register }
        />
      </div>
      { errors && <p className="text-xs text-red-700 mt-1">{ errors.message }</p>}
    </div>
  )
}

export default TextInput