import React, { useEffect, useState } from 'react'
import ReactSelect from 'react-select'
import { classNames } from '../functions'
import { useDispatch } from 'react-redux'
import { useFormContext } from 'react-hook-form';

const SelectInput = ({ 
  errors, 
  label, 
  dataCy,
  data = [], 
  placeholder = 'Pilih', 
  onChange = () => {},
  name,
  className,
  value = null,
}) => {

  const { setValue } = useFormContext()
  const [selectValue, setSelectValue] = useState({})

  useEffect(() => {
    let selectValue = data.find(item => item.value == value)
    setSelectValue(selectValue)
  }, [data, value])

  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
        { label } 
      </label>
      <ReactSelect 
        data-cy={dataCy}
        placeholder={placeholder}
        value={selectValue?.label != null && selectValue?.value != null ? selectValue : null}
        className={classNames(errors ? 'border border-red-600' : 'border-gray-300', 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md')}
        options={data.map(item => {
          return {
            value: item.value,
            label: item.label,
          }
        })} 
        onChange={item => {
          onChange()
          setSelectValue(item)
          setValue(name, item.value)
        }}
        styles={{ 
          menuPortal: base => ({ ...base, zIndex: 99999999, height: 100 }),
          control: (provided) => ({
            ...provided,
            height: 50,
            zIndex: 10000,
          }),
          option: (provided, state) => ({
            ...provided,
            height: 50,
            alignItems: 'center',
            display: 'flex',
            fontSize: 16
          }),
        }}
      />
      { errors && <p className="text-xs text-red-700 mt-1">{ errors.message }</p>}      
    </div>
  )
}

export default SelectInput
