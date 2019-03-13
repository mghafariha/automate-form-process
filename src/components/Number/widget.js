import React from 'react';

const NumberWid=({value,internalName,Disable,min,max,step,onChange})=>(
<input id={internalName}
        name={internalName}
        type='number'
        min={min||null}
        max={max|| null}
        step={step||null}
        disabled={Disable && (Disable.indexOf('New') != -1) ? "disabled" : null}
        onChange={onChange}
        value={value || ''}
       
    />
)
export default NumberWid