import React from 'react'
import moment from 'moment-jalaali'
//import moment from 'moment';
import { Calendar, DatePicker } from 'react-persian-datepicker';
import 'react-datepicker2/dist/react-datepicker2.min.css';
const DateWid=({internalName,value,onChange})=>(

<div><DatePicker onChange={onChange}  calendarStyles={styles} /></div>

)
export default DateWid

const styles = {
    calendarContainer: "calendarContainer",
    dayPickerContainer: "dayPickerContainer",
    monthsList: "monthsList",
    daysOfWeek: "daysOfWeek",
    dayWrapper: "dayWrapper",
    selected: "selected",
    heading: "heading",
    next: "next",
    prev: "prev",
    title: "title",
    }
