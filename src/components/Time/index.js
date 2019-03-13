import React from 'react';
import moment from 'moment-jalali';



import {connect} from 'react-redux'

import {changeField} from '../../store/actions'
//import TimePicker from 'react-time-picker';
class Time extends React.Component{
    constructor(props){
        super(props);
       
    }
handleChange=(time,timeString)=>{
     
     this.props.dispatch(changeField(this.props.internalName,time))
     console.log('time',time);
}
    render(){
        let {InternalName,value}=this.props.field;
        return this.props.render({internalName:InternalName,value,onChange:this.handleChange})
    }


}
const mapStateToProps = (state,props) => ({ field:state.fields[props.internalName],value:state.fields[props.internalName].value })

export default connect(mapStateToProps)(Time)