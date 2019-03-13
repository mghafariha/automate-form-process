import React from 'react';

//import moment from 'moment';


//import DatePicker from 'react-datepicker2';
import { connect } from 'react-redux'

import { changeField } from '../../store/actions'

// import './calender.css'

class Date extends React.Component {
    constructor(props)
    {
        super(props); 
    }
    handleChange=(e)=>{
       console.log('date',e);
        this.props.dispatch(changeField(this.props.internalName,e));
        console.log('date value',e)
    }
    render() {
        let {InternalName,value}=this.props.field;
        return this.props.render({internalName:InternalName,value,onChange:this.handleChange})
    }
}
const mapStateToProps =(state,props)=> ({ field: state.fields[props.internalName],value:state.fields[props.internalName].value })

export default connect(mapStateToProps)(Date)
