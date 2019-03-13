import React from 'react'
const CustomSelectWid=({internalName,value,multiple,options,onChange})=>(

    <select onChange={onChange} multiple={multiple}>
    {options.map((option, index) => (
        <option key={index} value={option.Id}>{option.Title}</option>
    ))}

    </select>
)
export default CustomSelectWid
