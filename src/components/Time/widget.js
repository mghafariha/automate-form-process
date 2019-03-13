import React from 'react'
import moment from 'moment-jalali';
import 'antd/dist/antd.css'
import { TimePicker } from 'antd';

const TimeWid=({internalName,value,onChange})=>(
    <div>
    <TimePicker
      onChange={onChange}
      defaultOpenValue={moment('00:00:00', 'HH:mm:ss')}
    />
  </div>
)
export default TimeWid