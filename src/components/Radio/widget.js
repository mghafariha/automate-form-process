import React from 'react';
const RadioWid =({internalName,value,onChange})=>(

  <input id= {internalName} 
         name={internalName}
         type='radio'
         value={value}
         onChange={onChange}
         />
)
export default RadioWid