import React from 'react';
import moment from 'moment-jalali';
import 'antd/dist/antd.css'
import { TimePicker } from 'antd';

import {connect} from 'react-redux'

import {changeDetailFieldValue} from '../../../store/actions'
//import TimePicker from 'react-time-picker';
class Time extends React.Component{
    constructor(props){
        super(props);
       
    }
    handleChange=(time,timeString)=>{
        
        this.props.dispatch(changeDetailFieldValue(this.props.masterdetailFieldName , this.props.InternalName, this.props.rowId, time))
        
        console.log('time',time);
    }
    render(){
        let {InternalName,value}=this.props.field;
        return this.props.render({internalName:InternalName,})
            
    }


}
const mapStateToProps = (state, props) =>
 ({
     value: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName].value,field: state.fields[props.masterdetailFieldName].rows[props.rowId][props.internalName] 
    })

export default connect(mapStateToProps)(Time)

