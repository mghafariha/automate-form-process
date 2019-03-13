import React from 'react'

const LookupWid=({internalName,options,value,multiple,onChange})=>(

    <select value={value} onChange={onChange} multiple={multiple}>
    {options.map((option, index) => (
        <option key={index} value={option.Id} selected={option.value==value?'selected':''} >{option.Title}</option>
    ))}

    </select>
)
export default LookupWid