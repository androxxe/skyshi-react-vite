import React, { useEffect, useState } from 'react'
import ReactSelect, { components } from 'react-select'
import { classNames } from '../functions'
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

  const TextOption = props => (
    components.Option && (
      <components.Option { ...props }>
        <div data-cy={`modal-add-priority-item`}>
          { props.label }
        </div>
      </components.Option>
    )
  );
  
  const addDataAcceptance = ( Component, dataAcceptance ) => (
    props => (
      <Component
        { ...props }
        innerProps={ Object.assign({}, props.innerProps, { 'data-acceptance': dataAcceptance }) }
      />
    )
  );
  
  const CUSTOM_COMPONENTS = {
    Option: addDataAcceptance( TextOption, 'TextOption' ),
    Menu: addDataAcceptance( components.Menu, 'Menu' ),
  };

  return (
    <div className={className}>
      <label className="block text-xs font-semibold text-slate-700 uppercase mb-1">
        { label } 
      </label>
      <div data-cy={dataCy}>
        <ReactSelect 
          placeholder={placeholder}
          value={selectValue?.label != null && selectValue?.value != null ? selectValue : null}
          className={classNames(errors ? 'border border-red-600' : 'border-gray-300', 'mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm rounded-md')}
          options={data.map(item => {
            return {
              value: item.value,
              label: item.label,
              dataCy: item.dataCy
            }
          })}
          // components={DropdownIndicator}
          components={ CUSTOM_COMPONENTS } 
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
      </div>
      { errors && <p className="text-xs text-red-700 mt-1">{ errors.message }</p>}      
    </div>
  )
}

export default SelectInput
