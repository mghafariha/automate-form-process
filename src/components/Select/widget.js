import React from 'react'
import Select from 'react-select'
const SelectWid =({internalName,value,multiple,options,onChange})=>(
        <Select id={internalName}
       // className={isDisabled?'disabled' :''}
          onChange={onChange}
          isMulti={multiple}
          name={internalName} 
          options={options}
          placeholder='انتخاب ...'
          value={value}
         
   />




// <Select id={internalName} onChange={onChange} multiple={multiple}
//         name={internalName}>
// {options.map((opt,index)=>(<option key={index} value={opt} selected={value.indexOf(opt)!=-1?'selected':''} >{opt}</option>))}
// </Select>
)
export default SelectWid