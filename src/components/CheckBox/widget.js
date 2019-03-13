import React from 'react'
const CheckBoxWid=({value,internalName,onChange})=>(

<input id={internalName}
name={internalName}
type='checkbox'
value={value}
onChange={onChange}
/>
)
export default CheckBoxWid