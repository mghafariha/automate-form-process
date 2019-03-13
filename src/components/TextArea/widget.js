import React from 'react'
const TextAreaWid =({internalName,value,cols,rows,onChange})=>(

<textarea id={internalName}
          name={internalName}
          cols={cols}
          rows={rows}
          value={value}
          onChange={onChange}
          
/>

)
export default TextAreaWid